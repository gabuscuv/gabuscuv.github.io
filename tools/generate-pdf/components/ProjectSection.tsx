import {
  View,
  Text,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';

import type {ProjectData} from '@/src/data/projects/types';
import {getProjectEntriesHeader, Locale, ProjectSelection, selectProjects} from '@/src/utils/resumeUtils';
import {techStack} from '@/src/data/techStack';
import {_Translator} from 'use-intl/core';

type ProjectSectionProps = {
  t: _Translator<Record<string, any>>;
  projects: ProjectSelection;
  locale: Locale;
  maxProjects?: number;
  includeHidden?: boolean;
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
    section: {
    marginBottom: 8,
  },
  project: {
    marginBottom: 6,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 1,
  },
  title: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    flexGrow: 1,
  },
  year: {
    fontSize: 8,
    color: '#646b75',
    marginLeft: 8,
  },
  summary: {
    fontSize: 9,
    lineHeight: 1.25,
    marginTop: 2,
  },
  technologies: {
    fontSize: 8,
    color: '#59616d',
    lineHeight: 1.2,
    marginTop: 2,
  },
});

export function ProjectSection({
  t,
  locale,
  projects
}: ProjectSectionProps) {

  return (
    <View style={styles.section}>
            <Text style={styles.sectionTitle}>
        {getProjectEntriesHeader(t, projects)} -{' '}
              <Link
                src={`https://gabuscuv.dev/${locale}/Projects`}
                style={styles.sectionLink}
              >
                More Information
              </Link>
            </Text>
      
      {projects.projects.map(project => (
        <View
          key={project.id}
          style={styles.project}
          wrap={false}
        >
        <View style={styles.heading}>
            {project.url ? (
            <Link style={styles.title} src={project.url} >
              {project.name}
            </Link>
        ) : (
          <Text style={styles.title}>
            {project.name}
          </Text>
          )}

            <Text style={styles.year}>
              {project.year}
            </Text>
          </View>

          {project.summary && (
            <Text style={styles.summary}>
              {project.summary}
            </Text>
          )}

          {project.techStack.length > 0 && (
            <Text style={styles.technologies}>
              {project.techStack
                .map(tech => techStack[tech]?.fullName ?? tech)
                .join(' · ')}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}