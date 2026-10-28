import {
  Link,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { _Translator} from 'use-intl/core';

import {JobTypeEnum, type JobsType} from '@/src/data/Resume';
import {type} from '@/src/data/type';
import {getYearsMonthRange,OnGoingValue,} from '@/src/utils/dates';
import {type ExperienceSelection, getWorkEntriesHeader, Locale} from '@/src/utils/resumeUtils';


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
  multimediaSection: {
  marginTop: 0,
},

multimediaTitle: {
  fontSize: 7,
  fontWeight: 'bold',
},

multimediaItem: {
  fontSize:6,
  color: '#2563eb',
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
  experience,
}: WorkExperienceSectionProps) {
  // Selection, filtering, ranking and position limits are handled
  // by selectExperience() before the data reaches this component.
  const companies = experience.companies;
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

      {companies.map(company => (
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
            {formatYear(company.StartDate, locale, ongoing)}{' '}
            –{' '}
            {formatYear(company.EndDate, locale, ongoing)}
          </Text>

          {company.Jobs.map(job => (
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
          key={`${index}-${bullet.translationKey}`}
          style={styles.bullet}
        >
          • {bullet.translation}
        </Text>
      ))}

      {job.multimediaContent && job.multimediaContent?.length > 0 && (
        <View style={styles.multimediaSection}>
          {job.multimediaContent.map((item, index) => (
            <Link
              key={`${index}-${item.text}`}
              style={styles.multimediaItem}
              href={item.url || undefined}
            >
              {item.url ? item.text : `• ${item.text}`}
            </Link>
          ))}
        </View>
      )}

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
