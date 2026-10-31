'use client';
export enum projectTypeEnum {
  Game,
  GameTool,
  Tool,
}

export interface IProjectData {
  id: string;
  name: string;
  url: string;
  projecttype: string;
  stack: Array<string>;
  year: number;
  summary: string;
  htmlDescription: string;
  iconUrl: string; // Used as thumbnail
  isWide: boolean; // Thumbnail spans 2 columns
  isHigh: boolean; // Thumbnail spans 2 rows
  accentColor: string; // Color of title bar
}

export class ProjectData {
  id: string;
  name: string;
  url: string;
  projecttype: string;
  hiddenbydefault: boolean;
  techStack: Array<string> = [];
  year: number;
  summary: string;
  htmlDescription: string;
  iconUrl: string;
  screenshots: Array<string> = [];
  isWide: boolean;
  isHigh: boolean;
  accentColor: string;

  constructor(
    id: string,
    name: string,
    projectType: string,
    stack: string[],
    year: number,
    iconUrl: string,
    summary: string,
    html: string,
    accentColor = '#000000',
    isHigh = false,
    isWide = false,
    hiddenByDefault = false,
    url = '',
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.projecttype = projectType;
    this.techStack = stack;
    this.year = year;
    this.summary = summary;
    this.htmlDescription = html;
    this.iconUrl = iconUrl;
    this.isHigh = isHigh;
    this.isWide = isWide;
    this.accentColor = accentColor;
    this.hiddenbydefault = hiddenByDefault;
  }
}

export class ProjectDataWithImages extends ProjectData {
  constructor(
    id: string,
    name: string,
    projecttype: string,
    stack: Array<string>,
    year: number,
    iconUrl: string,
    summary: string,
    html: string,
    accentColor = '#000000',
    screenshots: Array<string>,
    isHigh = false,
    isWide = false,
    hiddenByDefault = false,
    url: string
  ) {
    super(
      id,
      name,
      projecttype,
      stack,
      year,
      iconUrl,
      summary,
      html,
      accentColor,
      isHigh,
      isWide,
      hiddenByDefault,
      url
    );
    this.screenshots = screenshots;
  }
}

export class GameProjects extends ProjectDataWithImages {
  constructor(
    id: string,
    name: string,
    stack: Array<string>,
    year: number,
    iconUrl: string,
    summary: string,
    html: string,
    screenshots: Array<string>,
    accentColor = '#000000',
    isHigh = false,
    isWide = false,
    hiddenByDefault = false,
    url: string
  ) {
    super(
      id,
      name,
      'Game',
      stack,
      year,
      iconUrl,
      summary,
      html,
      accentColor,
      screenshots,
      isHigh,
      isWide,
      hiddenByDefault,
      url
    );
  }
}

export class GameToolProjects extends ProjectDataWithImages {
  constructor(
    id: string,
    name: string,
    stack: Array<string>,
    year: number,
    iconUrl: string,
    summary: string,
    html: string,
    screenshots: Array<string>,
    accentColor = '#000000',
    isHigh = false,
    isWide = false,
    hiddenByDefault = false,
    url: string
  ) {
    super(
      id,
      name,
      'GameTool',
      stack,
      year,
      iconUrl,
      summary,
      html,
      accentColor,
      screenshots,
      isHigh,
      isWide,
      hiddenByDefault,
      url
    );
  }
}

export class ToolsProjects extends ProjectData {
  constructor(
    id: string,
    name: string,
    stack: Array<string>,
    year: number,
    iconUrl: string,
    summary: string,
    html: string,
    accentColor = '#000000',
    isHigh = false,
    isWide = false,
    url: string
  ) {
    super(
      id,
      name,
      'Tool',
      stack,
      year,
      iconUrl,
      summary,
      html,
      accentColor,
      isHigh,
      isWide,
      false,
      url
    );
  }
}
