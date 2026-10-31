
import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {renderToBuffer} from '@react-pdf/renderer';
import {createTranslator} from 'use-intl/core';

import {getResumeFileName, selectCertificates, selectExperience, selectProjects} from '@/src/utils/resumeUtils';
import {ResumePdf} from './generate-pdf/ResumePdf';
import {ResumeContent} from '@/src/data/resume/Resume';
import {JobTypeEnum} from '@/src/data/resume/types';
import {roles} from "@/src/config/roles";
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import {GetSocials} from '@/src/data/about/arrayRRSS';
import {GetterProjects} from '@/src/middleware/Getter';
import {GetProjects} from '@/src/middleware/ProjectDataArrayEncrypted';

type Locale = 'en' | 'es';

const socialNoList = ['Instagram'];

const summaries: Record<JobTypeEnum, Record<Locale, string>> = {
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

const candidateName = 'Gabriel Bustillo del Cuvillo';

interface Options {
  roleName?: string;
  role?: JobTypeEnum;
  locale: Locale;
  output?: string;
}

function parseArgs(args: string[]): Options {
  const options: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (!arg.startsWith('--')) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);

    if (!['role', 'locale', 'output'].includes(key)) {
      throw new Error(`Unknown option: --${key}`);
    }

    const value = args[++i];

    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }

    options[key] = value;
  }

  const roleName = options.role;
  const locale = options.locale ?? 'en';

  if (roleName && !(roleName in roles)) {
    throw new Error(
      `Invalid role "${roleName}". Use: ${Object.keys(roles).join(', ')}`,
    );
  }

  if (locale !== 'en' && locale !== 'es') {
    throw new Error('Invalid locale. Use en or es.');
  }

  if (options.output && !roleName) {
    throw new Error(
      '--output can only be used with --role because multiple PDFs may be generated.',
    );
  }

  return {
    roleName,
    role: roles.find(({label}) => label === roleName)?.value,
    locale: locale as Locale,
    output: options.output,
  };
}

async function generateResume(
  roleName: string,
  role: JobTypeEnum,
  locale: Locale,
  output?: string,
): Promise<void> {
  const messages = locale === 'es' ? esMessages : enMessages;

  const tResume = createTranslator({
    locale,
    messages: messages.Resume,
  });

  const resume = await ResumeContent(tResume);

  const projects = await GetProjects(await GetterProjects(locale, messages),);

  const contacts = [
    ...(await GetSocials()).filter(
      e => !socialNoList.includes(e.name),
    ),
    {
      name: 'Website',
      innerText: 'gabuscuv.dev',
      url: 'https://gabuscuv.dev/',
      logo: <div />,
    },
  ];

  const buffer = await renderToBuffer(
    <ResumePdf
      t={createTranslator({locale, messages: messages.CommonWords})}
      locale={locale}
      role={role}
      name={candidateName}
      projects={selectProjects(Date.parse('2017'), projects, role, 3)}
      contacts={contacts}
      certificates={selectCertificates(resume.Certificate, role)}
      experience={selectExperience(resume.Jobs, role)}
      education={resume.Education}
      talks={resume.Talks}
      summary={summaries[role] && summaries[role][locale] ? summaries[role][locale] : "" }
    />,
  );

  const filename = output ?? getResumeFileName(locale, role);

  // Only accept a filename, not a path.
  if (
    path.basename(filename) !== filename ||
    !filename.endsWith('.pdf')
  ) {
    throw new Error('--output must be a filename ending in .pdf');
  }

  const outputDir = path.resolve('output/cv');

  await mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, filename);

  await writeFile(outputPath, buffer);

  console.log(`Generated: ${outputPath}`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  // If --role is omitted, generate every role.
  const selectedRoles = options.role
    ? roles.filter(({value}) => value === options.role)
    : roles;

  for (const {value: role, label: roleName} of selectedRoles) {
    console.log(`Building ${roleName} resume (${options.locale})...`);

    await generateResume(
      roleName,
      role,
      options.locale,
      options.output,
    );
  }

  console.log('Resume generation complete.');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
