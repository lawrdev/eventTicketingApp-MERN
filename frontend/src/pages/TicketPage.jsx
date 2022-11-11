import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useDispatch } from "react-redux";
import { getEvent, getEventCreator } from "../features/event/eventSlice";
import { snack } from "../features/global/globalSlice";
import Qrcode from "../components/Qrcode";
import Spinner from "../components/Spinner";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { cloud_name } from "../App";

export function TicketPage() {
  const [loading, setLoading] = useState(true);
  const [attendee, setAttendee] = useState(null);
  const [event, setEvent] = useState(null);
  const [ticket, setTicket] = useState(null);
  const { id, uid } = useParams();

  const dispatch = useDispatch();

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
        dispatch(snack(error));
      });
  }, [dispatch, id]);

  // get attendee's info, we'd use the getEventCreator func(does same func)
  useEffect(() => {
    if (event) {
      dispatch(getEventCreator(uid)).unwrap().then(setAttendee);
    }
  }, [dispatch, event, uid]);

  if (loading) return <Spinner />;

  return (
    <div className="mt-6 px-3 sm:px-6">
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
        <div className="mt-8 max-w-xs mx-auto bg-white border-2 border-gray-200 shadow-md rounded-xl px-5 py-6">
          <div className="mb-2">
            <p className="mb-4 text-sm text-gray-900 italic text-center">
              Ticket({ticket.id})
            </p>
            <div className="mb-2">
              <img
                src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_600,h_310,c_fill,q_100/${event.details?.img_id}.jpg`}
                alt="event"
                width="100%"
                style={{ objectFit: "cover", objectPosition: "bottom center" }}
              />
            </div>
            <div>
              <h3 className="mb-8 font-semibold text-sm text-gray-900">
                {event.details.title}
              </h3>
              <div className="flex justify-end items-center gap-2 cursor-pointer">
                <div className="text-green-600">
                  <TaskAltIcon />
                </div>
                <p>{attendee?.name}</p>
                <Tooltip title={`${attendee?.name}`}>
                  <Avatar
                    alt="Profile Avi"
                    src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_30,h_30,c_fill,q_100/${attendee?.img}.jpg`}
                    sx={{ width: 30, height: 30 }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>

          <Divider />

          <div className="mt-3 w-fit mx-auto">
            <Qrcode url="https://google.com/" />
          </div>
        </div>
      </section>
    </div>
  );
}
