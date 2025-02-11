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
    backgroundColor: '#7C3AED',
    padding: 20,
    marginHorizontal: -30,
    marginTop: -30,
    marginBottom: 20,
    transform: 'skewY(-5deg)',
    transformOrigin: 'bottom left',
  },
  headerContent: {
    transform: 'skewY(5deg)',
  },
  name: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#7C3AED',
    marginBottom: 10,
    borderBottom: 2,
    borderBottomColor: '#DDD6FE',
    paddingBottom: 2,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 15,
    backgroundColor: '#F5F3FF',
    padding: 10,
    borderRadius: 5,
    borderLeft: 3,
    borderLeftColor: '#7C3AED',
  },
  skillBox: {
    backgroundColor: '#F5F3FF',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  projectBox: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#F5F3FF',
    borderRadius: 5,
  },
});

interface Props {
  data: ResumeData;
}

export function InnovativeTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
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
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vision Statement</Text>
            <Text style={styles.content}>{data.summary}</Text>
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
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
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Journey</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {exp.position}
                </Text>
                <Text style={styles.content}>
                  {exp.company} | {exp.location}
                </Text>
                <Text style={[styles.content, { color: '#7C3AED' }]}>
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
            <Text style={styles.sectionTitle}>Innovation Portfolio</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.projectBox}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {project.name}
                </Text>
                <Text style={styles.content}>{project.description}</Text>
                <Text style={[styles.content, { color: '#7C3AED' }]}>
                  {project.technologies.join(' • ')}
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
            <Text style={styles.sectionTitle}>Educational Foundation</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.content}>{edu.school}</Text>
                <Text style={[styles.content, { color: '#7C3AED' }]}>
                  {edu.startDate} - {edu.endDate}
                </Text>
                {edu.gpa && (
                  <Text style={styles.content}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}