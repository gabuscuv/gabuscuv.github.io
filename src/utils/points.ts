import {jobTypeFilter} from '../data/JobTypePoints';
import {JobTypeEnum, CompanyType, JobsType} from '../data/Resume';

export function totalPoints(
  jobTypeEnum: JobTypeEnum,
  work: CompanyType,
): number {
  return work.Jobs.map<number>(a => points(jobTypeEnum, a)).reduce(
    (a, z) => a + z,
  );
}
export function points(JobEnum: JobTypeEnum, b: JobsType): number {
  let points = 0;
  if (JobEnum === undefined || JobEnum === JobTypeEnum.All) {
    return points;
  }
  b.techStack.forEach(az => {
    return (points += jobTypeFilter[JobEnum][az]
      ? jobTypeFilter[JobEnum][az]
      : 0);
  });
  return points;
}
