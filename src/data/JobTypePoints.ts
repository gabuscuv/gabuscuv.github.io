
import {JobTypeEnum} from './Resume';

type TechnologyWeights = Record<string, number>;

export const jobTypeFilter: Partial<
  Record<JobTypeEnum, TechnologyWeights>
> = {
  [JobTypeEnum.All]: {},

  [JobTypeEnum.GameDev]: {
  // Primary game engines
  gamedev:12,
  unreal: 12,
  unity: 10,
  godot: 10,
  // GameDev Libs/middleware related
  fmod: 10,

  // General-purpose programming
  cpp: 7,
  csharp: 5,
  python: 2,

  // Real-time software, simulation and tooling
  qt: 3,
  dds: 3,
  zmq: 3,
  grpc: 2,

  // Deprioritize unrelated web development
  wordpress: -5,
  react: -3,
  nextjs: -3,
},
  [JobTypeEnum.Backend]: {
    cpp: 5,
    csharp: 5,
    qt: 3,
    grpc: 3,
    dds: 3,
    zmq: 3,
    sqlserver: 2,
    azure: 2,
    entity: 2,
    typescript: 1,
    react: -3,
    unreal: -3,
  },

  [JobTypeEnum.WebDev]: {
    typescript: 5,
    react: 5,
    nextjs: 5,
    nodejs: 4,
    expressjs: 3,
    wordpress: 2,
    oxygen: 2,
    bootstrap: 2,
    css: 1,
    exchangeapi: 1,
    csharp: 1,
    cpp: -10,
    unreal: -10,
    unity: -10,
  },
};
