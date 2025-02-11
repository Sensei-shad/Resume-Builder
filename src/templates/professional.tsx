import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#333',
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    backgroundColor: '#f0f0f0',
    padding: 5,
    marginBottom: 8,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
});

interface Props {
  data: ResumeData;
}

export function ProfessionalTemplate({ data }: Props) {
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
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.content}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.content, styles.bold]}>
                  {exp.position}
                </Text>
                <Text style={styles.content}>
                  {exp.company} | {exp.location} | {exp.startDate} - {exp.endDate}
                </Text>
                {exp.description.map((desc, i) => (
                  <Text key={i} style={styles.content}>• {desc}</Text>
                ))}
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
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.content}>
                  {edu.school} | {edu.startDate} - {edu.endDate}
                </Text>
                {edu.gpa && (
                  <Text style={styles.content}>GPA: {edu.gpa}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((skillGroup, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <Text style={[styles.content, styles.bold]}>
                  {skillGroup.category}:
                </Text>
                <Text style={styles.content}>
                  {skillGroup.items.join(' • ')}
                </Text>
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
      </Page>
    </Document>
  );
}