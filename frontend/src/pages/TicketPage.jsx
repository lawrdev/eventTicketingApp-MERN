import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useSelector, useDispatch } from "react-redux";
import { getEvent, bookEvent } from "../features/event/eventSlice";
import { snack, resetSnackbar } from "../features/global/globalSlice";
import Qrcode from "../components/Qrcode";
import Spinner from "../components/Spinner";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import EventPreview from "../components/EventPreview";

function BookEvent() {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [ticket, setTicket] = useState(null);
  const { id, uid } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get event
  useEffect(() => {
    setLoading(true);
    dispatch(getEvent(id))
      .unwrap()
      .then((data) => {
        // if successfull
        setEvent(data);
        setTicket(data.ticket);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack("Error fetching event, please try again"));
      });
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  return (
    <div className="px-3 sm:px-6">
      <div className="flex justify-between items-center">
        <BackButton />
        <h3 className="pt-5 pb-4 font-semibold text-xl tracking-wider text-center text-gray-900">
          Ticket
        </h3>
        <div className="bg-white px-1 rounded-lg">
          <Tooltip title="Share ticket">
            <IconButton disableFocusRipple color="secondary" aria-label="share">
              <ShareOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <section>
        <div className="mt-8 max-w-xs mx-auto bg-white border-2 border-gray-200 shadow-md rounded-xl px-5 py-8">
          <div className="mb-2 w-fit mx-auto rounded-xl overflow-hidden border-2 border-gray-200">
            <Qrcode url="https://google.com/" />
          </div>
          <p className="mb-4 text-sm text-gray-500 font-bold text-center">
            ID - {ticket.id}
          </p>

          <div className="mb-2">
            <EventPreview event={event} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookEvent;
