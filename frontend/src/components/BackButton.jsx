import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip title="Back">
        <IconButton
          aria-label="back"
          component="label"
          className=" !text-gray-800"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default BackButton;
