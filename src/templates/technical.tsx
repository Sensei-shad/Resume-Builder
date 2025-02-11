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
    backgroundColor: '#1E293B',
    padding: 20,
    marginHorizontal: -30,
    marginTop: -30,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    color: '#E2E8F0',
    marginBottom: 2,
  },
  mainContent: {
    flexDirection: 'row',
    gap: 20,
  },
  leftColumn: {
    width: '32%',
  },
  rightColumn: {
    width: '68%',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
    marginBottom: 8,
    backgroundColor: '#F1F5F9',
    padding: 4,
    borderRadius: 2,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#334155',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  skillBox: {
    backgroundColor: '#F8FAFC',
    padding: 6,
    marginBottom: 6,
    borderRadius: 3,
  },
  projectBox: {
    borderLeft: 2,
    borderLeftColor: '#3B82F6',
    paddingLeft: 8,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: '#EFF6FF',
    padding: '2 4',
    marginRight: 4,
    borderRadius: 2,
    color: '#2563EB',
    fontSize: 8,
    marginBottom: 2,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
});

interface Props {
  data: ResumeData;
}

export function TechnicalTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.title}>Software Engineer</Text>
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
                <Text style={styles.sectionTitle}>Technical Skills</Text>
                {data.skills.map((skillGroup, index) => (
                  <View key={index} style={styles.skillBox}>
                    <Text style={[styles.content, styles.bold]}>
                      {skillGroup.category}
                    </Text>
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
                    <Text style={[styles.content, { color: '#64748B' }]}>
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

            {data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Technical Projects</Text>
                {data.projects.map((project, index) => (
                  <View key={index} style={styles.projectBox}>
                    <Text style={[styles.content, styles.bold]}>
                      {project.name}
                    </Text>
                    <Text style={styles.content}>{project.description}</Text>
                    <View style={styles.tagContainer}>
                      {project.technologies.map((tech, i) => (
                        <Text key={i} style={styles.tag}>{tech}</Text>
                      ))}
                    </View>
                    {project.link && (
                      <Text style={[styles.content, { color: '#2563EB' }]}>
                        {project.link}
                      </Text>
                    )}
                  </View>
                ))}
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
                      {exp.company} | {exp.location}
                    </Text>
                    <Text style={[styles.content, { color: '#64748B' }]}>
                      {exp.startDate} - {exp.endDate}
                    </Text>
                    {exp.description.map((desc, i) => (
                      <Text key={i} style={styles.content}>• {desc}</Text>
                    ))}
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