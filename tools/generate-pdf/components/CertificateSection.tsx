import {ResumeType} from '@/src/data/resume/types';
import {View, Text} from '@react-pdf/renderer';
import {styles} from '../../commonStyle';
import {getFormatYear} from '@/src/utils/dates';

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
          <Text style={styles.itemTitle}>{item.Title}</Text>

          <Text style={styles.itemSubtitle}>
            {item.IssuerOrg} · {item.type}
          </Text>

          <Text style={styles.itemSubtitle}>
            {getFormatYear(item.date, 'en', 'Present')}
          </Text>
        </View>
      ))}
    </View>
  );
}
