import { useState, useEffect } from "react";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import TextField from "@mui/material/TextField";
import DemoIMG from "../assets/img/demo.jpg";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

import { getEvents } from "../features/event/eventSlice";
import { snack, resetSnackbar } from "../features/global/globalSlice";
import EventsCard from "../components/EventsCard";

const initialState = {
  user: {},
  events: [],
};

export function Profile() {
  usePrivateRoute();
  const { user } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.event);
  const { formData, setformData } = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEvents())
      .unwrap()
      .then(() => {
        // if successfull
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        dispatch(snack(error));
      });
  }, [dispatch]);

  const onCancel = () => {
    setIsEdit(false);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="mt-8 mb-5 text-center text-lg font-bold">
        <h3> My Profile</h3>
      </section>

      <Stack spacing={3} direction={{ direction: "column", sm: "row" }}>
        <section>
          <div>
            <form autoComplete="off">
              <Stack spacing={2} direction="column">
                {/* profile pic */}
                <div className="mb-3 w-full max-w-xs mx-auto">
                  <div className="relative overflow-hidden w-fit mx-auto">
                    <div className="profileImageWrapper">
                      <img
                        src={DemoIMG}
                        alt="profile"
                        className="profileImgage"
                      />
                      <div className="addPhoto">
                        <IconButton
                          className="bg-opacity-100 !text-white hover:!text-gray-300"
                          color="inherit"
                          aria-label="upload picture"
                          component="label"
                        >
                          <input hidden accept="image/*" type="file" />
                          <PhotoCamera fontSize="large" />
                        </IconButton>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p>{user.email}</p>
                  </div>

                  <div className="my-2">
                    <Button
                      className="!rounded-3xl !border-2"
                      fullWidth
                      disableElevation
                      variant="outlined"
                      onClick={() => {
                        setIsEdit(true);
                      }}
                    >
                      Edit Profile
                    </Button>
                  </div>
                </div>

                {isEdit ? (
                  <div className="w-full">
                    <div className="mb-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold block pb-1"
                      >
                        Name
                      </label>
                      <TextField
                        hiddenLabel
                        disabled
                        fullWidth
                        size="small"
                        id="name"
                        variant="outlined"
                        value={user.name}
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold block pb-1"
                      >
                        Email
                      </label>
                      <TextField
                        hiddenLabel
                        disabled
                        fullWidth
                        size="small"
                        id="email"
                        variant="outlined"
                        value={user.email}
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="phone"
                        className="text-sm font-semibold block pb-1"
                      >
                        Phone Number
                      </label>
                      <TextField
                        hiddenLabel
                        disabled
                        fullWidth
                        size="small"
                        id="phone"
                        variant="outlined"
                        value={user.phone}
                      />
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="company"
                        className="text-sm font-semibold block pb-1"
                      >
                        Position&Company
                      </label>
                      <TextField
                        hiddenLabel
                        disabled
                        fullWidth
                        size="small"
                        id="company"
                        variant="outlined"
                        value={user.Profile?.company}
                      />
                    </div>

                    <div className="mb-5">
                      <label
                        htmlFor="website"
                        className="text-sm font-semibold block pb-1"
                      >
                        Website/Blog
                      </label>
                      <TextField
                        hiddenLabel
                        disabled
                        fullWidth
                        size="small"
                        id="website"
                        variant="outlined"
                        value={user.Profile?.website}
                      />
                    </div>

                    <div>
                      <div className="w-fit mx-auto sm:ml-auto sm:mr-0">
                        <Stack spacing={2} direction="row">
                          <Button variant="contained">Submit</Button>
                          <Button variant="outlined" onClick={onCancel}>
                            Cancel
                          </Button>
                        </Stack>
                      </div>
                    </div>
                  </div>
                ) : null}
              </Stack>
            </form>
          </div>
        </section>

        <section className="flex-grow" style={{ minWidth: 280 }}>
          <div className=" flex-grow text-center">
            <div className="mb-4">
              <h3 className="pb-2">YOUR EVENTS</h3>
              <Divider />
            </div>

            <ul>
              {events?.map((item, index) => (
                <li key={index} className="mb-5">
                  <EventsCard event={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Stack>
    </>
  );
}
