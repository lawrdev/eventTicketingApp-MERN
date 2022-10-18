import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { getEvent } from "../features/event/eventSlice";
import Spinner from "../components/Spinner";
import { snack, resetSnackbar } from "../features/global/globalSlice";
import BackButton from "../components/BackButton";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import dayjs from "dayjs";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import PhoneIcon from "@mui/icons-material/Phone";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import Grid from "@mui/material/Unstable_Grid2";
import { useReward } from "react-rewards";

const cloud_name = "dqveipmsp";

export function EventPage() {
  usePrivateRoute();
  const [loading, setLoading] = useState(true);
  const [isExploding, setIsExploding] = useState(false);
  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    lifetime: 300,
    spread: 45,
    elementCount: 200,
    startVelocity: 110,
    elementSize: 8,
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { event } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getEvent(id))
      .unwrap()
      .then(() => {
        // if successfull
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack("Error fetching events, please try again"));
      });
  }, [dispatch, id]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto">
      <span
        className="fixed top-0 l left-1/2 -translate-x-1/2"
        id="rewardId"
        style={{ width: 20, height: 5, background: "red", zIndex: 100 }}
      />
      <BackButton />
      <section className="pt-3">
        <div className="rounded-t-lg overflow-hidden">
          <div className="eventPageImageWrapper">
            <div className="block sm:hidden">
              <img
                src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_900,h_420,c_fill,q_100/${event.details?.img_id}.jpg`}
                alt="event"
                className="eventPageImage"
              />
            </div>
            <div className="hidden sm:block">
              <img
                src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_900,h_340,c_fill,q_100/${event.details?.img_id}.jpg`}
                alt="event"
                className="eventPageImage"
              />
            </div>
            {/* <div className="absolute top-4 left-4 z-50 bg-white w-fit rounded pl-1 pr-3 bg-opacity-90 hover:bg-opacity-100">
              <BackButton />
            </div> */}
          </div>
        </div>
      </section>

      <section className="px-2">
        <div className="pt-4">
          <h3 className="font-bold text-xl text-gray-700 px-1">
            {event.details.title}
          </h3>

          <div className="text-xs pt-2 mb-5 font-semibold text-gray-500">
            <p className="mb-1 flex gap-1 items-center">
              <LocationOnOutlinedIcon fontSize="small" />
              {event.details.location}
            </p>
            <p className="flex gap-1 items-center">
              <LiquorOutlinedIcon fontSize="small" />
              {event.eventType}
            </p>
          </div>

          <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 6 }}>
            <Grid xs={2} sm={2}>
              <div className="flex gap-2 text-gray-500 items-center">
                <span className="bg-gray-200 p-2 rounded-md">
                  <CalendarMonthOutlinedIcon />
                </span>
                <div>
                  <p className="text-sm font-bold !text-gray-700">
                    {dayjs(event.details.date).format("DD MMMM")}
                  </p>
                  <p className="text-xs font-semibold">Date</p>
                </div>
              </div>
            </Grid>
            <Grid xs={2} sm={2}>
              <div className="flex gap-3 text-gray-500 items-center">
                <span className="bg-gray-200 p-2 rounded-md">
                  <AccessTimeOutlinedIcon />
                </span>
                <div>
                  <p className="text-sm font-bold !text-gray-700">
                    {event.details.time}
                  </p>
                  <p className="text-xs font-semibold">Time</p>
                </div>
              </div>
            </Grid>
            <Grid xs={2} sm={2}>
              <div className="flex gap-2 text-gray-500 items-center">
                <span className="bg-gray-200 p-2 rounded-md">
                  <SellOutlinedIcon />
                </span>
                <div>
                  <p className="text-sm font-bold !text-gray-700">FREE</p>
                  <p className="text-xs font-semibold">Price</p>
                </div>
              </div>
            </Grid>
          </Grid>

          <div className="my-7">
            <Divider />
          </div>

          <div className="mt-7 mb-5">
            <div>
              <h3 className="font-bold text-xl text-gray-700">About Event</h3>

              <p className="pt-5 text-sm text-gray-600">
                {event.details.description}
              </p>
            </div>
          </div>

          <div className="mt-7 mb-8">
            <h3 className="mb-5 font-bold text-xl text-gray-700">Contact</h3>

            <Grid container spacing={{ xs: 2 }} columns={{ xs: 4, sm: 6 }}>
              <Grid xs={2} sm={2}>
                <div className="flex gap-3 text-gray-500 items-center">
                  <span className="bg-gray-200 p-2 rounded-md">
                    <PhoneIcon />
                  </span>
                  <p className="text-sm font-bold !text-gray-700">
                    {event.details.phone}
                  </p>
                </div>
              </Grid>
              <Grid xs={2} sm={2}>
                <div className="flex gap-3 text-gray-500 items-center">
                  <span className="bg-gray-200 p-2 rounded-md">
                    <TwitterIcon />
                  </span>
                  <p className="text-sm font-bold !text-gray-700">
                    {event.details.twitter}
                  </p>
                </div>
              </Grid>
              <Grid xs={2} sm={2}>
                <div className="flex gap-3 text-gray-500 items-center">
                  <span className="bg-gray-200 p-2 rounded-md">
                    <InstagramIcon />
                  </span>
                  <p className="text-sm font-bold !text-gray-700">
                    {event.details.instagram}
                  </p>
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="mb-5 relative">
            <Button
              fullWidth
              sx={{ textTransform: "none" }}
              variant="contained"
              disabled={isAnimating}
              onClick={reward}
            >
              Book
              {/* <span id="rewardId" /> */}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
