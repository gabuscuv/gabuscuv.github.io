import {describe, expect, it} from 'vitest';

import {selectExperience, selectJobs, selectProjects} from './resumeUtils';

import {
  BulletCategory,
  CompanyType,
  JobTypeEnum,
  JobsType,
} from '../data/resume/types';

import {ProjectData} from '../data/projects/types';
import {OnGoingValue} from './dates';

function makeBullet(
  id: string,
  categories: Partial<Record<BulletCategory, number>>,
) {
  return {
    id,
    translationKey: id,
    categories,
  };
}

function makeJob(overrides: Partial<JobsType> = {}): JobsType {
  return Object.assign(new JobsType(), {
    Title: 'Software Developer',
    StartDate: 2020,
    EndDate: 2022,
    Description: '',
    JobType: JobTypeEnum.All,
    BulletPoints: [],
    techStack: [],
    ...overrides,
  });
}

function makeCompany(
  name: string,
  jobs: JobsType[],
  overrides: Partial<CompanyType> = {},
): CompanyType {
  return Object.assign(new CompanyType(), {
    Title: name,
    StartDate: 2020,
    EndDate: 2022,
    Location: 'Spain',
    Url: '',
    typeOfHire: '',
    typeOfPresence: '',
    Jobs: jobs,
    ...overrides,
  });
}

function makeProject(
  id: string,
  name: string,
  year: number,
  projectType = 'Tool',
  stack: string[] = [],
): ProjectData {
  return new ProjectData(id, name, projectType, stack, year, '', '', '');
}

// ProjectData's constructor does not expose hiddenbydefault,
// so set it after construction.
function makeHiddenProject(
  id: string,
  name: string,
  year: number,
  hidden: boolean,
): ProjectData {
  const project = makeProject(id, name, year);
  project.hiddenbydefault = hidden;
  return project;
}

describe('selectJobs', () => {
  it('preserves all bullet points when role is All', () => {
    const bullets = [
      makeBullet('engineering', {
        [BulletCategory.Engineering]: 1,
      }),
      makeBullet('impact', {
        [BulletCategory.Impact]: 0.8,
      }),
      makeBullet('quality', {
        [BulletCategory.Quality]: 1,
      }),
    ];

    const jobs = [
      makeJob({
        Title: 'Developer',
        BulletPoints: bullets,
      }),
    ];

    const result = selectJobs(jobs, JobTypeEnum.All);

    expect(result).toHaveLength(1);
    expect(result[0].BulletPoints).toEqual(bullets);
  });

  it('returns every job in the original order for All', () => {
    const jobs = [
      makeJob({Title: 'First'}),
      makeJob({Title: 'Second'}),
      makeJob({Title: 'Third'}),
    ];

    const result = selectJobs(jobs, JobTypeEnum.All);

    expect(result.map(job => job.Title)).toEqual(['First', 'Second', 'Third']);
  });

  it('does not apply the job limit for All', () => {
    const jobs = [
      makeJob({Title: 'First'}),
      makeJob({Title: 'Second'}),
      makeJob({Title: 'Third'}),
    ];

    const result = selectJobs(jobs, JobTypeEnum.All, 1);

    expect(result).toHaveLength(3);
  });

  it('filters jobs below the minimum relevance score', () => {
    const jobs = [
      makeJob({
        Title: 'Relevant',
        techStack: ['cpp'],
      }),
      makeJob({
        Title: 'Irrelevant',
        techStack: ['wordpress'],
      }),
    ];

    const result = selectJobs(jobs, JobTypeEnum.Backend);

    expect(result.map(job => job.Title)).toEqual(['Relevant']);
  });

  it('prioritizes exact job type matches over higher technology scores', () => {
    const jobs = [
      makeJob({
        Title: 'Technology match',
        JobType: JobTypeEnum.All,
        techStack: ['cpp', 'csharp'],
      }),
      makeJob({
        Title: 'Exact match',
        JobType: JobTypeEnum.GameDev,
        techStack: [],
      }),
    ];

    const result = selectJobs(jobs, JobTypeEnum.GameDev);

    expect(result[0].Title).toBe('Exact match');
  });

  it('sorts jobs by relevance score', () => {
    const jobs = [
      makeJob({
        Title: 'Lower score',
        techStack: ['cpp'],
      }),
      makeJob({
        Title: 'Higher score',
        techStack: ['unreal'],
      }),
    ];

    const result = selectJobs(jobs, JobTypeEnum.GameDev);

    expect(result.map(job => job.Title)).toEqual([
      'Higher score',
      'Lower score',
    ]);
  });

  it('preserves original order when job scores are equal', () => {
    const jobs = [
      makeJob({
        Title: 'First',
        techStack: ['cpp'],
      }),
      makeJob({
        Title: 'Second',
        techStack: ['cpp'],
      }),
    ];

    const result = selectJobs(jobs, JobTypeEnum.GameDev);

    expect(result.map(job => job.Title)).toEqual(['First', 'Second']);
  });

  it('respects maxJobsPerCompany for specific roles', () => {
    const jobs = [
      makeJob({Title: 'First', techStack: ['unreal']}),
      makeJob({Title: 'Second', techStack: ['cpp']}),
      makeJob({Title: 'Third', techStack: ['unity']}),
    ];

    const result = selectJobs(jobs, JobTypeEnum.GameDev, 2);

    expect(result).toHaveLength(2);
  });

  it('returns an empty array when no jobs match', () => {
    const jobs = [
      makeJob({
        techStack: ['wordpress'],
      }),
    ];

    expect(selectJobs(jobs, JobTypeEnum.GameDev)).toEqual([]);
  });

  it('returns an empty array for empty input', () => {
    expect(selectJobs([], JobTypeEnum.GameDev)).toEqual([]);
  });

  describe('bullet selection', () => {
    it('sorts bullets by category relevance', () => {
      const jobs = [
        makeJob({
          techStack: ['cpp'],
          BulletPoints: [
            makeBullet('impact', {
              [BulletCategory.Impact]: 0.5,
            }),
            makeBullet('engineering', {
              [BulletCategory.Engineering]: 1,
            }),
            makeBullet('quality', {
              [BulletCategory.Quality]: 0.5,
            }),
          ],
        }),
      ];

      const result = selectJobs(jobs, JobTypeEnum.GameDev, 2, 3);

      expect(result[0].BulletPoints.map(bullet => bullet.id)).toEqual([
        'engineering',
        'impact',
        'quality',
      ]);
    });

    it('preserves original order when bullet scores are equal', () => {
      const jobs = [
        makeJob({
          techStack: ['cpp'],
          BulletPoints: [
            makeBullet('first', {
              [BulletCategory.Engineering]: 1,
            }),
            makeBullet('second', {
              [BulletCategory.Engineering]: 1,
            }),
          ],
        }),
      ];

      const result = selectJobs(jobs, JobTypeEnum.GameDev);

      expect(result[0].BulletPoints.map(bullet => bullet.id)).toEqual([
        'first',
        'second',
      ]);
    });

    it('removes bullets with zero relevance', () => {
      const jobs = [
        makeJob({
          techStack: ['cpp'],
          BulletPoints: [
            makeBullet('relevant', {
              [BulletCategory.Engineering]: 1,
            }),
            makeBullet('irrelevant', {}),
          ],
        }),
      ];

      const result = selectJobs(jobs, JobTypeEnum.GameDev);

      expect(result[0].BulletPoints.map(bullet => bullet.id)).toEqual([
        'relevant',
      ]);
    });

    it('respects maxBulletPoints', () => {
      const jobs = [
        makeJob({
          techStack: ['cpp'],
          BulletPoints: [
            makeBullet('first', {
              [BulletCategory.Engineering]: 1,
            }),
            makeBullet('second', {
              [BulletCategory.Impact]: 1,
            }),
            makeBullet('third', {
              [BulletCategory.Quality]: 1,
            }),
          ],
        }),
      ];

      const result = selectJobs(jobs, JobTypeEnum.GameDev, 2, 2);

      expect(result[0].BulletPoints).toHaveLength(2);
    });

    it('does not mutate the original bullet array', () => {
      const bullets = [
        makeBullet('impact', {
          [BulletCategory.Impact]: 0.5,
        }),
        makeBullet('engineering', {
          [BulletCategory.Engineering]: 1,
        }),
      ];

      const jobs = [
        makeJob({
          techStack: ['cpp'],
          BulletPoints: bullets,
        }),
      ];

      selectJobs(jobs, JobTypeEnum.GameDev);

      expect(jobs[0].BulletPoints).toEqual(bullets);
    });
  });
});

describe('selectExperience', () => {
  it('preserves company order for All', () => {
    const companies = [
      makeCompany('First', []),
      makeCompany('Second', []),
      makeCompany('Third', []),
    ];

    const result = selectExperience(companies, JobTypeEnum.All);

    expect(result.companies.map(company => company.Title)).toEqual([
      'First',
      'Second',
      'Third',
    ]);
  });

  it('includes companies without matching jobs for All', () => {
    const companies = [
      makeCompany('Empty company', []),
      makeCompany('Company with jobs', [makeJob({techStack: ['cpp']})]),
    ];

    const result = selectExperience(companies, JobTypeEnum.All);

    expect(result.companies).toHaveLength(2);
  });

  it('does not apply maxCompanies for All', () => {
    const companies = [
      makeCompany('First', []),
      makeCompany('Second', []),
      makeCompany('Third', []),
    ];

    const result = selectExperience(companies, JobTypeEnum.All, 1);

    expect(result.companies).toHaveLength(3);
  });

  it('excludes companies without matching jobs for specific roles', () => {
    const companies = [
      makeCompany('Relevant', [makeJob({techStack: ['cpp']})]),
      makeCompany('Irrelevant', [makeJob({techStack: ['wordpress']})]),
    ];

    const result = selectExperience(companies, JobTypeEnum.Backend);

    expect(result.companies.map(company => company.Title)).toEqual([
      'Relevant',
    ]);
  });

  it('prioritizes ongoing experience over higher relevance scores', () => {
    const companies = [
      makeCompany('High score', [
        makeJob({
          JobType: JobTypeEnum.GameDev,
          techStack: ['unreal'],
          EndDate: 2024,
        }),
      ]),
      makeCompany('Ongoing', [
        makeJob({
          techStack: ['cpp'],
          EndDate: OnGoingValue,
        }),
      ]),
    ];

    const result = selectExperience(companies, JobTypeEnum.GameDev);

    expect(result.companies[0].Title).toBe('Ongoing');
  });

  it('ranks companies by their best matching job score', () => {
    const companies = [
      makeCompany('Lower score', [makeJob({techStack: ['cpp']})]),
      makeCompany('Higher score', [makeJob({techStack: ['unreal']})]),
    ];

    const result = selectExperience(companies, JobTypeEnum.GameDev);

    expect(result.companies.map(company => company.Title)).toEqual([
      'Higher score',
      'Lower score',
    ]);
  });

  it('respects maxCompanies', () => {
    const companies = [
      makeCompany('First', [makeJob({techStack: ['unreal']})]),
      makeCompany('Second', [makeJob({techStack: ['unity']})]),
      makeCompany('Third', [makeJob({techStack: ['cpp']})]),
    ];

    const result = selectExperience(companies, JobTypeEnum.GameDev, 2);

    expect(result.companies).toHaveLength(2);
  });

  it('respects maxJobsPerCompany', () => {
    const company = makeCompany('Company', [
      makeJob({Title: 'First', techStack: ['unreal']}),
      makeJob({Title: 'Second', techStack: ['unity']}),
      makeJob({Title: 'Third', techStack: ['cpp']}),
    ]);

    const result = selectExperience([company], JobTypeEnum.GameDev, 3, 1);

    expect(result.companies[0].Jobs).toHaveLength(1);
  });

  it('returns correct company and position counters', () => {
    const companies = [
      makeCompany('First', [
        makeJob({techStack: ['cpp']}),
        makeJob({techStack: ['wordpress']}),
      ]),
      makeCompany('Second', [
        makeJob({techStack: ['unreal']}),
        makeJob({techStack: ['unity']}),
      ]),
      makeCompany('Third', [makeJob({techStack: ['wordpress']})]),
    ];

    const result = selectExperience(companies, JobTypeEnum.GameDev, 1, 1);

    expect(result.totalCompanyCount).toBe(3);
    expect(result.totalPositionCount).toBe(5);

    // Two companies have at least one matching position.
    expect(result.matchingCompanyCount).toBe(2);

    // All matching positions are counted, even if not displayed.
    expect(result.matchingPositionCount).toBe(3);

    // Only one company and one job are displayed.
    expect(result.displayedPositionCount).toBe(1);
  });

  it('returns zero matching counters when no jobs match', () => {
    const companies = [
      makeCompany('First', [makeJob({techStack: ['wordpress']})]),
    ];

    const result = selectExperience(companies, JobTypeEnum.GameDev);

    expect(result.matchingCompanyCount).toBe(0);
    expect(result.matchingPositionCount).toBe(0);
    expect(result.displayedPositionCount).toBe(0);
    expect(result.companies).toEqual([]);
  });

  it('handles empty input', () => {
    const result = selectExperience([], JobTypeEnum.GameDev);

    expect(result.companies).toEqual([]);
    expect(result.matchingCompanyCount).toBe(0);
    expect(result.matchingPositionCount).toBe(0);
    expect(result.displayedPositionCount).toBe(0);
    expect(result.totalCompanyCount).toBe(0);
    expect(result.totalPositionCount).toBe(0);
  });
});

describe('selectProjects', () => {
  it('counts all matching projects, not only displayed projects', () => {
    const projects = [
      makeProject('1', 'Project 1', 2024, 'Game', ['unreal']),
      makeProject('2', 'Project 2', 2023, 'Game', ['unity']),
      makeProject('3', 'Project 3', 2022, 'Game', ['cpp']),
      makeProject('4', 'Project 4', 2021, 'Game', ['unreal']),
      makeProject('5', 'Project 5', 2020, 'Game', ['unity']),
    ];

    const result = selectProjects(2026, projects, JobTypeEnum.GameDev, 2);

    expect(result.projects).toHaveLength(2);
    expect(result.selectedProjectCount).toBe(2);
    expect(result.matchingProjectCount).toBe(5);
    expect(result.totalProjectCount).toBe(5);
  });

  it('returns projects in chronological order for All', () => {
    const projects = [
      makeProject('1', 'Older', 2020),
      makeProject('2', 'Newest', 2024),
      makeProject('3', 'Middle', 2022),
    ];

    const result = selectProjects(2026, projects, JobTypeEnum.All);

    expect(result.projects.map(project => project.name)).toEqual([
      'Newest',
      'Middle',
      'Older',
    ]);
  });

  it('sorts projects alphabetically when years are equal', () => {
    const projects = [
      makeProject('1', 'Zebra', 2024),
      makeProject('2', 'Alpha', 2024),
      makeProject('3', 'Middle', 2024),
    ];

    const result = selectProjects(2026, projects, JobTypeEnum.All);

    expect(result.projects.map(project => project.name)).toEqual([
      'Alpha',
      'Middle',
      'Zebra',
    ]);
  });

  it('excludes hidden projects by default', () => {
    const projects = [
      makeProject('1', 'Visible', 2024),
      makeHiddenProject('2', 'Hidden', 2025, true),
    ];

    const result = selectProjects(2026, projects, JobTypeEnum.All);

    expect(result.projects.map(project => project.name)).toEqual(['Visible']);
    expect(result.totalProjectCount).toBe(1);
  });

  it('includes hidden projects when includeHidden is true', () => {
    const projects = [
      makeProject('1', 'Visible', 2024),
      makeHiddenProject('2', 'Hidden', 2025, true),
    ];

    const result = selectProjects(2026, projects, JobTypeEnum.All, 6, true);

    expect(result.projects).toHaveLength(2);
    expect(result.projects[0].name).toBe('Hidden');
    expect(result.totalProjectCount).toBe(2);
  });

  it('respects maxProjects before chronological sorting', () => {
    const projects = [
      makeProject('1', 'Old', 2020),
      makeProject('2', 'Middle', 2022),
      makeProject('3', 'New', 2024),
    ];

    const result = selectProjects(2026, projects, JobTypeEnum.All, 2);

    expect(result.projects.map(project => project.name)).toEqual([
      'Middle',
      'Old',
    ]);
  });

  it('returns no projects for WebDev', () => {
    const projects = [makeProject('1', 'Project', 2024)];

    const result = selectProjects(2026, projects, JobTypeEnum.WebDev);

    expect(result.projects).toEqual([]);
    expect(result.matchingProjectCount).toBe(0);
    expect(result.totalProjectCount).toBe(1);
  });

  it('returns an empty result for empty input', () => {
    const result = selectProjects(2026, [], JobTypeEnum.GameDev);

    expect(result.projects).toEqual([]);
    expect(result.matchingProjectCount).toBe(0);
    expect(result.totalProjectCount).toBe(0);
  });
});
