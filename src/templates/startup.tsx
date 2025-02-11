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
    backgroundColor: '#6366F1',
    padding: 20,
    marginHorizontal: -30,
    marginTop: -30,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contact: {
    fontSize: 10,
    color: 'white',
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#6366F1',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 15,
    borderLeft: 2,
    borderLeftColor: '#6366F1',
    paddingLeft: 10,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillBox: {
    backgroundColor: '#EEF2FF',
    padding: 8,
    borderRadius: 4,
    width: '48%',
  },
  projectBox: {
    backgroundColor: '#F5F3FF',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
});

interface Props {
  data: ResumeData;
}

export function StartupTemplate({ data }: Props) {
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

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mission Statement</Text>
            <Text style={styles.content}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Impact & Achievements</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {exp.position} @ {exp.company}
                </Text>
                <Text style={styles.content}>
                  {exp.location} | {exp.startDate} - {exp.endDate}
                </Text>
                {exp.description.map((desc, i) => (
                  <Text key={i} style={styles.content}>• {desc}</Text>
                ))}
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Expertise</Text>
            <View style={styles.skillGrid}>
              {data.skills.map((skillGroup, index) => (
                <View key={index} style={styles.skillBox}>
                  <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                    {skillGroup.category}
                  </Text>
                  <Text style={styles.content}>
                    {skillGroup.items.join(' • ')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Side Projects & Ventures</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectBox}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {project.name}
                </Text>
                <Text style={styles.content}>{project.description}</Text>
                <Text style={styles.content}>
                  Stack: {project.technologies.join(' • ')}
                </Text>
                {project.link && (
                  <Text style={styles.content}>Link: {project.link}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.content}>{edu.school}</Text>
                <Text style={styles.content}>
                  {edu.startDate} - {edu.endDate}
                </Text>
                {edu.gpa && <Text style={styles.content}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}