import { EducationType } from '@/src/data/Resume';
import { View, Text } from '@react-pdf/renderer';
import { styles } from '../ResumePdf';

export function EducationSection({ items, }: { items: EducationType[]; }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Education</Text>

      {items.map((item, index) => (
        <View
          key={`${item.Title}-${index}`}
          style={styles.educationItem}
          wrap={false}
        >
          <Text style={styles.itemTitle}>
            {item.Title}
          </Text>

          <Text style={styles.itemSubtitle}>
            {item.IssuerOrg}
            {item.Location ? ` · ${item.Location}` : ''}
          </Text>

          {item.originalTitle && (
            <Text style={styles.itemDescription}>
              {item.originalTitle}
            </Text>
          )}

          {item.EFramework && (
            <Text style={styles.itemSubtitle}>
              {item.EFramework}
            </Text>
          )}

          {item.techStack.length > 0 && (
            <Text style={styles.technologies}>
              {item.techStack.join(' · ')}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
}
