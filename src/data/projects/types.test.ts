import {describe, expect, it} from 'vitest';
import {
  GameProjects,
  GameToolProjects,
  ToolsProjects,
  ProjectData,
  ProjectDataWithImages,
  projectTypeEnum,
} from './types';

describe('ProjectData constructors', () => {
  it('initializes default values', () => {
    const project = new ProjectData(
      'test',
      'Test Project',
      'Tools',
      ['typescript'],
      2026,
      '/test.png',
      'A test project',
      '<p>Test</p>',
    );

    expect(project.hiddenbydefault).toBe(false);
    expect(project.screenshots).toEqual([]);
    expect(project.isHigh).toBe(false);
    expect(project.isWide).toBe(false);
    expect(project.accentColor).toBe('#000000');
    expect(project.url).toBe('');
  });

  it('preserves the provided tech stack', () => {
    const stack = ['cpp', 'unreal', 'qt'];

    const project = new ProjectData(
      'test',
      'Test',
      projectTypeEnum[projectTypeEnum.Tool],
      stack,
      2026,
      '/test.png',
      'Summary',
      '',
    );

    expect(project.techStack).toEqual(stack);
  });

  it('initializes image screenshots', () => {
    const screenshots = ['/one.png', '/two.png'];

    const project = new ProjectDataWithImages(
      'test',
      'Test',
      projectTypeEnum[projectTypeEnum.Game],
      ['cpp'],
      2026,
      '/test.png',
      'Summary',
      '',
      '#ffffff',
      screenshots,
      false,
      false,
      false,
      '',
    );

    expect(project.screenshots).toEqual(screenshots);
  });

  it.each([
    [GameProjects, projectTypeEnum[projectTypeEnum.Game]],
    [GameToolProjects, projectTypeEnum[projectTypeEnum.GameTool]],
  ])('assigns the correct project type', (ProjectClass, expectedType) => {
    const project = new ProjectClass(
      'test',
      'Test',
      ['typescript'],
      2026,
      '/test.png',
      'Summary',
      '',
      [],
      '#000000',
      false,
      false,
      false,
      '',
    );

    expect(project.projecttype).toBe(expectedType);
  });

  it('assigns Tool to ToolsProjects', () => {
    const project = new ToolsProjects(
      'test',
      'Test',
      ['typescript'],
      2026,
      '/test.png',
      'Summary',
      '    ',
      '#000000',
      false,
      false,
      '',
    );

    expect(project.projecttype).toBe(projectTypeEnum[projectTypeEnum.Tool]);
  });
});
