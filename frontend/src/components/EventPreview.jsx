import { useState, useEffect } from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useNavigate } from "react-router-dom";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Person3Icon from "@mui/icons-material/Person3";

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
        <div className="flex gap-5">
          <div className="relative">
            <div className="previewCardImageWrapper">
              <img
                src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_130,h_150,c_fill,q_100/${event?.details?.img_id}.jpg`}
                alt={`${event.status} event`}
                className="previewCardImage"
              />
            </div>
            <div className="absolute right-1 top-1 rounded-full px-px text-yellow-400 bg-opacity-90">
              {isBooked ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between py-2.5">
            <div className="mb-3">
              <p className="mb-2 text-purple-700 font-semibold tracking-wider ">
                {dayjs(event.details.date).format("DD MMMM")}
              </p>
              <p className="text-gray-700 font-semibold text-lg leading-tight">
                {event.details.title}
              </p>
            </div>

            <div className="flex gap-2 items-center text-gray-500">
              <Person3Icon fontSize="10px" />
              <p className="text-sm">
                {event.ticket.members.length > 0
                  ? event.ticket.members.length
                  : 0}{" "}
                joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventPreview;
