import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";

export default function ImageButtons({ save, cancel, count }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[600],
      },
    }),
  };

  useEffect(() => {
    if (count === 1) {
      setLoading(false);
      setSuccess(true);
    }
  }, [count]);

  const handleSave = () => {
    save();
    setLoading(true);
    setSuccess(false);
  };

  return (
    // for saving images to cloudinary
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          disableElevation
          size="small"
          variant="contained"
          sx={buttonSx}
          disabled={loading}
          onClick={handleSave}
          startIcon={success ? <CheckIcon /> : <SaveIcon />}
        >
          {success ? "Saved" : "Save"}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: "inherit",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>

      <Box sx={{ m: 1, position: "relative" }}>
        <Button
          size="small"
          color="inherit"
          variant="outlined"
          disabled={loading || success ? true : false}
          onClick={cancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
