import React from 'react';
import { Link } from 'react-router-dom';

function Options({ status, counter, timer, wpm, cascadeMenuVisible, setCascadeMenuVisible }) {
  return (
    <div id="menu" className="menu">
      <button id="extend-button" className="menu-button" onClick={() => setCascadeMenuVisible(!cascadeMenuVisible)}>Extend</button>
      {cascadeMenuVisible && (
        <div id="cascade-menu">
          <button><Link to="/docdisplay">Docs</Link></button>
          <button><Link to="/datadisplay">Graphs</Link></button>
        </div>
      )}
      <div style={{textAlign: "right"}}>
        <span title="Total characters" style={{display: "inline"}}>
          <div id="counter">{counter}</div>
        </span>
        <span title="Click to pause timer" className="menuitem" style={{marginRight: "0.5em", display: "inline-block"}}>
          <div id="timer">{timer}</div>
        </span>
        <span title="Words per minute" style={{display: "inline"}}>
          <div id="wpm">{wpm}</div>
        </span>
      </div>
    </div>
  );
}

export default Options;