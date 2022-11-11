import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import EventPreview from "../components/EventPreview";
import EventCard from "../components/EventCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../features/event/eventSlice";
import { snack } from "../features/global/globalSlice";
import Spinner from "../components/Spinner";
import LiquorOutlinedIcon from "@mui/icons-material/LiquorOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import TheaterComedyOutlinedIcon from "@mui/icons-material/TheaterComedyOutlined";
import InterpreterModeOutlinedIcon from "@mui/icons-material/InterpreterModeOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import GamepadOutlinedIcon from "@mui/icons-material/GamepadOutlined";
import MailLockOutlinedIcon from "@mui/icons-material/MailLockOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import NoiseAwareOutlinedIcon from "@mui/icons-material/NoiseAwareOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import Button from "@mui/material/Button";
import Footer from "../components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
// import required modules
import { Navigation } from "swiper";
import Search from "../components/Search";

const categories = [
  {
    icon: <LiquorOutlinedIcon />,
    title: "Party",
  },
  {
    icon: <HeadphonesOutlinedIcon />,
    title: "Music",
  },
  {
    icon: <TheaterComedyOutlinedIcon />,
    title: "Comedy show",
  },
  {
    icon: <InterpreterModeOutlinedIcon />,
    title: "Training",
  },
  {
    icon: <Groups2OutlinedIcon />,
    title: "Conference",
  },
  {
    icon: <GamepadOutlinedIcon />,
    title: "Gaming",
  },
  {
    icon: <MailLockOutlinedIcon />,
    title: "Private",
  },
  {
    icon: <WidgetsOutlinedIcon />,
    title: "Other",
  },
];

export function Home() {
  const [loading, setLoading] = useState(true);
  const [thisWeek, setThisWeek] = useState(null);
  const [upcoming, setUpcoming] = useState(null);
  const [eventData, setEventData] = useState(null);

  const { lastEventDate, eventsLength } = useSelector((state) => state.event);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET ALL EVENTS - [public, 3]
  useEffect(() => {
    let today = Math.floor(Date.now() / 1000);

    dispatch(getAllEvents(today))
      .unwrap()
      .then((data) => {
        setEventData(data.events);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack(error)); //"Error please try again"
      });
  }, [dispatch]);

  // set upcoming && thisWeek's events
  useEffect(() => {
    let arr1 = [];
    let arr2 = [];
    if (eventData) {
      eventData.forEach((item) => {
        if (item.status === "Happening") {
          arr1.push(item);
        }
        if (item.status === "Upcoming") {
          arr2.push(item);
        }
      });

      if (arr1.length > 0) {
        setThisWeek(arr1);
      }
      if (arr2.length > 0) {
        setUpcoming(arr2);
      }
    }
  }, [eventData]);

  // generate random number within "thisWeeks's" length
  function randomNumber(length) {
    return Math.floor(Math.random() * (length - 0) + 0);
  }

  function loadMoreEvents(tm) {
    dispatch(getAllEvents(tm))
      .unwrap()
      .then((data) => {
        setEventData((prev) => [...prev, ...data.events]);
      })
      .catch((error) => {
        dispatch(snack(error)); //"Error please try again"
      });
  }

  if (loading || !eventData) return <Spinner />;

  return (
    <>
      <div className="px-3">
        <Header />
      </div>

      <section
        className="mb-10 relative"
        style={{ zIndex: 200 }}
        data-aos="fade-down"
      >
        <div className="relative">
          <div className="HomeImageWrapper">
            <img
              alt="Home"
              src={`https://res.cloudinary.com/dqveipmsp/image/upload/v1666807240/ticketapp/pexels-tima-miroshnichenko-6498312_nbuors.jpg`}
              className="HomeImage"
            />
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 max-w-sm text-white px-4">
            <h3 className="text-xl sm:text-xl font-bold mb-1">
              EventTicketing
            </h3>
            <p className="text-sm opacity-80 sm:text-sm mb-3 sm:mb-5">
              Let's you take your meetings, parties, music events, conferences
              and other events to the next level
            </p>

            <button
              className="homeBtn"
              onClick={() => navigate("/create-event")}
            >
              Create an event
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 mb-2 px-3">
            <div className="max-w-sm mx-auto bg-white rounded-md py-1 px-2">
              <Search />
            </div>
          </div>
        </div>
      </section>

      <div className="mb-32 px-3">
        <section className="mb-6">
          <div>
            <h3 className="mb-3 font-semibold text-lg text-gray-700 flex items-center gap-2">
              Categories <FlareOutlinedIcon className="!text-yellow-500" />
            </h3>

            <div>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={10}
                navigation={false}
                modules={[Navigation]}
                // FIX STRETCH ISSUE
                className="!pt-1 !pb-4"
              >
                {categories.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="!h-full !w-fit self-stretch"
                  >
                    <div
                      className="bg-white py-2 px-4 flex gap-1 items-center shadow hover:shadow-md rounded-md text-gray-500 cursor-pointer no-select hover:bg-purple-500 hover:text-white"
                      onClick={() => navigate(`/category/${item.title}`)}
                    >
                      {item.icon}
                      <p className="text-sm font-base">{item.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <div>
            {thisWeek && (
              <>
                <h3 className="mb-3 font-semibold text-lg text-gray-700 flex items-center gap-2">
                  This week
                  <RocketLaunchOutlinedIcon className="!text-yellow-500" />
                </h3>
                <EventCard event={thisWeek[randomNumber(thisWeek.length)]} />
              </>
            )}

            {!thisWeek && upcoming ? (
              <>
                <h3 className="mb-3 font-semibold text-lg text-gray-700 flex items-center gap-2">
                  Upcoming event
                  <NoiseAwareOutlinedIcon className="!text-yellow-500" />
                </h3>
                <EventCard event={upcoming[randomNumber(upcoming.length)]} />
              </>
            ) : null}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="mb-5 font-semibold text-lg text-gray-700 flex items-center gap-2">
            Explore Events{" "}
            <ImageSearchOutlinedIcon className="!text-yellow-500" />
          </h3>

          <div>
            <ul>
              {eventData.map((item, index) => (
                <li
                  data-aos="fade-up"
                  data-aos-duration="500"
                  // data-aos-mirror="true"
                  className="mb-5"
                  key={index}
                >
                  <EventPreview event={item} />
                </li>
              ))}
            </ul>

            {lastEventDate && (
              <div className="pt-4 w-fit mx-auto">
                <Button
                  disableElevation
                  disabled={eventData.length === eventsLength ? true : false}
                  variant="contained"
                  className="!normal-case !font-bold !rounded-xl !px-8"
                  onClick={() => {
                    loadMoreEvents(lastEventDate);
                  }}
                >
                  {eventData.length === eventsLength
                    ? "No more events"
                    : "View more events"}
                </Button>
              </div>
            )}
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
