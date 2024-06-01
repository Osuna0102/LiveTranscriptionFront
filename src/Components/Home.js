import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 1.5em;
  margin: 20px;
`;

function Home() {
  return (
    <CenteredDiv>
      <MenuLink to="/live-transcription">Live-Transcription</MenuLink>
      <MenuLink to="/file-transcription">File-Transcription</MenuLink>
    </CenteredDiv>
  );
}

export default Home;