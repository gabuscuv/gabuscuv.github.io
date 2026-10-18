
import {jobTypeFilter} from '../data/JobTypePoints';
import {JobTypeEnum, CompanyType, JobsType} from '../data/Resume';

const JOB_TYPE_MATCH_BONUS = 100;

export function points(
  jobTypeEnum: JobTypeEnum,
  job: JobsType,
): number {
  if (jobTypeEnum === JobTypeEnum.All) {
    return 0;
  }

  const weights = jobTypeFilter[jobTypeEnum] ?? {};

  const technologyScore = [...new Set(job.techStack)].reduce(
    (total, technology) => total + (weights[technology] ?? 0),
    0,
  );

  const categoryScore =
    job.JobType === jobTypeEnum ? JOB_TYPE_MATCH_BONUS : 0;

  return categoryScore + technologyScore;
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
