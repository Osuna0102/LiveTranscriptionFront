import React, { useState, useEffect, useRef } from 'react';
import { Root } from './TranscriptionStyles';
import Status from './Status';
import Options from './Options';
import Transcript from './Transcript';

function Transcription() {
  const [status, setStatus] = useState('Connection status will go here');
  const [counter, setCounter] = useState('Characters: 0');
  const [timer, setTimer] = useState('Time: 0:00');
  const [wpm, setWpm] = useState('WPM: 0');
  const [transcriptLines, setTranscriptLines] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const socketRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    console.log('Transcription mounted');

    //socketRef.current = new WebSocket('wss://livetranscription.onrender.com/listen');
    socketRef.current = new WebSocket('ws://127.0.0.1:8000/listen');

    socketRef.current.onopen = async () => {
      console.log('WebSocket connection opened');
      setStatus('Connected');
      setStartTime(Date.now());

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = event => {
          if (socketRef.current) {
            socketRef.current.send(event.data);
          }
        };
        mediaRecorderRef.current.start(1000); // Fire 'dataavailable' event every 1 second
      } catch (error) {
        console.error('Error starting recording:', error);
      }
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket connection closed');
      setStatus('Disconnected');
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };

    socketRef.current.onmessage = (event) => {
      console.log('Server response:', event.data);
      setTranscriptLines((prevLines) => [...prevLines, event.data]);
    };

    socketRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      console.log('Closing WebSocket connection');
      socketRef.current.close();
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsed / 60);
      const seconds = elapsed % 60;
      setTimer(`Time: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(timerId);
  }, [startTime]);

  useEffect(() => {
    const counterId = setInterval(() => {
      const characterCount = transcriptLines.join(' ').length;
      setCounter(`Characters: ${characterCount}`);
    }, 1000);
    return () => clearInterval(counterId);
  }, [transcriptLines]);

  useEffect(() => {
    const wpmId = setInterval(() => {
      const characterCount = transcriptLines.join(' ').length;
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const minutes = elapsed / 60;
      const wpmValue = Math.floor(characterCount / minutes);
      setWpm(`WPM: ${wpmValue}`);
    }, 1000);
    return () => clearInterval(wpmId);
  }, [startTime, transcriptLines]);

  return (
    <Root>
      <Status status={status} />
      <Options 
        status={status}
        counter={counter}
        timer={timer}
        wpm={wpm}
      />
      <Transcript transcriptLines={transcriptLines} />
    </Root>
  );
}

export default Transcription;