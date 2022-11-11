import { useState, useEffect } from "react";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser, logout, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import Spinner from "../components/Spinner";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LogoutIcon from "@mui/icons-material/Logout";

import { getEvents } from "../features/event/eventSlice";
import { snack } from "../features/global/globalSlice";
import BackButton from "../components/BackButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Tooltip from "@mui/material/Tooltip";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import Avatar from "@mui/material/Avatar";
import EventStatusTabs from "../components/EventStatusTabs";
import AppButton from "../components/AppButton";

// cloudinary keys
const cloud_name = "dqveipmsp";
const cloud_api_key = "245341436926946";

export function Profile() {
  // PRIVATE
  usePrivateRoute();
  const { user } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.event);
  const [formData, setFormData] = useState({});
  const [uploading, setUploading] = useState(false);
  const [menu, setMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GET EVENTS
  useEffect(() => {
    dispatch(getEvents())
      .unwrap()
      .then(() => {
        // if successfull
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        dispatch(snack("Error fetching events, please try again"));
      });
  }, [dispatch]);

  //  Set User Info
  useEffect(() => {
    let obj = {};
    if (user) {
      obj = {
        name: user.name,
        email: user.email,
        profile: {
          phone: user.profile?.phone,
          work: user.profile?.work,
          website: user.profile?.website,
        },
      };
      setFormData(obj);
    }
  }, [user]);

  const onCancel = () => {
    setIsEdit(false);
  };

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    setMenu(false);

    navigate("/");
  };

  // Profile Picture Change
  const handleProfilePicture = (e) => {
    setUploading(true);
    const file = e.target.files[0];

    if (file) {
      uploadImage(file).then((feedback) => {
        const { data } = feedback;
        const eventData = { img: data.img_id };
        dispatch(updateUser(eventData))
          .unwrap()
          .then(() => {
            setUploading(false);
          });
      });
    } else {
      setUploading(false);
    }
  };
  // upload file to cloudinary
  const uploadImage = async (image) => {
    // get signature
    const signatureResponse = await axios.get("/get-signature");

    // set data to upload to cloudinary
    const data = new FormData();
    data.append("file", image);
    data.append("api_key", cloud_api_key);
    data.append("signature", signatureResponse.data.signature);
    data.append("timestamp", signatureResponse.data.timestamp);

    // send the image to cloudinary
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) {
          // setCount(e.loaded / e.total);
        },
      }
    );
    // console.log(cloudinaryResponse.data);

    // after upload, check image info with cloudinary
    const photoData = {
      public_id: cloudinaryResponse.data.public_id,
      version: cloudinaryResponse.data.version,
      signature: cloudinaryResponse.data.signature,
    };

    const feedback = await axios.post("/image-info", photoData);

    return feedback;
  };

  // on change for inputs
  const onMutate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onChange = (e) => {
    let obj = {
      [e.target.id]: e.target.value,
    };

    setFormData((prevState) => ({
      ...prevState,
      profile: { ...formData.profile, ...obj },
    }));
  };

  // on edit profile submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    dispatch(updateUser(formData))
      .unwrap()
      .then(() => {
        setIsSaving(false);
        setIsEdit(false);
        dispatch(snack("Profile Updated"));
      })
      .catch((error) => {
        setIsSaving(false);
        dispatch(snack(error));
      });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="px-3 sm:px-6">
      <Header />
      <section className="relative">
        <div className="mt-2 mb-8 flex justify-between items-center ">
          <BackButton />
          <IconButton
            aria-label="more options"
            component="label"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <CloseOutlinedIcon /> : <MoreHorizIcon />}
          </IconButton>
        </div>
        {menu ? (
          <div className="shadow-lg absolute top-full right-0 py-2 px-3 border-2 border-gray-200">
            <p
              className="hover:text-red-600 flex gap-2 items-center w-fit pr-2 duration-300 ease-in-out cursor-pointer text-sm"
              onClick={onLogout}
            >
              <LogoutIcon fontSize="small" />
              <span>Sign out</span>
            </p>
          </div>
        ) : null}
      </section>

      {/* PROFILE */}
      <section className="mb-10 w-full" style={{ minWidth: 280 }}>
        <div>
          <Stack spacing={2} direction="column">
            {/* profile pic */}
            <div className="mb-1">
              <div className="w-fit mx-auto relative">
                {uploading && (
                  <div className="absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0 z-10 rounded-full flex justify-center items-center text-white">
                    <CircularProgress color="inherit" />
                  </div>
                )}
                <Avatar
                  alt="Profile Avi"
                  // src={DemoIMG}
                  src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_180,h_180,c_fill,q_100/${user?.img}.jpg`}
                  sx={{ width: 160, height: 160 }}
                />
                <div className="absolute bottom-2 right-1 z-50">
                  <IconButton
                    className="!bg-white !bg-opacity-90"
                    color="inherit"
                    aria-label="upload picture"
                    component="label"
                  >
                    <input
                      hidden
                      id="profileAvatar"
                      accept="image/*"
                      type="file"
                      onChange={handleProfilePicture}
                    />
                    <PhotoCamera />
                  </IconButton>
                </div>
              </div>

              <div className="text-center mt-2 mb-3">
                <p className="font-bold text-2xl">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <div className="flex gap-3 justify-center">
                <AppButton
                  text="Edit profile"
                  fill={true}
                  onClick={() => {
                    setIsEdit(true);
                  }}
                />

                {/* <Button
                  className="!rounded-lg !normal-case !px-8"
                  disableElevation
                  variant="contained"
                >
                  Edit Profile
                </Button> */}
                <Button
                  className="!rounded-lg !bg-gray-300 !text-gray-500"
                  disableElevation
                  variant="contained"
                  onClick={() => navigate("/create-event")}
                >
                  <Tooltip title="Create an Event">
                    <AddCircleOutlineOutlinedIcon />
                  </Tooltip>
                </Button>
              </div>
            </div>

            {isEdit ? (
              <>
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="w-full">
                    <div className="mb-3">
                      <label htmlFor="name" className="font-bold block pb-1">
                        Name
                      </label>
                      <TextField
                        hiddenLabel
                        fullWidth
                        size="small"
                        id="name"
                        variant="outlined"
                        value={formData.name}
                        onChange={onMutate}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="font-bold block pb-1">
                        Email
                      </label>
                      <TextField
                        hiddenLabel
                        disabled
                        fullWidth
                        className="bg-gray-100"
                        size="small"
                        id="email"
                        variant="outlined"
                        value={formData.email}
                        onChange={onMutate}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="phone" className="font-bold block pb-1">
                        Phone Number
                      </label>
                      <TextField
                        hiddenLabel
                        fullWidth
                        size="small"
                        id="phone"
                        variant="outlined"
                        value={
                          formData.profile.phone ? formData.profile.phone : ""
                        }
                        onChange={onChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="company" className="font-bold block pb-1">
                        Position&Company
                      </label>
                      <TextField
                        hiddenLabel
                        fullWidth
                        size="small"
                        id="work"
                        variant="outlined"
                        value={
                          formData.profile.work ? formData.profile.work : ""
                        }
                        onChange={onChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="website" className="font-bold block pb-1">
                        Website/Blog
                      </label>
                      <TextField
                        hiddenLabel
                        fullWidth
                        size="small"
                        id="website"
                        variant="outlined"
                        value={
                          formData.profile.website
                            ? formData.profile.website
                            : ""
                        }
                        onChange={onChange}
                      />
                    </div>

                    <div>
                      <div className="w-fit mx-auto sm:ml-auto sm:mr-0">
                        <Stack spacing={2} direction="row">
                          <AppButton
                            disabled={isSaving}
                            fill={true}
                            text="Submit"
                            type="submit"
                          />
                          <AppButton
                            disabled={isSaving}
                            fill={false}
                            text="Cancel"
                            type="button"
                            onClick={onCancel}
                          />
                          {/* <Button
                            disableElevation
                            size="small"
                            variant="contained"
                            type="submit"
                            disabled={isSaving}
                          >
                            Submit
                          </Button> */}
                          {/* <Button
                            disableElevation
                            size="small"
                            variant="outlined"
                            disabled={isSaving}
                            onClick={onCancel}
                          >
                            Cancel
                          </Button> */}
                        </Stack>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            ) : null}
          </Stack>
        </div>
      </section>

      {/* EVENTS */}
      <section style={{ minWidth: 200 }}>
        <div className="mb-5">
          {events && <EventStatusTabs events={events} />}
        </div>
      </section>
    </div>
  );
}
