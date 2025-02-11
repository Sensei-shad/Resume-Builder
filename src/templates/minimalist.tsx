import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../types/resume';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    marginBottom: 5,
    letterSpacing: 1,
  },
  contact: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 11,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  content: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#333333',
  },
  experienceItem: {
    marginBottom: 15,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: '#666666',
    borderRadius: 1.5,
    marginHorizontal: 5,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface Props {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName}</Text>
          <View style={styles.inline}>
            <Text style={styles.contact}>{data.personalInfo.email}</Text>
            <View style={styles.dot} />
            <Text style={styles.contact}>{data.personalInfo.phone}</Text>
            <View style={styles.dot} />
            <Text style={styles.contact}>{data.personalInfo.location}</Text>
          </View>
          {(data.personalInfo.linkedin || data.personalInfo.portfolio) && (
            <View style={styles.inline}>
              {data.personalInfo.linkedin && (
                <>
                  <Text style={styles.contact}>{data.personalInfo.linkedin}</Text>
                  {data.personalInfo.portfolio && <View style={styles.dot} />}
                </>
              )}
              {data.personalInfo.portfolio && (
                <Text style={styles.contact}>{data.personalInfo.portfolio}</Text>
              )}
            </View>
          )}
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.content}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {exp.position}
                </Text>
                <View style={styles.inline}>
                  <Text style={styles.content}>{exp.company}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.content}>{exp.location}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.content}>{exp.startDate} - {exp.endDate}</Text>
                </View>
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
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <View style={styles.inline}>
                  <Text style={styles.content}>{edu.school}</Text>
                  <View style={styles.dot} />
                  <Text style={styles.content}>{edu.startDate} - {edu.endDate}</Text>
                  {edu.gpa && (
                    <>
                      <View style={styles.dot} />
                      <Text style={styles.content}>GPA: {edu.gpa}</Text>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.map((skillGroup, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
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
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={[styles.content, { fontFamily: 'Helvetica-Bold' }]}>
                  {project.name}
                </Text>
                <Text style={styles.content}>{project.description}</Text>
                <Text style={styles.content}>
                  {project.technologies.join(' • ')}
                </Text>
                {project.link && (
                  <Text style={styles.content}>{project.link}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}