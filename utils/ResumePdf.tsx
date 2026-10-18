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
  type JobsType,
} from '@/src/data/Resume';
import {onGoingValue} from '@/src/utils/dates';
import {type} from '@/src/data/type';
import {ExperienceSelection, getWorkEntriesHeader} from '@/src/utils/resumeUtils';
import {_Translator} from 'use-intl/core';

type Locale = 'en' | 'es';

type ResumePdfProps = {
  t: _Translator<Record<string, any>>;
  locale: Locale;
  role: JobTypeEnum;
  experience: ExperienceSelection;
  name: string;
  summary: Record<Locale, string>;
};

const labels: Record<
  Locale,
  {
    experience: string;
    location: string;
    ongoing: string;
    technologies: string;
  }
> = {
  en: {
    experience: 'Work Experience',
    location: 'Location',
    ongoing: 'Present',
    technologies: 'Technologies',
  },
  es: {
    experience: 'Experiencia profesional',
    location: 'Ubicación',
    ongoing: 'Actualidad',
    technologies: 'Tecnologías',
  },
};

const styles = StyleSheet.create({
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
    fontSize: 15,
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
    marginBottom: 9,
    paddingLeft: 8,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 1,
  },
  description: {
    lineHeight: 1.4,
    marginBottom: 4,
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 1,
    lineHeight: 1.35,
  },
  technologies: {
    fontSize: 8,
    color: '#59616d',
    marginTop: 4,
    lineHeight: 1.4,
  },
});

function formatYear(
  timestamp: number,
  locale: Locale,
  ongoing: string,
): string {
  if (timestamp === onGoingValue) return ongoing;

  return new Date(timestamp).toLocaleDateString(locale, {
    year: 'numeric',
  });
}

export function ResumePdf({
  t,
  locale,
  role,
  experience,
  name,
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

        <Text style={styles.summary}>
          {summary[locale]}
        </Text>

        <Text style={styles.sectionTitle}>
          {getWorkEntriesHeader(t, experience)}
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
                t("ongoing"),
              )}{' '}
              –{' '}
              {formatYear(
                company.EndDate,
                locale,
                t("ongoing"),
              )}
            </Text>

            {jobs.map(job => (
              <JobEntry
                key={`${job.Title}-${job.StartDate}`}
                job={job}
                locale={locale}
                ongoing={t("ongoing")}
              />
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
}

function JobEntry({
  job,
  locale,
  ongoing,
}: {
  job: JobsType;
  locale: Locale;
  ongoing: string;
}) {
  const localized = job;

  return (
    <View style={styles.job} wrap>
      <Text style={styles.jobTitle}>
        {localized.Title}
      </Text>

      <Text style={styles.dates}>
        {formatYear(job.StartDate, locale, ongoing)} –{' '}
        {formatYear(job.EndDate, locale, ongoing)}
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
