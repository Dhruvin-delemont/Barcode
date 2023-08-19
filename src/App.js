import React, { useEffect } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  const handleUpdate = (err, result) => {
    if (err) {
      console.log(err);
    }
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
      {data === 'Camera is not detected.' && <p className={`message red`}>{data}</p>}
    </>
  );
}

export default App;
