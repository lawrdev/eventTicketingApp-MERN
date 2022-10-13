import { useState, useEffect } from "react";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import TextField from "@mui/material/TextField";
import DemoIMG from "../assets/img/demo.jpg";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { getEvents } from "../features/event/eventSlice";
import { snack, resetSnackbar } from "../features/global/globalSlice";

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

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="text-center text-lg font-bold">
        <h3> My Profile</h3>
      </section>

      <section>
        <div className="border-2 border-gray-300 p-2">
          <form
            className="flex flex-col-reverse sm:flex-row"
            autoComplete="off"
          >
            <div className="flex-grow" style={{ minWidth: 290 }}>
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-semibold block pb-2"
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

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold block pb-2"
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

              <div>
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold block pb-2"
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

              <div>
                <label
                  htmlFor="company"
                  className="text-sm font-semibold block pb-2"
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

              <div>
                <label
                  htmlFor="website"
                  className="text-sm font-semibold block pb-2"
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
            </div>

            <div>
              <div className="relative max-w-sm mx-auto overflow-hidden rounded">
                <div className="profileImageWrapper">
                  <img src={DemoIMG} alt="profile" className="profileImgage" />
                </div>
                <div className="absolute z-50 right-0 left-0 bottom-0 bg-slate-800 bg-opacity-50  flex justify-center">
                  <IconButton
                    className="bg-opacity-100 !text-white"
                    color="inherit"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input hidden accept="image/*" type="file" />
                    <PhotoCamera fontSize="medium" />
                  </IconButton>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
