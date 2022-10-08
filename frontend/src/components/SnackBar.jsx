import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function SnackBar({ mssg, isOpen }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOpen(true);
    }
  }, [isOpen]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (reason === "escapeKeyDown") {
      event.preventDefault();
      setOpen(false);
    }
    setOpen(false);
  };

  const action = (
    <>
      {/* <Button color="secondary" size="small" onClick={handleClose}>
        CLOSE
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={mssg}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionLeft}
      />
    </div>
  );
}
