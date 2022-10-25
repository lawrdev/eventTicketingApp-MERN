import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import EventCard from "./EventCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EventStatusTab({ events }) {
  const [value, setValue] = useState(0);
  const [upcoming, setUpcoming] = useState([]);
  const [happening, setHappening] = useState([]);
  const [closed, setClosed] = useState([]);

  useEffect(() => {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    events.forEach((item) => {
      if (item.status === "Upcoming") {
        arr1.push(item);
      }
      if (item.status === "Happening") {
        arr2.push(item);
      }
      if (item.status === "Closed") {
        arr3.push(item);
      }
    });
    setUpcoming(arr1);
    setHappening(arr2);
    setClosed(arr3);
  }, [events]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, mb: 2, borderColor: "divider" }}>
        <Tabs
          centered
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="event status"
        >
          <Tab className="eventTab" label="Upcoming" {...a11yProps(0)} />
          <Tab className="eventTab" label="Happening" {...a11yProps(1)} />
          <Tab className="eventTab" label="Closed" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Grid container spacing={{ xs: 3, sm: 3 }} columns={{ xs: 4, sm: 8 }}>
          {upcoming.map((item, index) => (
            <Grid xs={4} sm={4} key={index}>
              <EventCard event={item} />
            </Grid>
          ))}
          {upcoming.length === 0 && (
            <p className="w-full text-center text-gray-500">No events</p>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={{ xs: 3, sm: 3 }} columns={{ xs: 4, sm: 8 }}>
          {happening.map((item, index) => (
            <Grid xs={4} sm={4} key={index}>
              <EventCard event={item} />
            </Grid>
          ))}
          {happening.length === 0 && (
            <p className="w-full text-center text-gray-500">No events</p>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container spacing={{ xs: 3, sm: 3 }} columns={{ xs: 4, sm: 8 }}>
          {closed.map((item, index) => (
            <Grid xs={4} sm={4} key={index}>
              <EventCard event={item} />
            </Grid>
          ))}
          {closed.length === 0 && (
            <p className="w-full text-center text-gray-500">No events</p>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}
