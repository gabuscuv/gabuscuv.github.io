import {BulletCategory, JobTypeEnum} from "./types";

export const bulletCategoryWeights: Record<
  JobTypeEnum,
  Partial<Record<BulletCategory, number>>
> = {
  [JobTypeEnum.All]: {},

  [JobTypeEnum.GameDev]: {
    [BulletCategory.Engineering]: 1.0,
    [BulletCategory.Architecture]: 0.9,
    [BulletCategory.Integration]: 0.8,
    [BulletCategory.Impact]: 0.9,
    [BulletCategory.Quality]: 0.8,
    [BulletCategory.Automation]: 0.7,
    [BulletCategory.Delivery]: 0.7,
  },

  [JobTypeEnum.Backend]: {
    [BulletCategory.Engineering]: 1.0,
    [BulletCategory.Architecture]: 1.0,
    [BulletCategory.Integration]: 0.9,
    [BulletCategory.Quality]: 0.9,
    [BulletCategory.Automation]: 0.8,
    [BulletCategory.Impact]: 0.8,
    [BulletCategory.Delivery]: 0.7,
  },

  [JobTypeEnum.WebDev]: {
    [BulletCategory.Engineering]: 1.0,
    [BulletCategory.Integration]: 0.9,
    [BulletCategory.Quality]: 0.9,
    [BulletCategory.Architecture]: 0.8,
    [BulletCategory.Impact]: 0.8,
    [BulletCategory.Delivery]: 0.8,
    [BulletCategory.Automation]: 0.6,
  },

  [JobTypeEnum.EmbeddedSystem]: {
    [BulletCategory.Engineering]: 1.0,
    [BulletCategory.Integration]: 1.0,
    [BulletCategory.Quality]: 0.9,
    [BulletCategory.Architecture]: 0.9,
    [BulletCategory.Impact]: 0.8,
    [BulletCategory.Delivery]: 0.8,
    [BulletCategory.Automation]: 0.7,
  },
  
  [JobTypeEnum.Lite]: {
    [BulletCategory.Engineering]: 1.0,
    [BulletCategory.Impact]: 0.9,
    [BulletCategory.Quality]: 0.8,
    [BulletCategory.Integration]: 0.8,
    [BulletCategory.Architecture]: 0.7,
    [BulletCategory.Delivery]: 0.7,
    [BulletCategory.Automation]: 0.6,
  },

  [JobTypeEnum.GameDevTools]: {
    [BulletCategory.Automation]: 1.0,
    [BulletCategory.Engineering]: 1.0,
    [BulletCategory.Architecture]: 0.9,
    [BulletCategory.Quality]: 0.9,
    [BulletCategory.Impact]: 0.9,
    [BulletCategory.Delivery]: 0.9,
    [BulletCategory.Integration]: 0.8,
  },

  [JobTypeEnum.Multimedia]: {
    [BulletCategory.Engineering]: 1.0,
    [BulletCategory.Integration]: 1.0,
    [BulletCategory.Quality]: 0.9,
    [BulletCategory.Impact]: 0.9,
    [BulletCategory.Architecture]: 0.8,
    [BulletCategory.Delivery]: 0.8,
    [BulletCategory.Automation]: 0.7,
  },
};