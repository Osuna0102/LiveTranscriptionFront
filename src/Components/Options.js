import React from 'react';
import { Tooltip, List, ListItem } from '@material-ui/core';
import { OptionsBox } from './TranscriptionStyles';


function Options({ counter, timer, wpm }) {
  return (
    <OptionsBox>
      <List >        
      <Tooltip title="Total characters">
        <ListItem id="counter" style={{ paddingTop: 0, paddingBottom: 0 }} >{counter}</ListItem>
      </Tooltip>
        <Tooltip title="Click to pause timer">
          <ListItem id="timer" style={{ paddingTop: 0, paddingBottom: 0 }} >{timer}</ListItem>
        </Tooltip>
        <Tooltip title="Words per minute">
          <ListItem id="wpm" style={{ paddingTop: 0, paddingBottom: 0 }}>{wpm}</ListItem>
        </Tooltip>
      </List>
    </OptionsBox>
  );
}

export default Options;