import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="text-center mb-10">
        <h3 className="headerTitle">What do you want help with?</h3>
        <p className="headerSubTitle">Please choose an option below</p>
      </section>

      <section className="flex flex-col gap-2">
        <Button
          fullWidth
          variant="outlined"
          onClick={() => navigate("/create-event")}
          sx={{ textTransform: "none" }}
          className="!font-bold !border-2"
          startIcon={<AddCircleOutlineOutlinedIcon />}
        >
          Create New Event
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => navigate("/tickets")}
          sx={{ textTransform: "none" }}
          className="!font-bold"
          startIcon={<ViewDayOutlinedIcon />}
        >
          View My Tickets
        </Button>
      </section>
    </>
  );
}
