import {mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {renderToBuffer} from '@react-pdf/renderer';
import {createTranslator} from 'use-intl/core';

import {
  getResumeFileName,
  selectCertificates,
  selectExperience,
  selectProjects,
} from '@/src/utils/resumeUtils';
import {ResumePdf} from './generate-pdf/ResumePdf';
import {ResumeContent} from '@/src/data/resume/Resume';
import {JobTypeEnum} from '@/src/data/resume/types';
import {roles} from '@/src/config/roles';
import enMessages from '@/messages/en.json';
import esMessages from '@/messages/es.json';
import {GetSocials} from '@/src/data/about/arrayRRSS';
import {GetterProjects} from '@/src/middleware/Getter';
import {GetProjects} from '@/src/middleware/ProjectDataArrayEncrypted';
import {socialNoList, candidateName, summaries} from './config';

export type Locale = 'en' | 'es';

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

  const projects = await GetProjects(await GetterProjects(locale, messages));

  const contacts = [
    ...(await GetSocials()).filter(e => !socialNoList.includes(e.name)),
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
      summary={
        summaries[role] && summaries[role][locale]
          ? summaries[role][locale]
          : ''
      }
    />,
  );

  const filename = output ?? getResumeFileName(locale, role);

  // Only accept a filename, not a path.
  if (path.basename(filename) !== filename || !filename.endsWith('.pdf')) {
    throw new Error('--output must be a filename ending in .pdf');
  }

  const outputDir = path.resolve('output/cv');

  await mkdir(outputDir, {recursive: true});

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

    await generateResume(roleName, role, options.locale, options.output);
  }

  console.log('Resume generation complete.');
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
