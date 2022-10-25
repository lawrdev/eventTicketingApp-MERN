import { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

const cloud_name = "dqveipmsp";

function EventPreview({ event }) {
  const { user } = useSelector((state) => state.auth);
  const [isBooked, setIsBooked] = useState(false);

  const navigate = useNavigate();
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

  return (
    <>
      <div
        className="eventPreviewCard"
        onClick={() => navigate(`/events/${event?._id}`)}
      >
        <div className="h-full flex flex-col">
          <div className="previewCardImageWrapper">
            <img
              src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_118,h_100,c_fill,q_100/${event?.details?.img_id}.jpg`}
              alt={`${event.status} event`}
              className="previewCardImage"
            />
            <div className="absolute right-1 top-1 rounded-full px-px text-white bg-opacity-90">
              {isBooked ? (
                <FavoriteOutlinedIcon fontSize="small" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-between">
            <p className="mb-2 font-bold text-sm">{event.details.title}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1 uppercase">
              {/* <CalendarMonthOutlinedIcon fontSize="small" /> */}
              <span className="font-bold text-yellow-500">
                {dayjs(event.details.date).format("MMM")}
              </span>{" "}
              <span className="font-bold">
                {dayjs(event.details.date).format("DD")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventPreview;
