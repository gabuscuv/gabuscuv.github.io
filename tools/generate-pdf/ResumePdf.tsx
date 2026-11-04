import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';

import {
  CertificateType,
  EducationType,
  JobTypeEnum,
  TalksType,
} from '@/src/data/resume/types';

import {ExperienceSelection, ProjectSelection} from '@/src/utils/resumeUtils';
import {_Translator} from 'use-intl/core';
import {social} from '@/src/data/about/arrayRRSS';
import {ProjectSection} from './components/ProjectSection';
import {CertificateSection} from './components/CertificateSection';
import {TalksSection} from './components/TalksSection';
import {EducationSection} from './components/EducationSection';
import {WorkExperienceSection} from './components/WorkExperienceSection';

type Locale = 'en' | 'es';

type ResumePdfProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: _Translator<Record<string, any>>;
  locale: Locale;
  role: JobTypeEnum;
  experience: ExperienceSelection;
  projects: ProjectSelection;
  certificates: CertificateType[];
  talks: TalksType[];
  education: EducationType[];
  contacts: Array<social>;
  name: string;
  summary: string;
};

const socialStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  link: {
    fontSize: 8,
    color: '#334fc5',
    textDecoration: 'none',
  },
});
export const styles = StyleSheet.create({
  page: {
    paddingTop: 38,
    paddingBottom: 38,
    paddingHorizontal: 42,
    fontFamily: 'Helvetica',
    fontSize: 9,
    color: '#20242b',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 6,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#aab0b8',
  },
});

export function ResumePdf({
  t,
  locale,
  contacts,
  role,
  projects,
  experience,
  talks,
  name,
  education,
  certificates,
  summary,
}: ResumePdfProps) {
  return (
    <Document
      title={`${name} - ${JobTypeEnum[role]} CV`}
      author={name}
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{name}</Text>
        <View style={socialStyles.container}>
          {contacts.map(social => (
            <Link key={social.name} src={social.url} style={socialStyles.link}>
              {social.name}: {social.innerText}
            </Link>
          ))}
        </View>
        <Text style={styles.summary}>{summary}</Text>
        {experience.companies.length > 0 && (
          <WorkExperienceSection
            t={t}
            locale={locale}
            role={role}
            experience={experience}
          />
        )}
        <ProjectSection t={t} locale={locale} projects={projects} />
        {education.length > 0 && <EducationSection items={education} />}
        {certificates.length > 0 && <CertificateSection items={certificates} />}

        {talks.length > 0 && <TalksSection items={talks} />}
      </Page>
    </Document>
  );
}
