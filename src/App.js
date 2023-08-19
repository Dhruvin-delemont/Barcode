import React, { useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './App.css';

function App() {
  const [data, setData] = React.useState('Camera is not detected.');

  const handleUpdate = (err, result) => {
    if (result) {
      setData(result.text);
    } else {
      setData('Camera is not detected.');
    }
  };
  return (
    <>
      <div className="camera-main">
        <BarcodeScannerComponent
          className="web-cam"
          width={500}
          height={500}
          onUpdate={handleUpdate}
        />
      </div>
      {data === 'Camera is not detected.' && <p className={`message ${data === 'Camera is not detected.' ? 'red' : ''}`}>{data}</p>}
    </>
  );
}

export default App;
