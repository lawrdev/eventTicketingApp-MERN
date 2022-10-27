import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import {
  getEvent,
  eventUpdates,
  deleteEvent,
} from "../features/event/eventSlice";
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
import { Header } from "../components/Header";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AppButton from "../components/AppButton";

const cloud_name = "dqveipmsp";

export function EventPage() {
  // usePrivateRoute();
  const [eventCreator, setEventCreator] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBooked, setIsBooked] = useState(false);
  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    lifetime: 300,
    elementCount: 150,
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { event } = useSelector((state) => state.event);

  // get event
  useEffect(() => {
    dispatch(getEvent(id))
      .unwrap()
      .then(() => {
        // if successfull
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack(error));
      });
  }, [dispatch, id]);

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

  // check if event creator
  useEffect(() => {
    if (event && user && event.user === user._id) {
      setEventCreator(true);
    } else {
      setEventCreator(false);
    }
  }, [event, user]);

  const handleEventUpdate = (task) => {
    const eventData = { eventId: id, userId: user?._id, task: task };

    if (!user) {
      navigate("/register");
      return;
    }

    dispatch(eventUpdates(eventData))
      .unwrap()
      .then(() => {
        if (task === "book") {
          reward();
          setIsBooked(true);
        } else if (task === "unbook") {
          setIsBooked(false);
        }
      })
      .catch((error) => {
        dispatch(snack(error));
      });
  };

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(id))
      .unwrap()
      .then((data) => {
        if (data) {
          navigate("/");
          dispatch(snack("Event deleted successfully"));
        }
      })
      .catch((error) => {
        dispatch(snack(error));
      });
  };

  if (loading) return <Spinner />;

  if (!event) return <p className="text-center">NO EVENT</p>;
  return (
    <div className="px-3 sm:px-6">
      <Header />
      <div className="max-w-3xl mx-auto mt-3">
        <BackButton />

        <section className="pt-3">
          <div className="rounded-t-xl overflow-hidden">
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
            </div>
          </div>
        </section>

        <section className="px-2">
          <div className="pt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-xl text-gray-700 px-1">
                {event.details.title}
              </h3>
              <div className="registerEvent">
                {isBooked ? (
                  <button
                    className="w-fit active:scale-95 shadow"
                    onClick={() => handleEventUpdate("unbook")}
                  >
                    <p className="py-2 px-3 sm:py-3 sm:px-5 bg-yellow-400 hover:bg-yellow-500 rounded text-xs font-semibold track tracking-widest">
                      Registered!!
                    </p>
                  </button>
                ) : (
                  <button
                    className="w-fit active:scale-95 shadow "
                    onClick={() => handleEventUpdate("book")}
                  >
                    <p className="py-2 px-5 sm:py-3 sm:px-5 border-2 border-yellow-400 hover:border-yellow-500 rounded text-xs font-semibold track tracking-widest">
                      Register
                    </p>
                  </button>
                )}
              </div>
            </div>

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

            <div className="mt-7 mb-14">
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
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="!no-underline"
                      href={`https://twitter.com/${event.details.twitter}`}
                    >
                      <p className="text-sm font-bold hover:!text-yellow-600 text-gray-700">
                        {event.details.twitter}
                      </p>
                    </a>
                  </div>
                </Grid>
                <Grid xs={2} sm={2}>
                  <div className="flex gap-3 text-gray-500 items-center">
                    <span className="bg-gray-200 p-2 rounded-md">
                      <InstagramIcon />
                    </span>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      className="!no-underline"
                      href={`https://instagram.com/${event.details.instagram}`}
                    >
                      <p className="text-sm font-bold hover:!text-yellow-600 !text-gray-700">
                        {event.details.instagram}
                      </p>
                    </a>
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* REGISTER & VIEW TICKET */}
            {eventCreator ? (
              <div className="w-fit mx-auto">
                <Button
                  variant="outlined"
                  sx={{ textTransform: "none" }}
                  color="error"
                  onClick={handleDeleteEvent}
                >
                  Delete Event
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-5 relative flex gap-4 flex-wrap sm:flex-nowrap">
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2"
                    id="rewardId"
                    style={{ zIndex: 100 }}
                  />
                  {isBooked ? (
                    <Button
                      fullWidth
                      color="secondary"
                      sx={{ textTransform: "none" }}
                      variant="outlined"
                      disabled={isAnimating}
                      onClick={() => handleEventUpdate("unbook")}
                    >
                      Cancel Registeration
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      color="secondary"
                      sx={{ textTransform: "none" }}
                      variant="contained"
                      disabled={isAnimating}
                      onClick={() => handleEventUpdate("book")}
                      className="relative"
                    >
                      Register
                    </Button>
                  )}

                  <Button
                    fullWidth
                    color="secondary"
                    sx={{ textTransform: "none" }}
                    variant="contained"
                    disabled={!isBooked ? true : false}
                    onClick={() => navigate(`/events/${id}/${user._id}`)}
                  >
                    View Ticket
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
