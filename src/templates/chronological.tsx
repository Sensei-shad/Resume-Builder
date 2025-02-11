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
    marginBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#475569',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
    marginBottom: 5,
  },
  contact: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
    marginBottom: 8,
    borderLeft: 4,
    borderLeftColor: '#475569',
    paddingLeft: 6,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#334155',
  },
  experienceItem: {
    marginBottom: 12,
    paddingLeft: 10,
  },
  dateRange: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 2,
  },
  timeline: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  timelineDot: {
    position: 'absolute',
    left: -4,
    top: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#475569',
  },
});

interface Props {
  data: ResumeData;
}

export function ChronologicalTemplate({ data }: Props) {
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
              <View key={index} style={styles.experienceItem}>
                <View style={styles.timeline} />
                <View style={styles.timelineDot} />
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {exp.position}
                </Text>
                <Text style={styles.content}>{exp.company} | {exp.location}</Text>
                <Text style={styles.dateRange}>{exp.startDate} - {exp.endDate}</Text>
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
              <View key={index} style={styles.experienceItem}>
                <View style={styles.timeline} />
                <View style={styles.timelineDot} />
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.content}>{edu.school}</Text>
                <Text style={styles.dateRange}>{edu.startDate} - {edu.endDate}</Text>
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
              <View key={index} style={{ marginBottom: 6 }}>
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

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <View style={styles.timeline} />
                <View style={styles.timelineDot} />
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
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