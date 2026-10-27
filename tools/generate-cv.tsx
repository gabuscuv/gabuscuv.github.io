import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {renderToBuffer} from '@react-pdf/renderer';
import {createTranslator} from 'use-intl/core';
import {selectCertificates, selectExperience, selectProjects} from '@/src/utils/resumeUtils';
import {ResumePdf} from './generate-pdf/ResumePdf';
import {JobTypeEnum} from '@/src/data/Resume';
import {ResumeContent} from '@/src/data/Resume';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import {GetSocials} from '@/src/data/arrayRRSS';
import {GetterProjects} from '@/src/middleware/Getter';
import {GetProjects} from '@/src/middleware/ProjectDataArrayEncrypted';

type Locale = 'en' | 'es';

const socialNoList= ["Instagram"]

const roles: Record<string, JobTypeEnum> = {
  All: JobTypeEnum.All,
  GameDev: JobTypeEnum.GameDev,
  Backend: JobTypeEnum.Backend,
  WebDev: JobTypeEnum.WebDev,
};

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
    en: 'Software developer experienced in C#, TypeScript and React, building web applications and maintainable software systems.',
    es: 'Desarrollador de software con experiencia en C#, TypeScript, React y Next.js, especializado en el desarrollo de aplicaciones web y sistemas de software mantenibles.',
  },
};

const candidateName = 'Gabriel Bustillo del Cuvillo';

function parseArgs(args: string[]) {
  const options: Record<string, string> = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (!arg.startsWith('--')) {
      throw new Error(`Unexpected argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = args[++i];

    if (!value || value.startsWith('--')) {
      throw new Error(`Missing value for --${key}`);
    }

    options[key] = value;
  }

  const roleName = options.role ?? 'All';
  const locale = options.locale ?? 'en';

  if (!(roleName in roles)) {
    throw new Error(
      `Invalid role "${roleName}". Use: ${Object.keys(roles).join(', ')}`,
    );
  }

  if (locale !== 'en' && locale !== 'es') {
    throw new Error('Invalid locale. Use en or es.');
  }

  return {
    roleName,
    role: roles[roleName],
    locale: locale as Locale,
    output: options.output,
  };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));

  const messages = options.locale === 'es' ? esMessages : enMessages;
  const tResume = createTranslator({ locale: options.locale, messages: messages.Resume });

  const resume = (await ResumeContent(tResume));
    
  const buffer = await renderToBuffer(
    <ResumePdf
      t={createTranslator({ locale: options.locale, messages: messages.CommonWords })}
      locale={options.locale}
      role={options.role}
      name={candidateName}
      projects={selectProjects(Date.parse('2017'), await GetProjects(await GetterProjects(options.locale, messages)), options.role, 3)}
      contacts={[...(await GetSocials()).filter(e => !socialNoList.includes(e.name)), {name: "Website", innerText: "gabuscuv.dev",url:"https://gabuscuv.dev/",logo: <div />}]}
      certificates={selectCertificates(resume.Certificate, options.role)}
      experience={selectExperience(resume.Jobs, options.role)}
      education={resume.Education}
      talks={resume.Talks}
      summary={summaries[options.role]}
    />,
  );

  const filename =
    options.output ??
    `resume-${options.roleName.toLowerCase()}-${options.locale}.pdf`;

  // Only accept a filename, not a path, to keep output inside dist/cv.
  if (path.basename(filename) !== filename || !filename.endsWith('.pdf')) {
    throw new Error('--output must be a filename ending in .pdf');
  }

  const outputDir = path.resolve('dist/cv');
  await mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, filename);
  await writeFile(outputPath, buffer);

  console.log(`Generated: ${outputPath}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
