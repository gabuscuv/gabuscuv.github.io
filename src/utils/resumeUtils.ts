
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
import { _Translator } from 'use-intl/core';
import { ProjectData } from '../data/ProjectDataTypes';



const certificateTypesByRole: Partial<
  Record<JobTypeEnum, readonly CertificateEnumType[]>
> = {
  [JobTypeEnum.Backend]: ['network'],
  [JobTypeEnum.WebDev]: ['design'],
  [JobTypeEnum.GameDev]: ['gamedev'],
};


export type ExperienceSelection = {
  companies: CompanyType[];
  workTimeExperience: String;
  matchingCompanyCount: number;
  matchingPositionCount: number;
  displayedPositionCount: number;
  totalCompanyCount: number;
  totalPositionCount: number;
};

type CompanyWithSelectedJobs = {
  company: CompanyType;
  jobs: JobsType[];
  score: number;
};

export function getWorkEntriesHeader(t: _Translator<Record<string, any>, "CommonWords">, experience: ExperienceSelection): string {
  return `${t('WorkExperience')} (${experience.matchingCompanyCount} ${t('of')} ${experience.totalCompanyCount} ${t('Companies')} - ${experience.matchingPositionCount} ${t('of')} ${experience.totalPositionCount} ${t('JobPositions')}) - ${experience.workTimeExperience} ${t('years')}`;
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

/** Select a company's jobs for the requested role. */
export function selectJobs(
  jobs: JobsType[],
  role: JobTypeEnum,
  maxJobsPerCompany = 2,
): JobsType[] {
  const matchingJobs =
    role === JobTypeEnum.All
      ? jobs
      : jobs.filter(job => job.JobType === role);

  const rankedJobs =
    role === JobTypeEnum.All
      ? matchingJobs
      : matchingJobs.toSorted(
          (a, b) => points(role, b) - points(role, a),
        );

  const selectedJobs =
    role === JobTypeEnum.All
      ? rankedJobs
      : rankedJobs.slice(0, maxJobsPerCompany);

  return selectedJobs.toSorted(sortJobsChronologically);
}

export function selectProjects(
  projects: ProjectData[],
  role: JobTypeEnum,
  maxProjects = 6,
  includeHidden = false,
): ProjectData[] {
  const visibleProjects = projects.filter(
    project => includeHidden || !project.hiddenbydefault,
  );

  if (role === JobTypeEnum.All) {
    return visibleProjects.toSorted(sortProjectsChronologically);
  }

  return visibleProjects
    .map(project => ({
      project,
      score: points(role, project),
    }))
    .filter(({ score }) => score > 0)
    .toSorted((a, b) => b.score - a.score)
    .slice(0, maxProjects)
    .map(({ project }) => project)
    .toSorted(sortProjectsChronologically);
}

function sortProjectsChronologically(
  a: ProjectData,
  b: ProjectData,
): number {
  return b.year - a.year || a.name.localeCompare(b.name);
}


export function getCodingTimeSinceFirstJob(resume: ResumeType) {
  return getYearLapse(
    resume.Jobs[resume.Jobs.length - 1].StartDate,
    Date.now()
  );
}


export function selectCertificates(certificates : Array<CertificateType>, role: JobTypeEnum)
{
  return role === JobTypeEnum.All
    ? certificates
    : certificates.filter(certificate =>certificateTypesByRole[role]?.includes(certificate.type) ?? false);
}
/**
 * Select, rank and sort companies and their jobs.
 *
 * All: preserve the input company order and include all jobs.
 * Specific role: rank matching companies and show at most two companies,
 * with at most two matching jobs per company.
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
      const matchingJobs =
        isAll
          ? company.Jobs
          : company.Jobs.filter(job => job.JobType === role);

      const jobs = selectJobs(
        company.Jobs,
        role,
        maxJobsPerCompany,
      );

      const score = matchingJobs.length
        ? Math.max(...matchingJobs.map(job => points(role, job)))
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

      if (aOngoing !== bOngoing) {
        return aOngoing ? -1 : 1;
      }

      return b.score - a.score;
    });

  const selectedCompanies = isAll
    ? rankedCompanies
    : rankedCompanies.slice(0, maxCompanies);

  const companies = selectedCompanies.map(({ company, jobs }) => ({
    ...company,
    Jobs: jobs,
  }));

  const workTimeExperience =  getCurrentWorkTime(workExperience)

  return {
    companies,
    workTimeExperience: workTimeExperience,
    matchingCompanyCount: entries.length,
    matchingPositionCount: entries.reduce(
      (total, entry) =>
        total +
        (isAll
          ? entry.company.Jobs.length
          : entry.company.Jobs.filter(job => job.JobType === role).length),
      0,
    ),
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
export function getCurrentWorkTime(workExperience: Array<CompanyType>) {
  return (workExperience.map(
    e => ((e.EndDate !== 0 ? e.EndDate : Date.now()) - e.StartDate) /
      1000
  ).reduce((a, b) => a + b) / 31536000)
    .toFixed(2);
}

