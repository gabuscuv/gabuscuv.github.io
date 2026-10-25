
import {
  CertificateEnumType,
  CertificateType,
  type CompanyType,
  JobTypeEnum,
  type JobsType,
  ResumeType,
} from '@/src/data/Resume';
import {points} from '@/src/utils/points';
import {getYearLapse, OnGoingValue} from '@/src/utils/dates';
import {_Translator} from 'use-intl/core';
import {ProjectData} from '../data/ProjectDataTypes';

const MIN_JOB_SCORE: Record<JobTypeEnum, number> = {
  [JobTypeEnum.All]: 0,
  [JobTypeEnum.GameDev]: 4,
  [JobTypeEnum.Backend]: 4,
  [JobTypeEnum.WebDev]: 4,
};

const certificateTypesByRole: Partial<
  Record<JobTypeEnum, readonly CertificateEnumType[]>
> = {
  [JobTypeEnum.Backend]: ['network'],
  [JobTypeEnum.WebDev]: ['design'],
  [JobTypeEnum.GameDev]: ['gamedev'],
};

export type Locale = 'en' | 'es';

export type ExperienceSelection = {
  companies: CompanyType[];
  workTimeExperience: String;
  matchingCompanyCount: number;
  matchingPositionCount: number;
  displayedPositionCount: number;
  totalCompanyCount: number;
  totalPositionCount: number;
};

export type ProjectSelection = {
  projects: ProjectData[];
  careerTimeExperience: String;
  matchingProjectCount: number;
  totalProjectCount: number;
};


type CompanyWithSelectedJobs = {
  company: CompanyType;
  jobs: JobsType[];
  score: number;
};

export function getWorkEntriesHeader(t: _Translator<Record<string, any>, "CommonWords">, experience: ExperienceSelection): string {
  return `${t('WorkExperience')} (${experience.matchingCompanyCount} ${t('of')} ${experience.totalCompanyCount} ${t('Companies')} - ${experience.matchingPositionCount} ${t('of')} ${experience.totalPositionCount} ${t('JobPositions')}) - ${experience.workTimeExperience} ${t('years')}`;
}

export function getProjectEntriesHeader(t: _Translator<Record<string, any>, "CommonWords">, experience: ProjectSelection): string {
  return `${t('Projects')} (${experience.matchingProjectCount} ${t('of')} ${experience.totalProjectCount} ${t('Projects')}) - ${experience.careerTimeExperience} ${t('years')}`;
}

/** Most recent end date first; ongoing positions come first. */
export function sortJobsChronologically(
  a: JobsType,
  b: JobsType,
): number {
  const endA = a.EndDate === OnGoingValue ? Infinity : a.EndDate;
  const endB = b.EndDate === OnGoingValue ? Infinity : b.EndDate;

  return endB - endA;
}

/**
 * Select, rank and sort companies and their jobs.
 *
 * All: preserve input company order and include all jobs.
 * Specific role: rank companies by their best matching jobs,
 * prioritize ongoing experience, and limit the number of
 * displayed companies and jobs per company.
 */
export function selectExperience(
  workExperience: CompanyType[],
  role: JobTypeEnum,
  maxCompanies = 3,
  maxJobsPerCompany = 2,
): ExperienceSelection {
  const isAll = role === JobTypeEnum.All;

  const entries: CompanyWithSelectedJobs[] = workExperience
    .map(company => {
      const jobs = selectJobs(
        company.Jobs,
        role,
        maxJobsPerCompany,
      );

      const score = jobs.length
        ? Math.max(...jobs.map(job => points(role, job)))
        : 0;

      return { company, jobs, score };
    })
    .filter(entry => isAll || entry.jobs.length > 0);

  const rankedCompanies = isAll
    ? entries
    : entries.toSorted((a, b) => {
        const aOngoing = a.jobs.some(
          job => job.EndDate === OnGoingValue,
        );
        const bOngoing = b.jobs.some(
          job => job.EndDate === OnGoingValue,
        );

        // Keep current experience first.
        if (aOngoing !== bOngoing) {
          return aOngoing ? -1 : 1;
        }

        // Then rank by relevance to the selected resume.
        return b.score - a.score;
      });

  const selectedEntries = isAll
    ? rankedCompanies
    : rankedCompanies.slice(0, maxCompanies);

  const companies = selectedEntries.map(({ company, jobs }) => ({
    ...company,
    Jobs: jobs,
  }));

  const matchingPositionCount = isAll
    ? workExperience.reduce(
        (total, company) => total + company.Jobs.length,
        0,
      )
    : entries.reduce(
        (total, entry) =>
          total +
          entry.company.Jobs.filter(
            job => points(role, job) >= MIN_JOB_SCORE[role],
          ).length,
        0,
      );

  return {
    companies,
    workTimeExperience: getCurrentWorkTime(workExperience),
    matchingCompanyCount: entries.length,
    matchingPositionCount,
    displayedPositionCount: companies.reduce(
      (total, company) => total + company.Jobs.length,
      0,
    ),
    totalCompanyCount: workExperience.length,
    totalPositionCount: workExperience.reduce(
      (total, company) => total + company.Jobs.length,
      0,
    ),
  };
}

/**
 * Select a company's jobs for the requested resume profile.
 *
 * All: preserve the original order and include every job.
 * Specific role: filter by relevance, rank by score, and limit results.
 */
export function selectJobs(
  jobs: JobsType[],
  role: JobTypeEnum,
  maxJobsPerCompany = 2,
): JobsType[] {
  if (role === JobTypeEnum.All) {
    return jobs;
  }

  return jobs
    .map((job, index) => ({
      job,
      index,
      score: points(role, job),
    }))
    .filter(({ score }) => score >= MIN_JOB_SCORE[role])
    .toSorted((a, b) => {
      // Prefer an exact role match when scores are equal.
      const aExact = a.job.JobType === role;
      const bExact = b.job.JobType === role;

      if (aExact !== bExact) {
        return aExact ? -1 : 1;
      }

      // Highest relevance first.
      const scoreDifference = b.score - a.score;

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      // Preserve original order for remaining ties.
      return a.index - b.index;
    })
    .slice(0, maxJobsPerCompany)
    .map(({ job }) => job);
}


export function selectProjects(
  initialDate: number,
  projects: ProjectData[],
  role: JobTypeEnum,
  maxProjects = 6,
  includeHidden = false,
): ProjectSelection {
  if (role == JobTypeEnum.WebDev)
  {
    return {careerTimeExperience: getCodingTimeSinceFirstJob(), projects : [], matchingProjectCount:0 , totalProjectCount: projects.length }
   }
  const visibleProjects = projects.filter(
    project => includeHidden || !project.hiddenbydefault,
  );

  const matchingProjects =
    role === JobTypeEnum.All
      ? visibleProjects
      : visibleProjects
          .map(project => ({
            project,
            score: points(role, project),
          }))
          .filter(({ score }) => score > 0)
          .toSorted((a, b) => b.score - a.score)
          .map(({ project }) => project);

  const selectedProjects = matchingProjects
    .slice(0, maxProjects)
    .toSorted(sortProjectsChronologically);

  return {
    projects: selectedProjects,
    careerTimeExperience: getCodingTimeSinceFirstJob(),
    matchingProjectCount: selectedProjects.length,
    totalProjectCount: visibleProjects.length,
  };
}

function sortProjectsChronologically(
  a: ProjectData,
  b: ProjectData,
): number {
  return b.year - a.year || a.name.localeCompare(b.name);
}

export function getCodingTimeSinceFirstJob() {
  return getYearLapse(
    Date.parse("2017"),
    Date.now()
  );
}

export function selectCertificates(certificates : Array<CertificateType>, role: JobTypeEnum)
{
  return role === JobTypeEnum.All
    ? certificates
    : certificates.filter(certificate =>certificateTypesByRole[role]?.includes(certificate.type) ?? false);
}

export function getCurrentWorkTime(workExperience: Array<CompanyType>) {
  return (workExperience.map(
    e => ((e.EndDate !== 0 ? e.EndDate : Date.now()) - e.StartDate) /
      1000
  ).reduce((a, b) => a + b) / 31536000)
    .toFixed(2);
}

