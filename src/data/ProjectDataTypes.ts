export interface IProjectData {
  id: string;
  name: string;
  projecttype: string;
  stack: Array<string>;
  year: number;
  summary: string;
  htmlDescription: string;
  iconUrl: string; // used as thumnail
  isWide: boolean; // thumbnail will take 2 cols in the grid view
  isHigh: boolean; // thumbnail will take 2 rows in the grid view
  accentColor: string; // color of title bar
}

export class ProjectData {
  id: string;
  name: string;
  projecttype: string;
  stack: Array<string> = [];
  year: number;
  summary: string;
  htmlDescription: string;
  iconUrl: string; // used as thumnail
  screenshots: Array<string> = [];
  isWide: boolean; // thumbnail will take 2 cols in the grid view
  isHigh: boolean; // thumbnail will take 2 rows in the grid view
  accentColor: string; // color of title bar

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
    isWide = false
  ) {
    this.id = id;
    this.name = name;
    this.projecttype = projectType;
    this.stack = stack as Array<string>;
    this.year = year;
    this.summary = summary;
    this.htmlDescription = html;
    this.iconUrl = iconUrl;
    this.isHigh = isHigh;
    this.isWide = isWide;
    this.accentColor = accentColor;
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
    isWide = false
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
      isWide
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
    isWide = false
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
      isWide
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
    isWide = false
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
      isWide
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
    isWide = false
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
      isWide
    );
  }
}
