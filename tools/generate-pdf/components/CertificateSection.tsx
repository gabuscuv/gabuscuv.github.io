import { ResumeType } from '@/src/data/Resume';
import { View, Text } from '@react-pdf/renderer';
import { styles, formatYear } from '../ResumePdf';

export function CertificateSection({
  items,
}: {
  items: ResumeType['Certificate'];
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Certificates</Text>

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
            {item.IssuerOrg} · {item.type}
          </Text>

          <Text style={styles.itemSubtitle}>
            {formatYear(item.date, 'en', 'Present')}
          </Text>
        </View>
      ))}
    </View>
  );
}
