import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import AppButton from "../components/AppButton";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ViewDayOutlinedIcon from "@mui/icons-material/ViewDayOutlined";
import EventPreview from "../components/EventPreview";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, getAllEvents } from "../features/event/eventSlice";
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
  const { user } = useSelector((state) => state.auth);
  const { publicEvents } = useSelector((state) => state.event);
  const [loading, setLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET ALL EVENTS - [public]
  useEffect(() => {
    dispatch(getAllEvents())
      .unwrap()
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        dispatch(snack("Error please try again"));
      });
  }, [dispatch]);

  //  CHECK IF USER
  useEffect(() => {
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <>
      <div className="px-3">
        <Header />
      </div>

      <section className="mb-10 relative" style={{ zIndex: 200 }}>
        <div className="relative">
          <div className="HomeImageWrapper">
            <img
              alt="Home"
              src={`https://res.cloudinary.com/dqveipmsp/image/upload/v1666807240/ticketapp/pexels-tima-miroshnichenko-6498312_nbuors.jpg`}
              className="HomeImage"
            />
          </div>

          <div className="absolute left-0 top-1/2 -translate-y-1/2 max-w-sm text-white px-4">
            <h3 className="text-lg sm:text-xl font-bold mb-1">
              EventTicketing
            </h3>
            <p className="text-xs opacity-80 sm:text-sm mb-3 sm:mb-5">
              Let's you take your meetings, parties, music events, conferences
              and other events to the next level
            </p>

            <button className="homeBtn opacity-90">Create an event</button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 mb-2 px-3">
            <div className="max-w-sm mx-auto bg-white rounded-md py-1 px-2">
              <Search />
            </div>
          </div>
        </div>
      </section>

      <div className="px-3 ">
        {/* <section className="mt-5 mb-8">
          <div className="introWrapper ">
            <div className="w-full">
              <p className="text-sm text-gray-500 mb-4 max-w-xs">
                <span className="font-bold">
                  <span className="text-yellow-500">PARTY</span>JOLLOF
                </span>{" "}
                is a web app that let's you take your meetings, parties, music
                events, conferences and other events to the next level with
                deeper, richer engagement for all participants with real-time
                communication and seamless updates
                Plus, it has been
              created with insight by people who understand the group experience 
              </p>

              <AppButton
                text="Create a new event"
                onClick={() => navigate("/create-event")}
                className="py-3 px-6 "
              />
            </div>

            <div
              className="max-w-xs mx-auto w-full overflow-hidden"
              style={{ minWidth: 220 }}
            >
              <img
                alt="event"
                src={`https://res.cloudinary.com/dqveipmsp/image/upload/v1666633192/Open_Figures_-_3_Characters_awm0kx.png`}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section> */}

        <section className="mb-5">
          <div>
            <h3 className="mb-3 font-bold text-lg">Explore</h3>

            <div>
              <Swiper
                slidesPerView={"auto"}
                spaceBetween={12}
                navigation={false}
                modules={[Navigation]}
                // FIX STRETCH ISSUE
                className="!pt-1 !pb-4"
              >
                {publicEvents?.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="!h-full !w-fit self-stretch"
                  >
                    <EventPreview event={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>

        <section className="mt-3 mb-7">
          <div>
            <h3 className="mb-3 font-bold text-lg">Categories</h3>

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
                      className="py-2 px-4 flex gap-1 items-center shadow hover:shadow-md rounded-md text-purple-500 cursor-pointer no-select"
                      onClick={() => navigate(`/category/${item.title}`)}
                    >
                      {item.icon}
                      <p className="text-sm text-gray-700 font-base">
                        {item.title}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
