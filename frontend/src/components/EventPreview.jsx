// import React from 'react'
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

const cloud_name = "dqveipmsp";

function EventPreview({ event }) {
  return (
    <>
      <div className="eventPreviewCard">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <div className="w-fit rounded-lg overflow-hidden">
              <img
                src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_80,h_50,c_fill,q_100/${event.details?.img_id}.jpg`}
                alt={`${event.status} event`}
              />
            </div>

            <div className="flex flex-col justify-around text-sm">
              <p className="font-bold">{event.details.title}</p>
              <p className="text-gray-500 text-xs flex items-center gap-1">
                <CalendarMonthOutlinedIcon fontSize="small" />{" "}
                {event.details.date}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventPreview;
