
import {jobTypeFilter} from '../data/resume/JobTypePoints';
import {ProjectData} from '../data/projects/types';
import {JobTypeEnum, CompanyType, JobsType} from '../data/resume/types';

const JOB_TYPE_MATCH_BONUS = 100;

export function points(role: JobTypeEnum, item: JobsType): number;

export function points(role: JobTypeEnum, item: ProjectData): number;

export function points(role: JobTypeEnum, item: JobsType | ProjectData,
): number {
  if (role === JobTypeEnum.All) {
    return 0;
  }

  const weights = jobTypeFilter[role] ?? {};
  const isJob = 'JobType' in item;

  const technologies = item.techStack

  const technologyScore = [...new Set(technologies)].reduce(
    (total, technology) => total + (weights[technology] ?? 0),
    0,
  );

  if (isJob) {
    return (
      (item.JobType === role ? JOB_TYPE_MATCH_BONUS : 0) +
      technologyScore
    );
  }

  const projectTypeBonus =
    role === JobTypeEnum.GameDev
      ? item.projecttype === 'Game'
        ? JOB_TYPE_MATCH_BONUS
        : item.projecttype === 'GameTools'
          ? JOB_TYPE_MATCH_BONUS / 2
          : 0
      : 0;

  return technologyScore + projectTypeBonus;
}

export function totalPoints(
  jobTypeEnum: JobTypeEnum,
  company: CompanyType,
): number {
  if (jobTypeEnum === JobTypeEnum.All) {
    return 0;
  }

  const scores = company.Jobs.map((job) =>
    points(jobTypeEnum, job),
  );

  return Math.max(0, ...scores);
}
