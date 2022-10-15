import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetSnackbar } from "../features/global/globalSlice";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}

export default function SnackBar({ mssg }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (mssg) {
      setOpen(true);
    }
  }, [mssg]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (reason === "escapeKeyDown") {
      event.preventDefault();
      setOpen(false);
    }
    setOpen(false);
    dispatch(resetSnackbar());
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
    <>
      {open && (
        <Snackbar
          open={true}
          autoHideDuration={4000}
          onClose={handleClose}
          message={mssg}
          action={action}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={TransitionLeft}
        />
      )}
    </>
  );
}
