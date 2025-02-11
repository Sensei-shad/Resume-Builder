import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 15,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 10,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 4,
  },
  contact: {
    fontSize: 8,
    color: '#4B5563',
    marginBottom: 1,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1F2937',
    marginBottom: 6,
    backgroundColor: '#F3F4F6',
    padding: 2,
  },
  content: {
    fontSize: 8,
    lineHeight: 1.4,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  experienceItem: {
    marginBottom: 8,
  },
  columns: {
    flexDirection: 'row',
    gap: 15,
  },
  leftColumn: {
    width: '65%',
  },
  rightColumn: {
    width: '35%',
  },
});

interface Props {
  data: ResumeData;
}

export function CompactTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contact}>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
          </Text>
          {(data.personalInfo.linkedin || data.personalInfo.portfolio) && (
            <Text style={styles.contact}>
              {data.personalInfo.linkedin}
              {data.personalInfo.linkedin && data.personalInfo.portfolio && ' | '}
              {data.personalInfo.portfolio}
            </Text>
          )}
        </View>

        <View style={styles.columns}>
          <View style={styles.leftColumn}>
            {data.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.content}>{data.summary}</Text>
              </View>
            )}

            {data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {data.experience.map((exp, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={[styles.content, styles.bold]}>
                      {exp.position} - {exp.company}
                    </Text>
                    <Text style={[styles.content, { color: '#6B7280' }]}>
                      {exp.location} | {exp.startDate} - {exp.endDate}
                    </Text>
                    {exp.description.map((desc, i) => (
                      <Text key={i} style={styles.content}>• {desc}</Text>
                    ))}
                  </View>
                ))}
              </View>
            )}

            {data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.experienceItem}>
                    <Text style={[styles.content, styles.bold]}>{project.name}</Text>
                    <Text style={styles.content}>{project.description}</Text>
                    <Text style={[styles.content, { color: '#6B7280' }]}>
                      {project.technologies.join(' • ')}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.rightColumn}>
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {data.skills.map((skillGroup, index) => (
                  <View key={index} style={{ marginBottom: 6 }}>
                    <Text style={[styles.content, styles.bold]}>
                      {skillGroup.category}
                    </Text>
                    <Text style={styles.content}>
                      {skillGroup.items.join(' • ')}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 6 }}>
                    <Text style={[styles.content, styles.bold]}>
                      {edu.degree} in {edu.fieldOfStudy}
                    </Text>
                    <Text style={styles.content}>{edu.school}</Text>
                    <Text style={[styles.content, { color: '#6B7280' }]}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                    {edu.gpa && (
                      <Text style={styles.content}>GPA: {edu.gpa}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}