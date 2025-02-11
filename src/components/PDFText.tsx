import React from 'react';
import { Text } from '@react-pdf/renderer';
import { wrapText } from '../utils/formatters';

interface PDFTextProps {
  text: string;
  maxCharsPerLine?: number;
  style?: any;
}

export function PDFText({ text, maxCharsPerLine = 20, style }: PDFTextProps) {
  const lines = wrapText(text, maxCharsPerLine);
  
  return (
    <Text style={style}>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {index > 0 && '\n'}
          {line}
        </React.Fragment>
      ))}
    </Text>
  );
}