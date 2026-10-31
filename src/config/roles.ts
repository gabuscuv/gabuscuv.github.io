import {JobTypeEnum} from "../data/resume/types";

export const roles = [
  { value: JobTypeEnum.All, label: 'all' },
  { value: JobTypeEnum.Lite, label: 'lite' },
  { value: JobTypeEnum.GameDev, label: 'gameDev' },
  { value: JobTypeEnum.GameDevTools, label: 'gameDevTools' },
  { value: JobTypeEnum.Backend, label: 'backend' },
  { value: JobTypeEnum.WebDev, label: 'web' },
  { value: JobTypeEnum.EmbeddedSystem, label: 'embeddedSystem' },
  { value: JobTypeEnum.Multimedia, label: 'multimedia' },
] as const;
