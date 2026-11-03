import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import {describe, expect, it} from 'vitest';
import {GetterProjects} from '@/src/middleware/Getter';
import {techStack} from '@/src/data/techStack';

const locales = [
  {locale: 'en', messages: enMessages},
  {locale: 'es', messages: esMessages},
] as const;

describe.each(locales)('Projects ($locale)', ({locale, messages}) => {
  it('contains all required project namespaces', () => {
    expect(messages).toHaveProperty('Projects.gameProjects');
    expect(messages).toHaveProperty('Projects.gameTools');
    expect(messages).toHaveProperty('Projects.tools');
  });

  it('loads all project collections', async () => {
    const projects = await GetterProjects(locale, messages);

    expect(projects).toHaveProperty('0');
    expect(projects).toHaveProperty('1');
    expect(projects).toHaveProperty('2');

    expect(projects[0].length).toBeGreaterThan(0);
    expect(projects[1].length).toBeGreaterThan(0);
    expect(projects[2].length).toBeGreaterThan(0);
  });

  it('contains translated project names and summaries', async () => {
    const projects = await GetterProjects(locale, messages);

    for (const collection of Object.values(projects)) {
      for (const project of collection) {
        expect(project.name.trim(), `${project.id}: missing name`).not.toBe('');

        expect(
          project.summary.trim(),
          `${project.id}: missing summary`,
        ).not.toBe('');
      }
    }
  });

  it('contains valid project data', async () => {
    const projects = await GetterProjects(locale, messages);
    const allProjects = Object.values(projects).flat();

    expect(allProjects.length).toBeGreaterThan(0);

    for (const project of allProjects) {
      expect(project.id.trim(), `${project.id}: missing ID`).not.toBe('');
      expect(project.name.trim(), `${project.id}: missing name`).not.toBe('');

      expect(project.url.trim(), `${project.id}: missing URL`).not.toBe('');

      expect(project.summary.trim(), `${project.id}: missing summary`).not.toBe(
        '',
      );

      expect(
        project.htmlDescription.trim(),
        `${project.id}: missing HTML description`,
      ).not.toBe('');

      expect(
        project.techStack.length,
        `${project.id}: empty tech stack`,
      ).toBeGreaterThan(0);

      expect(
        new Set(project.techStack).size,
        `${project.id}: duplicated technologies`,
      ).toBe(project.techStack.length);

      for (const technology of project.techStack) {
        expect(
          techStack,
          `${project.id}: unknown technology "${technology}"`,
        ).toHaveProperty(technology);
      }

      expect(Number.isInteger(project.year)).toBe(true);
      expect(project.year).toBeGreaterThan(1990);
      expect(project.year).toBeLessThanOrEqual(new Date().getFullYear() + 1);

      expect(project.accentColor).toMatch(/^#[0-9a-fA-F]{6}$/);

      expect(typeof project.isWide).toBe('boolean');
      expect(typeof project.isHigh).toBe('boolean');
      expect(typeof project.hiddenbydefault).toBe('boolean');

      if (project.screenshots !== undefined) {
        expect(Array.isArray(project.screenshots)).toBe(true);

        for (const screenshot of project.screenshots) {
          expect(
            screenshot.trim(),
            `${project.id}: empty screenshot path`,
          ).not.toBe('');
        }
      }
    }
  });

  it('contains unique project IDs across all collections', async () => {
    const projects = await GetterProjects(locale, messages);
    const allProjects = Object.values(projects).flat();
    const ids = allProjects.map(project => project.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
