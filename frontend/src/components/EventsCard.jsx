// import React from 'react'
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

function EventsCard({ event }) {
  const { eventType, details, status } = event;
  return (
    <div className="border-2 border-gray-200 shadow hover:shadow-lg rounded-lg !text-start">
      <div>
        <div className="relative h-32 bg-stale-300 bg-gray-500 rounded-t-xl">
          {/* IMAGE HERE */}
          <div className="absolute bottom-0 left-0 right-0">
            <h3 className="px-3 pb-2 font-semibold text-white">
              {details.title}
            </h3>
          </div>
        </div>

        <div className="px-2.5 pb-3">
          <div className="my-2 flex justify-between item-center">
            <p className="text-sm text-gray-500 ">{eventType}</p>
            <Chip
              className="!px-1"
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
              href="#basic-chip"
              clickable
            />
          </div>

          <div className="mb-2 flex justify-between">
            <div className="flex">
              <CalendarMonthOutlinedIcon />
              <p className="ml-1">Date</p>
            </div>
            <div className="flex">
              <AccessTimeOutlinedIcon />
              <p className="ml-1">Time</p>
            </div>
          </div>

          <div className="mb-2 flex">
            <LocationOnOutlinedIcon />
            <p className="ml-1">Location</p>
          </div>

          {/* todo:: CHECK IF USER IS OWNER FOR BELOW */}
          <Divider />
        </div>
      </div>
    </div>
  );
}

// ADD IMAGES
// CREATE TICKET OBJECT inside events

export default EventsCard;
