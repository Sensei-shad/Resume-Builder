import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    marginBottom: 20,
    marginHorizontal: -30,
    marginTop: -30,
  },
  name: {
    fontSize: 28,
    color: 'white',
    marginBottom: 5,
    fontFamily: 'Helvetica-Bold',
  },
  contact: {
    fontSize: 10,
    color: 'white',
    marginBottom: 2,
  },
  mainContent: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    width: '30%',
  },
  rightColumn: {
    width: '70%',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#2563eb',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  skillCategory: {
    backgroundColor: '#f0f7ff',
    padding: 5,
    marginBottom: 5,
  },
});

interface Props {
  data: ResumeData;
}

export function ModernTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.contact}>{data.personalInfo.email} | {data.personalInfo.phone}</Text>
          <Text style={styles.contact}>{data.personalInfo.location}</Text>
          {data.personalInfo.linkedin && (
            <Text style={styles.contact}>LinkedIn: {data.personalInfo.linkedin}</Text>
          )}
          {data.personalInfo.portfolio && (
            <Text style={styles.contact}>Portfolio: {data.personalInfo.portfolio}</Text>
          )}
        </View>

        <View style={styles.mainContent}>
          <View style={styles.leftColumn}>
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                {data.skills.map((skillGroup, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <View style={styles.skillCategory}>
                      <Text style={[styles.content, styles.bold]}>
                        {skillGroup.category}
                      </Text>
                    </View>
                    <Text style={styles.content}>
                      {skillGroup.items.join('\n')}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, index) => (
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={[styles.content, styles.bold]}>
                      {edu.degree}
                    </Text>
                    <Text style={styles.content}>{edu.fieldOfStudy}</Text>
                    <Text style={styles.content}>
                      {edu.school}
                    </Text>
                    <Text style={styles.content}>
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

          <View style={styles.rightColumn}>
            {data.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Professional Summary</Text>
                <Text style={styles.content}>{data.summary}</Text>
              </View>
            )}

            {data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {data.experience.map((exp, index) => (
                  <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={[styles.content, styles.bold]}>
                      {exp.position}
                    </Text>
                    <Text style={styles.content}>
                      {exp.company} | {exp.location}
                    </Text>
                    <Text style={[styles.content, { color: '#2563eb', marginBottom: 3 }]}>
                      {exp.startDate} - {exp.endDate}
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
                  <View key={index} style={{ marginBottom: 8 }}>
                    <Text style={[styles.content, styles.bold]}>
                      {project.name}
                    </Text>
                    <Text style={styles.content}>{project.description}</Text>
                    <Text style={styles.content}>
                      Technologies: {project.technologies.join(', ')}
                    </Text>
                    {project.link && (
                      <Text style={styles.content}>Link: {project.link}</Text>
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