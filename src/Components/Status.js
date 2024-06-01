import React from 'react';
import { StatusBox } from './TranscriptionStyles';

function Status({ status }) {
  return (
    <StatusBox>{status}</StatusBox>
  );
}

export default Status;