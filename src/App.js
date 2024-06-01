import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DataDisplay from './Components/DataDisplay';
//import DocDisplay from './Components/DocDisplay';
import Transcription from './Components/Transcriptions';
import FileUpload from './Components/FileUpload';
import Login from './Components/Login';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Transcription />} />

        <Route path="/datadisplay" component={DataDisplay} />
        <Route path="/fileupload" element={<FileUpload />} />
        <Route path="/Login" element={<Login />} />

        {/* <Route path="/docdisplay" component={DocDisplay} /> */}
      </Routes>
    </Router>
  );
}

export default App;