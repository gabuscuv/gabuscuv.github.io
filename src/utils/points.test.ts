import {describe, expect, it} from 'vitest';
import {points} from './points';
import {JobsType, JobTypeEnum} from '../data/resume/types';
import {OnGoingValue} from './dates';

const gameDevJob: JobsType = {
  JobType: JobTypeEnum.GameDev,
  techStack: ['qt', 'unreal', 'unity'],
  Description: '',
  BulletPoints: [],
  Title: '',
  StartDate: OnGoingValue,
  EndDate: OnGoingValue,
};

// const wordpressJob: JobsType = {
//   JobType: JobTypeEnum.GameDev,
//   techStack: ['wordpress'],
//   Description: '',
//   BulletPoints: [],
//   Title: '',
//   StartDate: OnGoingValue,
//   EndDate: OnGoingValue,
// };

describe('resume scoring', () => {
  it('should prioritize Unreal Engine experience for GameDev', () => {
    const score = points(JobTypeEnum.GameDev, gameDevJob);

    expect(score).toBeGreaterThan(0);
  });

  // TODO:
  // it('should penalize WordPress for GameDev', () => {
  //   const score = points(JobTypeEnum.GameDev, wordpressJob);

  //   expect(score).toBeLessThan(0);
  // });
});
