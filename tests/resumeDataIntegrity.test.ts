import {beforeAll, describe, expect, it} from 'vitest';

import {ResumeContent, type ResumeTranslator} from '@/src/data/resume/Resume';

import {JobTypeEnum, BulletCategory} from '@/src/data/resume/types';

import {OnGoingValue} from '@/src/utils/dates';

describe('Resume data integrity', () => {
  let resume: Awaited<ReturnType<typeof ResumeContent>>;

  beforeAll(async () => {
    // Translation keys are returned as-is.
    // This allows us to test the data without loading locale files.
    const translator = ((key: string) => key) as ResumeTranslator;

    resume = await ResumeContent(translator);
  });

  describe('Company data', () => {
    it('contains at least one company', () => {
      expect(resume.Jobs.length).toBeGreaterThan(0);
    });

    it('has unique, non-empty company names', () => {
      const names = resume.Jobs.map(company => company.Title);

      expect(names.every(name => name.trim().length > 0)).toBe(true);
      expect(new Set(names).size).toBe(names.length);
    });

    it.each([
      ['Location', (company: (typeof resume.Jobs)[number]) => company.Location],
      ['URL', (company: (typeof resume.Jobs)[number]) => company.Url],
    ])('has valid company %s values', (_, getter) => {
      for (const company of resume.Jobs) {
        const value = getter(company);

        expect(value, company.Title).toBeTruthy();
      }
    });

    it('has valid company dates', () => {
      for (const company of resume.Jobs) {
        expect(Number.isFinite(company.StartDate), company.Title).toBe(true);
        expect(Number.isFinite(company.EndDate), company.Title).toBe(true);

        if (company.EndDate !== OnGoingValue) {
          expect(
            company.EndDate,
            `${company.Title}: end date must not precede start date`,
          ).toBeGreaterThanOrEqual(company.StartDate);
        }
      }
    });

    it('contains at least one job per company', () => {
      for (const company of resume.Jobs) {
        expect(company.Jobs.length, company.Title).toBeGreaterThan(0);
      }
    });
  });

  describe('Job data', () => {
    const validJobTypes = Object.values(JobTypeEnum).filter(
      (value): value is JobTypeEnum => typeof value === 'number',
    );

    it('has valid job titles and descriptions', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          expect(job.Title.trim(), company.Title).not.toBe('');
          expect(typeof job.Description).toBe('string');
        }
      }
    });

    it('uses valid JobTypeEnum values', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          expect(validJobTypes, `${company.Title} / ${job.Title}`).toContain(
            job.JobType,
          );
        }
      }
    });

    it('has valid job dates', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          const context = `${company.Title} / ${job.Title}`;

          expect(Number.isFinite(job.StartDate), context).toBe(true);
          expect(Number.isFinite(job.EndDate), context).toBe(true);

          if (job.EndDate !== OnGoingValue) {
            expect(
              job.EndDate,
              `${context}: end date must not precede start date`,
            ).toBeGreaterThanOrEqual(job.StartDate);
          }
        }
      }
    });

    it('keeps job dates inside their company dates', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          const context = `${company.Title} / ${job.Title}`;

          expect(
            job.StartDate,
            `${context}: job starts before company`,
          ).toBeGreaterThanOrEqual(company.StartDate);

          if (
            company.EndDate !== OnGoingValue &&
            job.EndDate !== OnGoingValue
          ) {
            expect(
              job.EndDate,
              `${context}: job ends after company`,
            ).toBeLessThanOrEqual(company.EndDate);
          }
        }
      }
    });

    it('contains valid tech stack entries', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          expect(Array.isArray(job.techStack)).toBe(true);

          for (const technology of job.techStack) {
            expect(
              technology.trim(),
              `${company.Title} / ${job.Title}`,
            ).not.toBe('');
          }

          expect(
            new Set(job.techStack).size,
            `${company.Title} / ${job.Title}: duplicate technologies`,
          ).toBe(job.techStack.length);
        }
      }
    });
  });

  describe('Bullet point data', () => {
    const validCategories = Object.values(BulletCategory);

    it('has unique bullet IDs within each job', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          const ids = job.BulletPoints.map(bullet => bullet.id);

          expect(
            ids.every(id => id.trim().length > 0),
            `${company.Title} / ${job.Title}: empty bullet ID`,
          ).toBe(true);

          expect(
            new Set(ids).size,
            `${company.Title} / ${job.Title}: duplicate bullet IDs`,
          ).toBe(ids.length);
        }
      }
    });

    it('has non-empty translation keys', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          for (const bullet of job.BulletPoints) {
            expect(
              bullet.translationKey.trim(),
              `${company.Title} / ${job.Title} / ${bullet.id}`,
            ).not.toBe('');
          }
        }
      }
    });

    it('has translated every bullet', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          for (const bullet of job.BulletPoints) {
            expect(
              bullet.translation,
              `${company.Title} / ${job.Title} / ${bullet.id}`,
            ).toBe(bullet.translationKey);
          }
        }
      }
    });

    it('uses valid bullet categories', () => {
      for (const company of resume.Jobs) {
        for (const job of company.Jobs) {
          for (const bullet of job.BulletPoints) {
            const categories = Object.entries(bullet.categories);

            expect(
              categories.length,
              `${company.Title} / ${job.Title} / ${bullet.id}`,
            ).toBeGreaterThan(0);

            for (const [category, strength] of categories) {
              expect(
                validCategories,
                `${bullet.id}: invalid category ${category}`,
              ).toContain(category);

              expect(
                strength,
                `${bullet.id}: category strength must be between 0 and 1`,
              ).toBeGreaterThanOrEqual(0);

              expect(
                strength,
                `${bullet.id}: category strength must be between 0 and 1`,
              ).toBeLessThanOrEqual(1);
            }
          }
        }
      }
    });
  });

  describe('Education data', () => {
    it('has valid education entries', () => {
      expect(resume.Education.length).toBeGreaterThan(0);

      for (const education of resume.Education) {
        expect(education.Title.trim()).not.toBe('');
        expect(education.originalTitle.trim()).not.toBe('');
        expect(education.IssuerOrg.trim()).not.toBe('');
        expect(education.EFramework.trim()).not.toBe('');

        expect(Number.isFinite(education.StartDate)).toBe(true);
        expect(Number.isFinite(education.EndDate)).toBe(true);

        expect(education.EndDate).toBeGreaterThanOrEqual(education.StartDate);
      }
    });
  });

  describe('Certificate data', () => {
    it('has valid certificate entries', () => {
      expect(resume.Certificate.length).toBeGreaterThan(0);

      for (const certificate of resume.Certificate) {
        expect(certificate.Title.trim()).not.toBe('');
        expect(certificate.type.trim()).not.toBe('');
        expect(certificate.IssuerOrg.trim()).not.toBe('');
        expect(Number.isFinite(certificate.date)).toBe(true);
      }
    });
  });

  describe('Talk data', () => {
    it('has valid talk entries', () => {
      for (const talk of resume.Talks) {
        expect(talk.Title.trim()).not.toBe('');
        expect(talk.location.trim()).not.toBe('');
        expect(Number.isFinite(talk.date)).toBe(true);
      }
    });
  });
});
