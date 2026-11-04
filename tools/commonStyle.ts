import {StyleSheet} from '@react-pdf/renderer';
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
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#aab0b8',
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
  description: {
    lineHeight: 1,
    marginBottom: 2,
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
