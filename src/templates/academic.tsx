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
    borderBottom: 2,
    borderBottomColor: '#14532D',
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#14532D',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#166534',
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#14532D',
    marginBottom: 10,
    borderBottom: 1,
    borderBottomColor: '#BBF7D0',
    paddingBottom: 2,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 15,
  },
  publicationItem: {
    marginBottom: 10,
    paddingLeft: 15,
  },
  researchItem: {
    marginBottom: 15,
    backgroundColor: '#F0FDF4',
    padding: 10,
    borderRadius: 4,
  },
});

interface Props {
  data: ResumeData;
}

export function AcademicTemplate({ data }: Props) {
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
            <Text style={styles.contact}>Academic Profile: {data.personalInfo.portfolio}</Text>
          )}
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Interests</Text>
            <Text style={styles.content}>{data.summary}</Text>
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.educationItem}>
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

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Research Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.researchItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {exp.position}
                </Text>
                <Text style={styles.content}>
                  {exp.company} | {exp.location}
                </Text>
                <Text style={styles.content}>
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
            <Text style={styles.sectionTitle}>Publications & Papers</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.publicationItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {project.name}
                </Text>
                <Text style={styles.content}>{project.description}</Text>
                <Text style={styles.content}>
                  Keywords: {project.technologies.join(', ')}
                </Text>
                {project.link && (
                  <Text style={styles.content}>DOI: {project.link}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Areas of Expertise</Text>
            {data.skills.map((skillGroup, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {skillGroup.category}:
                </Text>
                <Text style={styles.content}>
                  {skillGroup.items.join(' • ')}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}