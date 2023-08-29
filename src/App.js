import React from 'react';
import './App.css';
import './responsive.css';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

let barcodeNo = null;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  const [data, setData] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [barcodeInput, setBarcodeInput] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [inputError, setInputError] = React.useState(false);
  let link = 'https://www.jaypeebrothers.com/pgDetails.aspx?cat=s&book_id=';

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    barcodeNo = null;
    setData(null);
  };

  const handleBarcode = (e) => {
    const inputValue = e.target.value;
    setBarcodeInput(inputValue);
    if (inputValue.length === 13) {
      // console.info(inputValue.length);
      setInputError(false);
    } else {
      // console.error(inputValue.length);
      setInputError(true);
    }
  };

  const handleSubmit = (e) => {
    window.open(link + barcodeInput, '_blank');
    barcodeNo = null;
  };

  React.useEffect(() => {
    // check type of data
    if (typeof barcodeNo == 'number') {
      setTimeout(() => {
        handleOpen();
      });
    }
  }, [data]);

  const handleRedirect = () => {
    window.open(link + barcodeNo, '_blank');
    barcodeNo = null;
    handleClose();
  };

  return (
    <>
      <div>
        <h4
          className="message"
          style={{ color: !barcodeNo || barcodeNo === 'Camera permission required!' ? 'black' : 'green' }}>
          {!barcodeNo ? 'Please Scan ISBN!' : barcodeNo !== 'Camera permission required!' ? `Barcode found: ${barcodeNo}` : barcodeNo}
        </h4>
      </div>
      <div className="camera-main">
        <div className="camera">
          <BarcodeScannerComponent
            videoConstraints={{ height: 300, width: 300, frameRate: 60, facingMode: 'environment' }}
            onUpdate={(err, result) => {
              if (result) {
                barcodeNo = Number(result.text);
                setData(Number(result.text));
              } else {
                // barcodeNo = null;
                setData(null);
              }
            }}
            onError={(error) => {
              setErrorMessage(error);
              if (error.name === 'NotAllowedError') {
                barcodeNo = 'Camera permission required!';
                setData('Camera permission required!');
              }
            }}
          />
        </div>
      </div>
      <div className="steps">
        <div className="barcode-text">
          {/* <FormLabel
            className="barcode-label"
            htmlFor="outlined-basic">
            Enter Your Barcode Here
          </FormLabel> */}
          <TextField
            id="outlined-primary"
            label="ISBN"
            variant="outlined"
            type="number"
            placeholder="Enter ISBN"
            name="barcodeInput"
            value={barcodeInput}
            onChange={handleBarcode}
            error={inputError ? true : false}
            // {!inputError ? error : null}
            helperText={inputError && 'Invalid Barcode!'}
          />
        </div>
        <div className="d-flex">
          <Button
            variant="contained"
            color="primary"
            disabled={inputError || !barcodeInput ? true : false}
            onClick={handleSubmit}>
            Submit
          </Button>
        </div>
        <h4> Follow The Steps :-</h4>
        <ol>
          <li>Scan the bar code through the camera area</li>
          <li>Open the browser to reach the book details</li>
        </ol>
      </div>

      {/* Pop ups model */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title center">
            You are about to be redirected to a new page.
            <br /> Press Allow to continue.
          </Typography>
          <br />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleRedirect}>Allow</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default App;
