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
    borderBottomColor: '#1E293B',
    paddingBottom: 20,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    color: '#1E293B',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 10,
    fontFamily: 'Helvetica-Bold',
  },
  contact: {
    fontSize: 10,
    color: '#475569',
    marginBottom: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#1E293B',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 5,
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#1E293B',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  experienceItem: {
    marginBottom: 15,
  },
  highlightBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
  },
  skillGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skillCategory: {
    width: '48%',
    marginBottom: 10,
  },
});

interface Props {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <Text style={styles.title}>Senior Executive Leader</Text>
          <Text style={styles.contact}>
            {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}
          </Text>
          {data.personalInfo.linkedin && (
            <Text style={styles.contact}>LinkedIn: {data.personalInfo.linkedin}</Text>
          )}
          {data.personalInfo.portfolio && (
            <Text style={styles.contact}>Portfolio: {data.personalInfo.portfolio}</Text>
          )}
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Executive Summary</Text>
            <View style={styles.highlightBox}>
              <Text style={styles.content}>{data.summary}</Text>
            </View>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leadership Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, styles.bold]}>
                  {exp.position}
                </Text>
                <Text style={[styles.content, { color: '#475569' }]}>
                  {exp.company} | {exp.location}
                </Text>
                <Text style={[styles.content, { color: '#64748B', marginBottom: 5 }]}>
                  {exp.startDate} - {exp.endDate}
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
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <View style={styles.skillGrid}>
              {data.skills.map((skillGroup, index) => (
                <View key={index} style={styles.skillCategory}>
                  <Text style={[styles.content, styles.bold]}>
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

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.content, styles.bold]}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.content}>{edu.school}</Text>
                <Text style={[styles.content, { color: '#64748B' }]}>
                  {edu.startDate} - {edu.endDate}
                </Text>
                {edu.gpa && <Text style={styles.content}>GPA: {edu.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Initiatives & Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, styles.bold]}>
                  {project.name}
                </Text>
                <Text style={styles.content}>{project.description}</Text>
                <Text style={[styles.content, { color: '#475569' }]}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
                {project.link && (
                  <Text style={[styles.content, { color: '#475569' }]}>
                    Link: {project.link}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}