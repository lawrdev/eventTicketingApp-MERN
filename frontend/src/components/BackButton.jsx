import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip title="Back">
        <div
          className="border-2 border-gray-500 rounded-full w-12 flex items-center justify-start py-0.5 pl-1.5 active:scale-90 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosIcon sx={{ fontSize: 14 }} />
        </div>
      </Tooltip>
    </>
  );
};

export default BackButton;
