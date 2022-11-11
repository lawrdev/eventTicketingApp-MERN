import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEventCreator } from "../features/event/eventSlice";
import PlaylistAddOutlinedIcon from "@mui/icons-material/PlaylistAddOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import Person3Icon from "@mui/icons-material/Person3";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const cloud_name = "dqveipmsp";

export default function EventCard({ event }) {
  const [isBooked, setIsBooked] = useState(false);
  const [creator, setCreator] = useState(false);
  const { details } = event;

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // check if booked
  useEffect(() => {
    if (user && event) {
      const arr = event.ticket.members;
      const checkArr = arr.find((element) => element === user._id);

      // console.log(checkArr);
      if (checkArr) {
        setIsBooked(true);
      }
    }
  }, [event, user]);

  // get avatar of event creator
  useEffect(() => {
    if (event) {
      dispatch(getEventCreator(event.user)).unwrap().then(setCreator);
    }
  }, [dispatch, event]);

  return (
    <div
      className=" h-full rounded-xl overflow-hidden shadow-md select-none flex flex-col hover:shadow-lg"
      style={{ width: "300px" }}
    >
      <div className="relative">
        <div className="relative">
          <div className="eventCardImageWrapper">
            <img
              src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_600,h_310,c_fill,q_100/${details?.img_id}.jpg`}
              alt="event banner"
              className="eventCardImage"
            />
          </div>

          <div className="absolute bottom-0 right-2 translate-y-1/2 flex flex-col gap-2 cursor-pointer">
            {user && (
              <div className="flex gap-2 items-center text-white bg-yellow-400 rounded-full">
                {isBooked ? (
                  <Tooltip title="Cancel attendance">
                    <IconButton
                      onClick={() => navigate(`/events/${event?._id}`)}
                    >
                      <PlaylistAddCheckOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Join this event">
                    <IconButton
                      onClick={() => navigate(`/events/${event?._id}`)}
                    >
                      <PlaylistAddOutlinedIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="px-3 pb-3 mt-3 flex flex-col flex-grow"
        onClick={() => navigate(`/events/${event?._id}`)}
      >
        <div className="mb-5">
          <p className="mb-2 text-purple-700 font-semibold tracking-wider text-sm">
            {dayjs(details.date).format("DD MMMM")}
          </p>
          <p className="text-gray-900 text-lg font-semibold leading-tight">
            {details.title}
          </p>
        </div>

        <div className="mt-auto flex gap-2 items-center">
          <Tooltip title="Host">
            <Avatar
              alt="Profile Avi"
              src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_30,h_30,c_fill,q_100/${creator?.img}.jpg`}
              sx={{ width: 30, height: 30 }}
            />
          </Tooltip>

          <p className="text-xs text-gray-500 font-semibold">{creator.name}</p>
          <div className="flex-grow flex gap-2 justify-end items-center text-gray-500">
            <Person3Icon fontSize="10px" />
            <p className="text-xs">
              {event.ticket.members.length > 0
                ? event.ticket.members.length
                : 0}{" "}
              joined
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
