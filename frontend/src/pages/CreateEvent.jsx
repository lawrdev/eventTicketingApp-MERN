import { useState } from "react";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../features/event/eventSlice";
import { snack, resetSnackbar } from "../features/global/globalSlice";
import Spinner from "../components/Spinner";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import BackButton from "../components/BackButton";
import ImageButtons from "../components/ImageButtons";
import AppButton from "../components/AppButton";

// cloudinary keys
const cloud_name = "dqveipmsp";
const cloud_api_key = "245341436926946";

const events = [
  "Party",
  "Music",
  "Comedy show",
  "Training",
  "Conference",
  "Gaming",
  "Private",
  "Other",
];

const detailsInitialState = {
  title: "",
  description: "",
  location: "",
  date: dayjs().format("DD MMMM, YYYY"),
  time: dayjs().format("h:mm A"),
  phone: "",
  twitter: "",
  instagram: "",
};

export function CreateEvent() {
  usePrivateRoute(); // if !user redirects

  const { user } = useSelector((state) => state.auth);

  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [event, setEvent] = useState("Party");
  const [details, setDetails] = useState(detailsInitialState);
  const [eventDate, setEventDate] = useState(dayjs());
  const [stampEventDate, setStampEventDate] = useState(dayjs().unix());
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  // we need only 1 image
  const [fileInput, setFileInput] = useState(null);
  const [previewSource, setPreviewSource] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on date/time change
  const handleDate = (newValue) => {
    let ts = newValue.unix();
    setEventDate(newValue);
    setStampEventDate(ts);
    setDetails({
      ...details,
      date: eventDate.format("DD MMMM, YYYY"),
      time: eventDate.format("h:mm A"),
    });
  };

  const onChange = (event) => {
    setDetails({ ...details, [event.target.id]: event.target.value });
  };

  // Image
  const handleFileInputChange = async (e) => {
    setPreviewSource("");
    setCount(0);
    dispatch(resetSnackbar());
    // grab file(s) out of input
    const files = Array.from(e.target.files);
    // show file in UI
    previewFiles(files);
    setFileInput(files[0]);
  };
  const handleSaveImage = async () => {
    if (previewSource) {
      const { data } = await uploadImage(fileInput);
      if (data) {
        setDetails({
          ...details,
          img_id: data.img_id,
        });
        setCount(1);
      }
    }
  };
  const handleCancelImage = () => {
    if (previewSource) {
      setPreviewSource("");
    }
  };

  // Promise that resolves 'fr.result' - base64 encoded string
  function readFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onloadend = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsDataURL(file);
    });
  }
  // preview images[0] to UI
  const previewFiles = (files) => {
    // Abort if there were no files selected
    if (!files.length) return;

    // for array of base64-string formats for each 'file'
    let readers = [];

    // Store promises in array
    for (let i = 0; i < files.length; i++) {
      readers.push(readFileAsDataUrl(files[i]));
    }

    // Trigger Promises
    Promise.all(readers).then((values) => {
      // Values will be an array that containing base64 encoded strings for each file
      // console.log(values);

      // to preview string in UI
      setPreviewSource(values[0]);
    });
  };

  // upload file to cloudinary
  const uploadImage = async (image) => {
    // get signature. In reality you could store this in localstorage or some other cache mechanism, it's good for 1 hour
    const signatureResponse = await axios.get("/get-signature");

    // set data to upload to cloudinary
    const data = new FormData();
    data.append("file", image);
    data.append("api_key", cloud_api_key);
    data.append("signature", signatureResponse.data.signature);
    data.append("timestamp", signatureResponse.data.timestamp);

    // after setting data, then send the image to cloudinary
    const cloudinaryResponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (e) {
          // setCount(e.loaded / e.total);
        },
      }
    );
    // console.log(cloudinaryResponse.data);

    // after upload, send the image info back to our server
    const photoData = {
      public_id: cloudinaryResponse.data.public_id,
      version: cloudinaryResponse.data.version,
      signature: cloudinaryResponse.data.signature,
    };

    const feedback = await axios.post("/image-info", photoData);

    return feedback;
  };

  //  SUBMIT FORM
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!previewSource) {
      dispatch(snack("Please include an image"));
      return;
    }
    setIsLoading(true);
    dispatch(resetSnackbar());

    // dispatch create event
    dispatch(
      createEvent({
        eventDate: stampEventDate,
        eventType: event,
        details,
      })
    )
      .unwrap()
      .then(() => {
        // good response so navigate the user
        setIsLoading(false);
        navigate("/profile");
        dispatch(snack("New event created!"));
      })
      .catch((error) => {
        setIsLoading(false);
        dispatch(snack(error));
      });
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="px-3 sm:px-6">
      <div className="mt-3" />
      <BackButton />

      <section className="text-center mb-4 mt-4">
        <h1 className="font-bold text-xl">Create New Event</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="mb-8">
        <form autoComplete="off" onSubmit={onSubmit}>
          {/* Basic info */}
          <div className=" mb-8">
            <div className="mb-5">
              <h3 className="font-bold text-lg">Basic Info</h3>
              <p className="text-sm text-gray-500">
                Name your event and tell event-goers why they should come. Add
                details that highlight what makes it unique
              </p>
            </div>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="text-sm font-semibold block pb-2"
              >
                Event title
              </label>
              <TextField
                hiddenLabel
                fullWidth
                required
                maxLength="50"
                placeholder="Enter a title for your event"
                size="small"
                id="title"
                variant="outlined"
                value={details.title}
                onChange={onChange}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="owner-name"
                className="text-sm font-semibold block pb-2"
              >
                Event creator Name
              </label>
              <TextField
                hiddenLabel
                disabled
                fullWidth
                className="bg-gray-200"
                size="small"
                id="owner-name"
                variant="outlined"
                value={name}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="event"
                className="text-sm font-semibold block pb-2"
              >
                Choose your event type
              </label>
              <Autocomplete
                disablePortal
                value={event}
                onChange={(e, newValue) => {
                  setEvent(newValue);
                }}
                options={events}
                id="event"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    placeholder="Search for an event..."
                  />
                )}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="title"
                className="text-sm font-semibold block pb-2"
              >
                Description
              </label>
              <TextField
                required
                hiddenLabel
                fullWidth
                multiline
                rows={4}
                size="small"
                id="description"
                placeholder="Write a description for your event..."
                variant="outlined"
                value={details.description}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Image */}
          <div className="mb-8">
            <div className="mb-5">
              <h3 className="font-bold text-lg">Event Image</h3>
              <p className="text-sm text-gray-500">
                Make your event unique, add an image for your event (required)
              </p>
            </div>

            <div>
              <div className="mb-4">
                <Button
                  disableElevation
                  color="secondary"
                  size="small"
                  variant="outlined"
                  component="label"
                  sx={{ textTransform: "none" }}
                >
                  <PhotoCamera sx={{ mr: 1 }} />
                  Upload
                  <input
                    // required
                    hidden
                    name="avatar"
                    accept="image/*"
                    type="file"
                    id="avatar"
                    onChange={handleFileInputChange}
                  />
                </Button>
              </div>

              {previewSource ? (
                <>
                  <div className="imageGridImgWrapper">
                    <img
                      src={previewSource}
                      alt="selected"
                      className="imageGridImg"
                    />
                  </div>

                  <div>
                    <div className="w-fit mx-auto sm:ml-auto sm:mr-0">
                      <ImageButtons
                        save={handleSaveImage}
                        cancel={handleCancelImage}
                        count={count}
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <div className="mb-5">
              <h3 className="font-bold text-lg">Location</h3>
              <p className="text-sm text-gray-500">
                Help people in the area discover your event and let attendees
                know where to show up.
              </p>
            </div>

            <div className="mb-5">
              <label
                htmlFor="location"
                className="text-sm font-semibold block pb-2"
              >
                Where would this event be held?
              </label>
              <TextField
                required
                hiddenLabel
                fullWidth
                size="small"
                id="location"
                variant="outlined"
                value={details.location}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Date and time */}
          <div className="mb-8">
            <div className="mb-5">
              <h3 className="font-bold text-lg">Date and time</h3>
              <p className="text-sm text-gray-500">
                Tell event-goers when your event starts and ends so they can
                make plans to attend
              </p>
            </div>

            <div className="flex gap-3 sm:gap-6 sm:flex-wrap mt-3">
              <div>
                <label htmlFor="date" className="text-sm font-semibold block">
                  Date
                </label>
                <div className="pt-2">
                  <div className="sm:hidden">
                    <MobileDatePicker
                      disablePast
                      inputFormat="MM/DD/YYYY"
                      value={eventDate}
                      onChange={handleDate}
                      renderInput={(params) => (
                        <TextField
                          required
                          id="date"
                          size="small"
                          {...params}
                        />
                      )}
                    />
                  </div>
                  <div className="hidden sm:block">
                    <DesktopDatePicker
                      disablePast
                      inputFormat="MM/DD/YYYY"
                      value={eventDate}
                      onChange={handleDate}
                      renderInput={(params) => (
                        <TextField
                          required
                          id="date"
                          size="small"
                          {...params}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="text-sm font-semibold block pb-2"
                >
                  Time
                </label>
                <TimePicker
                  size="small"
                  value={eventDate}
                  onChange={handleDate}
                  renderInput={(params) => (
                    <TextField required id="time" size="small" {...params} />
                  )}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <div className="mb-5">
              <h3 className="font-bold text-lg">Creator contact</h3>
              <p className="text-sm text-gray-500">
                Add a phone number for your event and social media.
              </p>
            </div>
            <div className="mb-5">
              <label
                htmlFor="owner-name"
                className="text-sm font-semibold block pb-2"
              >
                Creator email
              </label>
              <TextField
                hiddenLabel
                disabled
                fullWidth
                className="bg-gray-200"
                size="small"
                id="owner-email"
                variant="outlined"
                value={email}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Box sx={{ display: "flex", alignItems: "flex-end", mr: 3 }}>
                <PhoneIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  label="Phone"
                  type="number"
                  pattern="[0-9]"
                  size="small"
                  id="phone"
                  variant="standard"
                  value={details.phone}
                  onChange={onChange}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end", mr: 3 }}>
                <TwitterIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="twitter"
                  size="small"
                  label="Twitter"
                  variant="standard"
                  value={details.twitter}
                  onChange={onChange}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <InstagramIcon
                  sx={{ color: "action.active", mr: 1, my: 0.5 }}
                />
                <TextField
                  InputLabelProps={{
                    shrink: true,
                  }}
                  id="instagram"
                  label="Instagram"
                  variant="standard"
                  value={details.instagram}
                  onChange={onChange}
                />
              </Box>
            </div>
          </div>

          <div className="max-w-lg mx-auto mb-8">
            <AppButton
              text="Submit"
              type="submit"
              className="w-full py-3 font-bold"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
