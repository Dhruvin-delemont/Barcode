import React from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    if (typeof data == 'number') {
      setTimeout(() => {
        handleOpen();
      });
    }
  }, [data]);

  const handleRedirect = () => {
    window.open(link + data, '_blank');
  };

  return (
    <>
      <div className="camera-main">
        <BarcodeScannerComponent
          width={500}
          height={500}
          onUpdate={(err, result) => {
            if (result) {
              setData(Number(result.text));
            } else {
              setData(null);
            }
          }}
        />
      </div>
      <p
        style={{ color: !data ? 'red' : 'green' }}
        className="message">
        {!data ? 'Please Scan Barcode!' : `Barcode found: ${data}`}
      </p>

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
