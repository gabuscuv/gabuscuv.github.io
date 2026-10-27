
import {
  BulletCategory,
  CategoryWeights,
  CertificateEnumType,
  CertificateType,
  type CompanyType,
  IExperienceBullet,
  JobTypeEnum,
  type JobsType,
  ResumeType,
} from '@/src/data/Resume';
import {points} from '@/src/utils/points';
import {getYearLapse, OnGoingValue} from '@/src/utils/dates';
import {_Translator} from 'use-intl/core';
import {ProjectData} from '../data/ProjectDataTypes';
import { bulletCategoryWeights } from '../data/BulletpointsTypePoints';

const MIN_JOB_SCORE: Record<JobTypeEnum, number> = {
  [JobTypeEnum.All]: 0,
  [JobTypeEnum.GameDev]: 4,
  [JobTypeEnum.Backend]: 4,
  [JobTypeEnum.WebDev]: 4,
  [JobTypeEnum.EmbeddedSystem]: 4,
  [JobTypeEnum.Lite]: 4,
  [JobTypeEnum.GameDevTools]: 4,
  [JobTypeEnum.Multimedia]: 4
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
 *
 * Bullet categories describe the strength of evidence for each competency,
 * not the relevance of a job to a particular role.
 */
export function selectJobs(
  jobs: JobsType[],
  role: JobTypeEnum,
  maxJobsPerCompany = 2,
  maxBulletPoints = 3,
): JobsType[] {
  const selectRelevantBullets = (job: JobsType): JobsType => ({
    ...job,
    BulletPoints: job.BulletPoints
      .map((bullet, index) => ({
        bullet,
        index,
        score: pointsForBullet(role, bullet),
      }))
      .filter(({ score }) => score > 0)
      .toSorted((a, b) => {
        const scoreDifference = b.score - a.score;

        // Preserve original order for equal scores.
        return scoreDifference !== 0
          ? scoreDifference
          : a.index - b.index;
      })
      .slice(0, maxBulletPoints)
      .map(({ bullet }) => bullet),
  });

  if (role === JobTypeEnum.All) {
    return jobs.map(selectRelevantBullets);
  }

  return jobs
    .map((job, index) => {
      const jobScore = points(role, job);

      const relevantBullets = job.BulletPoints
        .map(bullet => pointsForBullet(role, bullet))
        .filter(score => score > 0)
        .toSorted((a, b) => b - a);

      const bulletScore =
        relevantBullets.length === 0
          ? 0
          : relevantBullets
              .slice(0, 3)
              .reduce((sum, score) => sum + score, 0) /
            Math.min(relevantBullets.length, 3);

      const score = jobScore * 0.75 + bulletScore * 0.25;

      return { job, index, score, jobScore };
    })
    .filter(({ jobScore }) => jobScore >= MIN_JOB_SCORE[role])
    .toSorted((a, b) => {
      const aExact = a.job.JobType === role;
      const bExact = b.job.JobType === role;

      if (aExact !== bExact) {
        return aExact ? -1 : 1;
      }

      const scoreDifference = b.score - a.score;

      return scoreDifference !== 0
        ? scoreDifference
        : a.index - b.index;
    })
    .slice(0, maxJobsPerCompany)
    .map(({ job }) => selectRelevantBullets(job));
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

function pointsForBullet(
  role: JobTypeEnum,
  bullet: IExperienceBullet,
): number {
  const weights = bulletCategoryWeights[role];

  if (!weights) {
    return 0;
  }

  const entries = Object.entries(bullet.categories) as [
    BulletCategory,
    number,
  ][];

  const totalWeight = entries.reduce(
    (sum, [category]) => sum + (weights[category] ?? 0),
    0,
  );

  if (totalWeight === 0) {
    return 0;
  }

  return entries.reduce(
    (sum, [category, strength]) =>
      sum + strength * (weights[category] ?? 0),
    0,
  ) / totalWeight;
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

