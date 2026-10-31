import {roles} from "../../config/roles";



export enum JobTypeEnum {
  All,
  Lite,
  GameDev,
  GameDevTools,
  Backend,
  WebDev,
  EmbeddedSystem,
  Multimedia
}

export type RoleDefinition = (typeof roles)[number];

export type CertificateEnumType = 'network' |
  'design' |
  'gamedev' |
  'office';
class CommonMinimum {
  Title = '';
  StartDate = 0;
  EndDate = 0;
}
class CommonMinimumWithLocation extends CommonMinimum {
  Location = '';
  Url = '';
}

export class MultimediaContent {
  text = '';
  url = '';
}

export enum BulletCategory {
  Impact = 'impact',
  Architecture = 'architecture',
  Engineering = 'engineering',
  Automation = 'automation',
  Integration = 'integration',
  Quality = 'quality',
  Delivery = 'delivery'
}

export type CategoryWeights = Record<BulletCategory, number>;

export const defaultCategoryWeights: CategoryWeights = {
  [BulletCategory.Impact]: 0.9,
  [BulletCategory.Architecture]: 1.0,
  [BulletCategory.Engineering]: 1.0,
  [BulletCategory.Automation]: 0.8,
  [BulletCategory.Integration]: 0.9,
  [BulletCategory.Quality]: 0.8,
  [BulletCategory.Delivery]: 0.7,
};

export interface IExperienceBullet {
  id: string;
  translationKey: string;
  categories: Partial<Record<BulletCategory, number>>;
  translation?: string;
}

export class JobsType extends CommonMinimum {
  Description = '';
  JobType = JobTypeEnum.All;
  BulletPoints: Array<IExperienceBullet> = [];
  techStack: Array<string> = [];
  multimediaContent?: Array<MultimediaContent> = [];
}

export class CompanyType extends CommonMinimumWithLocation {
  typeOfHire = '';
  typeOfPresence = '';
  Jobs: Array<JobsType> = [];
}

export class EducationType extends CommonMinimumWithLocation {
  IssuerOrg = '';
  EFramework = '';
  originalTitle = '';
  techStack: Array<string> = [];
}

export type CertificateType = {
  Title: string;
  type: CertificateEnumType;
  IssuerOrg: string;
  date: number;
};

export type TalksType = {
  Title: string;
  location: string;
  date: number;
};

export type ResumeType = {
  Jobs: Array<CompanyType>;
  Education: Array<EducationType>;
  Certificate: Array<CertificateType>;
  Talks: Array<TalksType>;
};

