import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Chart } from 'chart.js';

function DataDisplay() {
  const [data, setData] = useState([]);
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState();
  const [cascadeMenuVisible, setCascadeMenuVisible] = useState(false);
  const transcriptContainerRef = useRef();

  useEffect(() => {
    const firebaseConfig = {
            apiKey: "AIzaSyBC9XGaTkeWyxUNJlwXVpN2VUsBQVbGTG8",
            authDomain: "live-transcription-jp.firebaseapp.com",
            projectId: "live-transcription-jp",
            storageBucket: "live-transcription-jp.appspot.com",
            messagingSenderId: "19034640343",
            appId: "1:19034640343:web:f863080047f2f24a2ac592",
            measurementId: "G-KREXW421PY"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        this.db = firebase.firestore();
    }, []);

  const fetchData = () => {
    return this.db.collection('Data').get()
      .then((snapshot) => {
        const fetchedData = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const documentName = doc.id;
          fetchedData.push({ documentName, ...data });
        });
        return fetchedData;
      });
  }

  const displayData = (data) => {
    setData(data);
  }

  const displayDocument = (index) => {
    setSelectedDocumentIndex(index);
  }

  const handleFetchData = () => {
    fetchData()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const handleDisplayData = () => {
    fetchData()
      .then((data) => {
        displayData(data);
      })
      .catch((error) => {
        console.error('Error displaying data:', error);
      });
  }
  return (
    <div>
      <p id="status">Documents</p>
      <div id="wrapper">
        <div id="container">
          <div id="transcript-container" ref={transcriptContainerRef}>
            {data.map((doc, index) => (
              <div key={index} onClick={() => displayDocument(index)}>
                {doc.documentName}
              </div>
            ))}
            {selectedDocumentIndex !== undefined && (
              <div>
                <h3>{data[selectedDocumentIndex].documentName}</h3>
                <canvas id={`graph-${selectedDocumentIndex}`}></canvas>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataDisplay;