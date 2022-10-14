import { useState } from "react";
import { usePrivateRoute } from "../hooks/usePrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../features/event/eventSlice";
import { snack, resetSnackbar } from "../features/global/globalSlice";
import Spinner from "../components/Spinner";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import PhoneIcon from "@mui/icons-material/Phone";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

import dayjs from "dayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import BackButton from "../components/BackButton";

const events = [
  "Party or Social Gathering",
  "Class, Training or Workshop",
  "Screening",
  "Meeting",
  "Festival",
  "Performance or Concerts",
  "Tour",
  "Game or Tournament",
  "Conference",
  "Playground",
  "Private Party",
  "VIP",
  "Other",
];

const detailsInitialState = {
  title: "",
  description: "",
  location: "",
  date: "",
  time: "",
  phone: "",
  twitter: "",
  instagram: "",
};

export function CreateEvent() {
  usePrivateRoute(); // if !user redirects

  //Redux auth state
  const { user } = useSelector((state) => state.auth);

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [event, setEvent] = useState("Class, Training or Workshop");
  const [details, setDetails] = useState(detailsInitialState);
  const [eventDate, setEventDate] = useState(dayjs());
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // on 'event type' change
  const handleEventChange = (event) => {
    setEvent(event.target.value);
  };

  // on date/time change
  const handleDate = (newValue) => {
    setEventDate(newValue);
    setDetails({
      ...details,
      date: eventDate.format("DD MMMM, YYYY"),
      time: eventDate.format("h:mm A"),
    });
  };

  const onChange = (event) => {
    setDetails({ ...details, [event.target.id]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(resetSnackbar());

    // dispatch create event
    dispatch(createEvent({ eventType: event, details }))
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
    <>
      <BackButton />
      <section className="text-center mb-4 mt-2">
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
                placeholder="Chef Zoey's Baking Classes at Ikeja"
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
              {/* <TextField
                size="small"
                id="event"
                select
                fullWidth
                hiddenLabel
                value={event}
                onChange={handleEventChange}
              >
                {events.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField> */}
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
          <div className="mb-10">
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
            <Button type="submit" fullWidth variant="contained">
              Create Event
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
