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
} from '@/src/data/Resume';

import {OnGoingValue} from '@/src/utils/dates';
import {ExperienceSelection, ProjectSelection} from '@/src/utils/resumeUtils';
import {_Translator} from 'use-intl/core';
import {social} from '@/src/data/arrayRRSS';
import {ProjectSection} from './components/ProjectSection';
import {CertificateSection} from './components/CertificateSection';
import {TalksSection} from './components/TalksSection';
import {EducationSection} from './components/EducationSection';
import {WorkExperienceSection} from './components/WorkExperienceSection';

type Locale = 'en' | 'es';

type ResumePdfProps = {
  t: _Translator<Record<string, any>>;
  locale: Locale;
  role: JobTypeEnum;
  experience: ExperienceSelection;
  projects: ProjectSelection;
  certificates: CertificateType[];
  talks: TalksType[];
  education: EducationType[];
  contacts: Array<social>
  name: string;
  summary: string;
};

const labels: Record<
  Locale,
  {
    experience: string;
    location: string;
    OnGoing: string;
    technologies: string;
  }
> = {
  en: {
    experience: 'Work Experience',
    location: 'Location',
    OnGoing: 'Present',
    technologies: 'Technologies',
  },
  es: {
    experience: 'Experiencia profesional',
    location: 'Ubicación',
    OnGoing: 'Actualidad',
    technologies: 'Tecnologías',
  },
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
  }
})
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
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#aab0b8',
  },
  company: {
    marginBottom: 14,
  },
  companyHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  companyName: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    flexGrow: 1,
  },
  location: {
    fontSize: 8,
    color: '#646b75',
    textAlign: 'right',
  },
  dates: {
    fontSize: 8,
    color: '#646b75',
    marginBottom: 6,
  },
  job: {
    marginBottom: 6,
    paddingLeft: 8,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  description: {
    lineHeight: 1,
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 0,
    lineHeight: 1,
  },
  technologies: {
    fontSize: 8,
    color: '#59616d',
    marginTop: 2,
    lineHeight: 1.2,
  },
  educationItem: {
  marginBottom: 6,
},
itemHeading: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
},
itemTitle: {
  fontSize: 10,
  fontFamily: 'Helvetica-Bold',
},
itemSubtitle: {
  fontSize: 8,
  color: '#59616d',
  marginTop: 1,
},
itemDescription: {
  fontSize: 9,
  lineHeight: 1.2,
  marginTop: 2,
},
});

export function formatYear(
  timestamp: number,
  locale: Locale,
  OnGoing: string,
): string {
  if (timestamp === OnGoingValue) return OnGoing;

  return new Date(timestamp).toLocaleDateString(locale, {
    year: 'numeric',
  });
}

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
      <Page size="A4" style={styles.page} >
        <Text style={styles.name}>{name}</Text>
      <View style={socialStyles.container}>
        {contacts.map(social => (
          <Link
            key={social.name}
            src={social.url}
            style={socialStyles.link}
          >
            {social.name}: {social.innerText}
          </Link>
        ))}
      </View>
        <Text style={styles.summary}>
          {summary}
        </Text>
        {experience.companies.length > 0 &&
          <WorkExperienceSection t={t} locale={locale} role={role} experience={experience} />
        }
        <ProjectSection t={t} locale={locale} projects={projects} />
        {education.length > 0 && (
          <EducationSection items={education} />
        )}
        {certificates.length > 0 && (
          <CertificateSection items={certificates} />
        )}

      {talks.length > 0 && (
        <TalksSection items={talks} />
      )}
      </Page>
    </Document>
  );
}
