import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip title="Back">
        <IconButton
          aria-label="back"
          component="label"
          className=" !text-gray-800 !bg-gray-200 !pl-3"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default BackButton;
