import React from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './App.css';

function App() {
  const [data, setData] = React.useState('Not Found');

  return (
    <>
      <div className="camera-main">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) setData(result.text);
            else setData('Not Found');
          }}
        />
      </div>
      <p className="message red">{data}</p>
    </>
  );
}

export default App;
