export class ProjectData {
  id: string;
  name: string;
  type: string;
  stack: string[];
  summary: string;
  htmlDescription: string;
  iconUrl: string; // used as thumnail
  isWide: boolean; // thumbnail will take 2 cols in the grid view
  isHigh: boolean; // thumbnail will take 2 rows in the grid view
  accentColor: string; // color of title bar

  constructor(
    id: string,
    name: string,
    type: string,
    stack: string[],
    iconUrl: string,
    summary: string,
    html: string,
    accentColor = '#000000',
    isHigh = false,
    isWide = false
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.stack = stack;
    this.summary = summary;
    this.htmlDescription = html;
    this.iconUrl = iconUrl;
    this.isHigh = isHigh;
    this.isWide = isWide;
    this.accentColor = accentColor;
  }
}

export class ProjectDataWithImages extends ProjectData {
  screenshots: string[] | undefined;

  constructor(
    id: string,
    name: string,
    type: string,
    stack: string[],
    iconUrl: string,
    summary: string,
    html: string,
    accentColor = '#000000',
    screenshots: string[],
    isHigh = false,
    isWide = false
  ) {
    super(
      id,
      name,
      type,
      stack,
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
    stack: string[],
    iconUrl: string,
    summary: string,
    html: string,
    screenshots: string[],
    accentColor = '#000000',
    isHigh = false,
    isWide = false
  ) {
    super(
      id,
      name,
      'game',
      stack,
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
    stack: string[],
    iconUrl: string,
    summary: string,
    html: string,
    screenshots: string[],
    accentColor = '#000000',
    isHigh = false,
    isWide = false
  ) {
    super(
      id,
      name,
      'gametool',
      stack,
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
    stack: string[],
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
      'tool',
      stack,
      iconUrl,
      summary,
      html,
      accentColor,
      isHigh,
      isWide
    );
  }
}
