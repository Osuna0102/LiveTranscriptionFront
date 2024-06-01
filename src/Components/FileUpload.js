import React, { useState } from 'react';
import { Button, Box, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { baseUrl } from './libs/https';


function FileUpload() {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('all');
  const [language, setLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [speakerOptions, setSpeakerOptions] = useState([]);
  const [showTranscript, setShowTranscript] = React.useState(false);
  const animationProps = useSpring({
    marginTop: showTranscript ? '1vh' : '0vh',
    paddingBottom: showTranscript ? '1hv' : '0vh'
  });


  const submitForm = (e) => {
    e.preventDefault();

    setIsLoading(true); 

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    fetch(`${baseUrl}/transcript`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.text())
      .then(data => {
        setResponseText(data);
        const speakerSet = new Set(data.match(/Speaker (\d+):/g).map(s => s.replace(':', '')));
        setSpeakerOptions(Array.from(speakerSet));
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when the request is completed
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([responseText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const handleSpeakerChange = (event) => {
    const value = event.target.value;
    setSelectedSpeaker(value === 'all' ? value : Number(value));
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

const filterBySpeaker = (text) => {
  if (selectedSpeaker === 'all') {
    return true;
  }

  const speaker = text.match(/Speaker (\d+):/);
  const selectedSpeakerNumber = selectedSpeaker.replace('Speaker ', '');

  return speaker && speaker[1] === selectedSpeakerNumber;
};

  const submitFormAnimated = async (e) => {
    e.preventDefault();
    setShowTranscript(true);
    submitForm(e);
  };

  return (
    <Grid container direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'flex-start', paddingTop: showTranscript ? '5vh' : '40vh' }}>
      <Grid item xs={12} container direction="column" alignItems="center">
        <animated.div style={animationProps}>
          <Typography variant="h4" component="h1" gutterBottom textAlign={'center'}>
            Transcribe File
          </Typography>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <form onSubmit={submitFormAnimated}>
              <Grid container direction="column" alignItems="center">
                <input
                  accept="audio/*"
                  id="contained-button-file"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                  <Button variant="contained" component="span">
                    From File
                  </Button>
                  <FormControl variant="outlined">
                    <InputLabel id="language-label">Language</InputLabel>
                    <Select
                      labelId="language-label"
                      value={language}
                      onChange={handleLanguageChange}
                      label="Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="ja">Japanese</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="it">Italian</MenuItem>
                    </Select>
                  </FormControl>
                </label>

                {file && (
                  <audio controls src={URL.createObjectURL(file)}>
                    Your browser does not support the audio element.
                  </audio>
                )}
                <Button type="submit" variant="contained" color="primary" disabled={!file}>
                  Transcribe Audio
                </Button>
              </Grid>
            </form>
          </Box>
        </animated.div>
        {showTranscript && (
          <Grid item style={{ height: '80%', overflow: 'auto' }}>
            <FormControl variant="outlined">
              <InputLabel id="speaker-label">Speaker</InputLabel>
              <Select
                labelId="speaker-label"
                value={selectedSpeaker}
                onChange={handleSpeakerChange}
                label="Speaker"
              >
                <MenuItem value="all">All</MenuItem>
                {speakerOptions.map((speaker, index) => (
                  <MenuItem key={index} value={speaker}>
                    {speaker}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
              {responseText.split('\n').filter(filterBySpeaker).map((item, key) => {
                return <Typography key={key}>{item}<br /></Typography>
              })}
            </Paper>
            <Button onClick={downloadTxtFile} variant="contained" disabled={!responseText}>
              Download Text File
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default FileUpload;