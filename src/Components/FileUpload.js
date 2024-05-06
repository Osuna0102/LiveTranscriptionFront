import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState('');

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    fetch('https://livetranscription.onrender.com/transcript', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.text())
      .then(data => {
        setResponseText(data);
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([responseText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  return (
    <div>
      <form onSubmit={submitForm}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <button onClick={downloadTxtFile}>Download Text File</button>
      <div>
        {responseText.split('\n').map((item, key) => {
          return <span key={key}>{item}<br/></span>
        })}
      </div>
    </div>
  );
}

export default FileUpload;