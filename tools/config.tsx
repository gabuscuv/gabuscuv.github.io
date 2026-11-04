import {JobTypeEnum} from '@/src/data/resume/types';
import {Locale} from './generate-cv';

export const candidateName = 'Gabriel Bustillo del Cuvillo';

export const socialNoList = ['Instagram'];

export const summaries: Record<JobTypeEnum, Record<Locale, string>> = {
  [JobTypeEnum.All]: {
    en: 'Software developer experienced in C++, C#, desktop and backend systems, and real-time interactive applications.',
    es: 'Desarrollador de software con experiencia en C++, C#, sistemas de escritorio y backend, y aplicaciones interactivas en tiempo real.',
  },

  [JobTypeEnum.GameDev]: {
    en: 'Game developer experienced in C++, Unreal Engine, and Unity, building real-time interactive applications, VR experiences, and development tools.',
    es: 'Desarrollador de videojuegos con experiencia en C++, Unreal Engine y Unity, creando aplicaciones interactivas en tiempo real, experiencias de realidad virtual y herramientas de desarrollo.',
  },

  [JobTypeEnum.Backend]: {
    en: 'Software developer specializing in C++ and C#, with experience in backend systems, network communication, and software infrastructure.',
    es: 'Desarrollador de software especializado en C++ y C#, con experiencia en sistemas backend, comunicaciones de red e infraestructura de software.',
  },

  [JobTypeEnum.WebDev]: {
    en: 'Software developer experienced in C#, TypeScript, React, and Next.js, building web applications and maintainable software systems.',
    es: 'Desarrollador de software con experiencia en C#, TypeScript, React y Next.js, especializado en el desarrollo de aplicaciones web y sistemas de software mantenibles.',
  },

  [JobTypeEnum.Lite]: {
    en: 'Software developer experienced in C++, C#, and application development, with a versatile background across software systems, tools, and interactive applications.',
    es: 'Desarrollador de software con experiencia en C++, C# y desarrollo de aplicaciones, con un perfil versátil que abarca sistemas de software, herramientas y aplicaciones interactivas.',
  },

  [JobTypeEnum.GameDevTools]: {
    en: 'Software developer experienced in C++, C#, and game development tools, building editor extensions, automation utilities, and workflows for real-time development.',
    es: 'Desarrollador de software con experiencia en C++, C# y herramientas para desarrollo de videojuegos, creando extensiones para editores, utilidades de automatización y flujos de trabajo para desarrollo en tiempo real.',
  },

  [JobTypeEnum.EmbeddedSystem]: {
    en: 'Software developer experienced in C++, embedded systems, and hardware communication, working with microcontrollers, network protocols, and resource-constrained environments.',
    es: 'Desarrollador de software con experiencia en C++, sistemas embebidos y comunicación con hardware, trabajando con microcontroladores, protocolos de red y entornos con recursos limitados.',
  },

  [JobTypeEnum.Multimedia]: {
    en: 'Software developer experienced in real-time interactive applications, multimedia systems, and audio and video technologies, with a background in C++, C#, and game engines.',
    es: 'Desarrollador de software con experiencia en aplicaciones interactivas en tiempo real, sistemas multimedia y tecnologías de audio y vídeo, con experiencia en C++, C# y motores de videojuegos.',
  },
};
