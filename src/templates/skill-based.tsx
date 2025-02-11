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
    backgroundColor: '#0F766E',
    padding: 20,
    marginHorizontal: -30,
    marginTop: -30,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 5,
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
    color: '#0F766E',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 10,
    lineHeight: 1.5,
  },
  skillSection: {
    marginBottom: 15,
    backgroundColor: '#F0FDFA',
    padding: 10,
    borderRadius: 5,
  },
  skillCategory: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0F766E',
    marginBottom: 5,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    backgroundColor: '#CCFBF1',
    padding: '3 6',
    borderRadius: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
});

interface Props {
  data: ResumeData;
}

export function SkillBasedTemplate({ data }: Props) {
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

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            {data.skills.map((skillGroup, index) => (
              <View key={index} style={styles.skillSection}>
                <Text style={styles.skillCategory}>{skillGroup.category}</Text>
                <View style={styles.skillList}>
                  {skillGroup.items.map((item, i) => (
                    <View key={i} style={styles.skillItem}>
                      <Text style={styles.content}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Relevant Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {exp.position}
                </Text>
                <Text style={styles.content}>
                  {exp.company} | {exp.location}
                </Text>
                <Text style={[styles.content, { color: '#0F766E' }]}>
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
            <Text style={styles.sectionTitle}>Project Portfolio</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={styles.skillSection}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {project.name}
                </Text>
                <Text style={styles.content}>{project.description}</Text>
                <View style={styles.skillList}>
                  {project.technologies.map((tech, i) => (
                    <View key={i} style={styles.skillItem}>
                      <Text style={styles.content}>{tech}</Text>
                    </View>
                  ))}
                </View>
                {project.link && (
                  <Text style={[styles.content, { color: '#0F766E' }]}>
                    Link: {project.link}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.content}>{edu.school}</Text>
                <Text style={[styles.content, { color: '#0F766E' }]}>
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