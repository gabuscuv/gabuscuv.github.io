import {ResumeType} from '@/src/data/resume/types';
import {View, Text} from '@react-pdf/renderer';
import {styles, formatYear} from '../ResumePdf';

export function TalksSection({
  items,
}: {
  items: ResumeType['Talks'];
}) {
  return (
    <View>
      <Text style={styles.sectionTitle}>Talks & Presentations</Text>

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
            {item.location} · {formatYear(item.date, 'en', 'Present')}
          </Text>
        </View>
      ))}
    </View>
  );
}
