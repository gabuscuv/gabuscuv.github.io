import {JobTypeEnum} from './Resume';

export const jobTypeFilter: {
  [id: number]: {[id: string]: number};
} = {
  [JobTypeEnum.All]: {},
  [JobTypeEnum.Web]: {
    react: 3,
    typescript: 3,
    csharp: 1,
    css: 1,
    bootstrap: 1,
    wordpress: 2,
  },
  [JobTypeEnum.GameDev]: {
    unreal: 10,
    cpp: 6,
    csharp: 4,
    wordpress: -5,
  },
  [JobTypeEnum.Backend]: {
    csharp: 3,
    unreal: -3,
    typescript: 2,
    javascript: 1,
  },
};
