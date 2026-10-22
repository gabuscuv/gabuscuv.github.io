import {
  Link,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { _Translator } from 'use-intl/core';

import {JobTypeEnum, type JobsType} from '@/src/data/Resume';
import { type } from '@/src/data/type';
import {getYearsMonthRange,OnGoingValue,} from '@/src/utils/dates';
import {type ExperienceSelection, getWorkEntriesHeader} from '@/src/utils/resumeUtils';

type Locale = 'en' | 'es';

type WorkExperienceSectionProps = {
  t: _Translator<Record<string, any>>;
  locale: Locale;
  role: JobTypeEnum;
  experience: ExperienceSelection;
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#aab0b8',
  },
  sectionLink: {
    fontSize: 8,
    color: '#334fc5',
    textDecoration: 'none',
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
});

export function formatYear(
  timestamp: number,
  locale: Locale,
  ongoing: string,
): string {
  if (timestamp === OnGoingValue) return ongoing;

  return new Date(timestamp).toLocaleDateString(locale, {
    year: 'numeric',
  });
}

export function WorkExperienceSection({
  t,
  locale,
  role,
  experience,
}: WorkExperienceSectionProps) {
  const companies = experience.companies
    .map(company => {
      const jobs =
        role === JobTypeEnum.All
          ? company.Jobs
          : company.Jobs.filter(
              job => job.JobType === role,
            );

      // Keep up to two positions per company in
      // targeted CVs, but all positions in the full CV.
      const selectedJobs =
        role === JobTypeEnum.All
          ? jobs
          : jobs.slice(0, 2);

      return {
        company,
        jobs: selectedJobs,
      };
    })
    .filter(entry => entry.jobs.length > 0);

  const ongoing = t('OnGoing');

  return (
    <View>
      <Text style={styles.sectionTitle}>
        {getWorkEntriesHeader(t, experience)} -{' '}
        <Link
          src={`https://gabuscuv.dev/${locale}/Resume`}
          style={styles.sectionLink}
        >
          More Information
        </Link>
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
              ongoing,
            )}{' '}
            –{' '}
            {formatYear(
              company.EndDate,
              locale,
              ongoing,
            )}
          </Text>

          {jobs.map(job => (
            <JobEntry
              key={`${job.Title}-${job.StartDate}`}
              job={job}
              locale={locale}
              ongoing={ongoing}
            />
          ))}
        </View>
      ))}
    </View>
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
  return (
    <View style={styles.job} wrap>
      <Text style={styles.jobTitle}>
        {job.Title}
      </Text>

      <Text style={styles.dates}>
        {getYearsMonthRange(
          locale,
          job.StartDate,
          job.EndDate,
          ongoing,
        )}
      </Text>

      {job.Description && (
        <Text style={styles.description}>
          {job.Description}
        </Text>
      )}

      {job.BulletPoints.map((bullet, index) => (
        <Text
          key={`${index}-${bullet}`}
          style={styles.bullet}
        >
          • {bullet}
        </Text>
      ))}

      {job.techStack.length > 0 && (
        <Text style={styles.technologies}>
          {job.techStack
            .map(tech => type[tech]?.FullName ?? tech)
            .join(' · ')}
        </Text>
      )}
    </View>
  );
}
