import React from 'react';
import BarcodeScannerComponent from 'react-barcode-reader';
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
            result ? setData(result.text) : setData('Not Found');
          }}
        />
      </div>
      <p>{data}</p>
    </>
  );
}

export default App;
