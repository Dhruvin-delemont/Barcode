import React from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './App.css';
import './responsive.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let link = 'https://www.jaypeebrothers.com/pgDetails.aspx?cat=s&book_id=';

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
          style={{ color: !barcodeNo ? 'black' : 'green' }}>
          {!barcodeNo ? 'Please Scan Barcode!' : `Barcode found: ${barcodeNo}`}
        </h4>
      </div>
      <div className="camera-main">
        <div className="camera">
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) {
                setData(Number(result.text));
                barcodeNo = Number(result.text);
              } else {
                // barcodeNo = null;
                setData(null);
              }
            }}
          />
        </div>
      </div>
      <div className="steps">
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
