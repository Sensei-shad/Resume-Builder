import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../types/resume';
import { PDFText } from '../components/PDFText';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 2,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
});

interface Props {
  data: ResumeData;
}

export function MinimalTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contact}>{data.personalInfo.email} | {data.personalInfo.phone}</Text>
          <Text style={styles.contact}>{data.personalInfo.location}</Text>
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <PDFText text={data.summary} style={styles.content} />
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <PDFText
                  text={`${exp.position} at ${exp.company} | ${exp.startDate} - ${exp.endDate}`}
                  style={styles.content}
                />
                {exp.description.map((desc, i) => (
                  <PDFText key={i} text={`• ${desc}`} style={styles.content} />
                ))}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <PDFText
                  text={`${edu.degree} in ${edu.fieldOfStudy}`}
                  style={styles.content}
                />
                <PDFText
                  text={`${edu.school} | ${edu.startDate} - ${edu.endDate}`}
                  style={styles.content}
                />
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((skillGroup, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <PDFText
                  text={`${skillGroup.category}: ${skillGroup.items.join(', ')}`}
                  style={styles.content}
                />
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}