import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Chip from "@mui/material/Chip";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import Button from "@mui/material/Button";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import dayjs from "dayjs";
import Avatar from "@mui/material/Avatar";
import DemoIMG from "../assets/img/demo.jpg";
import Tooltip from "@mui/material/Tooltip";

const cloud_name = "dqveipmsp";

function EventCard({ event }) {
  const [isBooked, setIsBooked] = useState(false);
  const { eventType, details } = event;

  const { user } = useSelector((state) => state.auth);

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
    <div
      className="border-2 border-gray-200 shadow hover:shadow-lg rounded-b rounded-t-xl !text-start h-full"
      onClick={() => navigate(`/events/${event._id}`)}
    >
      <div>
        <div className="w-fit relative">
          <div className="overflow-hidden relative h-40 bg-stale-300 bg-gray-300 rounded-t-xl">
            <div className="eventCardImageWrapper">
              <img
                src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_1200,h_260,c_fill,q_100/${details?.img_id}.jpg`}
                alt="event banner"
                className="eventCardImage"
              />
            </div>

            <div className="absolute top-3 left-2">
              <div className="flex gap-1 text-gray-500 items-center bg-white py-1 px-2 rounded-md !font-bold">
                <SellOutlinedIcon fontSize="small" />
                <p className="text-xs">FREE</p>
              </div>
            </div>
            <div className="absolute top-3 right-2 flex flex-col gap-2 cursor-pointer">
              {user && (
                <div className="flex gap-2 items-center text-white">
                  {isBooked ? (
                    <FavoriteOutlinedIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                  )}
                </div>
              )}
              <div className="flex gap-2 text-white items-center">
                <IosShareOutlinedIcon fontSize="small" />
              </div>
            </div>
          </div>

          <div className="absolute z-50 bottom-0 right-2 translate-y-1/2 p-1 bg-white rounded-full cursor-pointer">
            <Tooltip title={`${user.name}`}>
              <Avatar
                alt="Profile Avi"
                src={DemoIMG}
                sx={{ width: 50, height: 50 }}
              />
            </Tooltip>
          </div>
        </div>

        <div className="px-5 pb-4 flex flex-col">
          <div className="mt-3 flex gap-7 item-start overflow-hidden">
            <div className="flex flex-col gap-1">
              <p className="text-purple-400 font-bold">
                {dayjs(details.date).format("MMM")}
              </p>
              <p className="font-bold">{dayjs(details.date).format("DD")}</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-600 mb-1.5">
                {details.title}
              </h3>
              <p className="text-sm text-gray-500">{details.description}</p>
            </div>
          </div>

          {/* <div className="mt-5 w-fit mx-auto">
            <Button
              disableElevation
              color="primary"
              variant="contained"
              onClick={() => navigate(`/events/${event._id}`)}
              sx={{ textTransform: "none" }}
              size="small"
            >
              View Event
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

// ADD IMAGES
// CREATE TICKET OBJECT inside events

export default EventCard;
