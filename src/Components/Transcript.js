import React from 'react';
import { TranscriptContainer, TranscriptLine } from './TranscriptionStyles';

function Transcript({ transcriptLines }) {
  return (
    <TranscriptContainer>
      {transcriptLines.map((line, index) => (
        <TranscriptLine key={index}>{line}</TranscriptLine>
      ))}
    </TranscriptContainer>
  );
}

export default Transcript;