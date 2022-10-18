// import React from 'react'
import { useNavigate } from "react-router-dom";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Button from "@mui/material/Button";

const cloud_name = "dqveipmsp";

function EventCard({ event }) {
  const { eventType, details, status } = event;
  const navigate = useNavigate();

  // function viewEvent() {
  //   navigate(`/events/${event._id}`);
  // }

  return (
    <div className="border-2 border-gray-200 shadow hover:shadow-lg rounded-b rounded-t-xl !text-start">
      <div>
        <div className="overflow-hidden relative h-40 bg-stale-300 bg-gray-500 rounded-t-xl">
          <div className="eventCardImageWrapper">
            <img
              src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_1200,h_260,c_fill,q_100/${details?.img_id}.jpg`}
              alt="event banner"
              className="eventCardImage"
            />
          </div>
          <div className="absolute bottom-0 right-1.5">
            <h3 className="px-3 py-0.5 text-xs font-semibold text-white bg-gray-800 bg-opacity-90 m-1 rounded-lg w-fit">
              {eventType}
            </h3>
          </div>
        </div>

        <div className="px-3 pb-3">
          <div className="my-2 flex justify-between item-center">
            <p className="text-sm font-bold text-gray-700 ">{details.title}</p>
            <Chip
              className="!px-1 !no-underline"
              color={
                "primary"
                // status === "Upcoming"
                //   ? "primary"
                //   : status === "Happening"
                //   ? "info"
                //   : status === "Closed"
                //   ? "warning"
                //   : "error"
              }
              size="small"
              label={status}
              component="a"
              href={`#${status}`}
              clickable
            />
          </div>

          <div className="mb-2 flex justify-between text-sm">
            <div className="flex">
              <CalendarMonthOutlinedIcon fontSize="small" />
              <p className="ml-1">{details.date ? details.date : "Date"}</p>
            </div>
            <div className="flex">
              <AccessTimeOutlinedIcon fontSize="small" />
              <p className="ml-1">{details.time ? details.time : "Time"}</p>
            </div>
          </div>

          <div className="mb-2 flex text-sm">
            <LocationOnOutlinedIcon fontSize="small" />
            <p className="ml-1">
              {details.location ? details.location : "Location"}
            </p>
          </div>

          {/* todo:: CHECK IF USER IS OWNER FOR BELOW */}
          {/* <Divider /> */}
          <div>
            <div className="flex justify-center">
              <Button
                className="!rounded-3xl"
                onClick={() => navigate(`/events/${event._id}`)}
                sx={{ textTransform: "none" }}
                size="small"
                variant="outlined"
                // startIcon={<BookmarkBorderIcon />}
              >
                View Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ADD IMAGES
// CREATE TICKET OBJECT inside events

export default EventCard;
