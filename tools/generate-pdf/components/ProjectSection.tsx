import {
  View,
  Text,
  StyleSheet,
  Link,
} from '@react-pdf/renderer';

import type {ProjectData} from '@/src/data/ProjectDataTypes';
import {JobTypeEnum} from '@/src/data/Resume';
import {selectProjects} from '@/src/utils/resumeUtils';
import {type} from '@/src/data/type';

type ProjectSectionProps = {
  projects: ProjectData[];
  role: JobTypeEnum;
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
  projects,
  role,
  maxProjects = 6,
  includeHidden = false,
}: ProjectSectionProps) {
  const selectedProjects = selectProjects(
    projects,
    role,
    maxProjects,
    includeHidden,
  );

  if (selectedProjects.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>
        Projects
      </Text>

      {selectedProjects.map(project => (
        <View
          key={project.id}
          style={styles.project}
          wrap={false}
        >
          <View style={styles.heading}>
            <Text style={styles.title}>
              {project.name}
            </Text>

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
                .map(tech => type[tech]?.FullName ?? tech)
                .join(' · ')}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}