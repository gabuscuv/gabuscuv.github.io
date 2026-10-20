import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
} from '@react-pdf/renderer';

import {
  JobTypeEnum,
  ResumeType,
  type JobsType,
} from '@/src/data/Resume';
import {getYearsMonthRange, OnGoingValue} from '@/src/utils/dates';
import {type} from '@/src/data/type';
import {ExperienceSelection, getWorkEntriesHeader} from '@/src/utils/resumeUtils';
import {_Translator} from 'use-intl/core';
import {social} from '@/src/data/arrayRRSS';
import {ProjectData} from '@/src/data/ProjectDataTypes';
import { ProjectSection } from './components/ProjectSection';
import { CertificateSection } from './components/CertificateSection';
import { TalksSection } from './components/TalksSection';
import { EducationSection } from './components/EducationSection';

type Locale = 'en' | 'es';

type ResumePdfProps = {
  t: _Translator<Record<string, any>>;
  locale: Locale;
  role: JobTypeEnum;
  experience: ExperienceSelection;
  projects: ProjectData[]
  rawResume : ResumeType;
  contacts: Array<social>
  name: string;
  summary: Record<Locale, string>;
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
    flexWrap: 'wrap',
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
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 18,
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
  name,
  rawResume,
  summary,
}: ResumePdfProps) {
  const companies = experience.companies
    .map(company => {
      const jobs =
        role === JobTypeEnum.All
          ? company.Jobs
          : company.Jobs.filter(
              job => job.JobType === role,
            );

      // Keep up to two positions per company in a
      // targeted CV, but all positions in the full CV.
      const selectedJobs =
        role === JobTypeEnum.All
          ? jobs
          : jobs.slice(0, 2);

      return { company, jobs: selectedJobs };
    })
    .filter(entry => entry.jobs.length > 0);

  return (
    <Document
      title={`${name} - ${JobTypeEnum[role]} CV`}
      author={name}
      language={locale}
    >
      <Page size="A4" style={styles.page} wrap>
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
          {summary[locale]}
        </Text>

        <Text style={styles.sectionTitle}>
          {getWorkEntriesHeader(t, experience)} - <Link src={`https://gabuscuv.dev/${locale}/Resume`}>More Information</Link>
        </Text>

        {companies.map(({ company, jobs }) => (
          <View
            key={`${company.Title}-${company.StartDate}`}
            style={styles.company}
            wrap={false}
          >
            <View style={styles.companyHeading}>
              {company.Url ? (
                <Link
                  src={company.Url}
                  style={styles.companyName}
                >
                  {company.Title}
                </Link>
              ) : (
                <Text style={styles.companyName}>
                  {company.Title}
                </Text>
              )}

              <Text style={styles.location}>
                {company.Location}
              </Text>
            </View>

            <Text style={styles.dates}>
              {formatYear(
                company.StartDate,
                locale,
                t("OnGoing"),
              )}{' '}
              –{' '}
              {formatYear(
                company.EndDate,
                locale,
                t("OnGoing"),
              )}
            </Text>

            {jobs.map(job => (
              <JobEntry
                key={`${job.Title}-${job.StartDate}`}
                job={job}
                locale={locale}
                OnGoing={t("OnGoing")}
              />
            ))}
          </View>
        ))}
        {projects.length > 0 && (
          <ProjectSection projects={projects} role={role} />
        )}
        {rawResume.Education.length > 0 && (
          <EducationSection items={rawResume.Education} />
        )}
        {rawResume.Certificate.length > 0 && (
          <CertificateSection items={rawResume.Certificate} />
        )}

      {rawResume.Talks.length > 0 && (
        <TalksSection items={rawResume.Talks} />
      )}
      </Page>
    </Document>
  );
}

function JobEntry({
  job,
  locale,
  OnGoing,
}: {
  job: JobsType;
  locale: Locale;
  OnGoing: string;
}) {
  const localized = job;

  return (
    <View style={styles.job} wrap>
      <Text style={styles.jobTitle}>
        {localized.Title}
      </Text>

      <Text style={styles.dates}>
        {getYearsMonthRange(locale, job.StartDate, job.EndDate, OnGoing)}
      </Text>

      {localized.Description && (
        <Text style={styles.description}>
          {localized.Description}
        </Text>
      )}

      {localized.BulletPoints.map((bullet, index) => (
        <Text
          key={`${index}-${bullet}`}
          style={styles.bullet}
        >
          • {bullet}
        </Text>
      ))}

      {job.techStack.length > 0 && (
        <Text style={styles.technologies}>
          {job.techStack.map(tech => (type[tech]?.FullName ?? tech)).join(' · ')}
        </Text>
      )}
    </View>
  );
}
