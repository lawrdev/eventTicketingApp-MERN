import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import EventPreview from "./EventPreview";

function EventStatusBar({ events }) {
  const [upcoming, setUpcoming] = useState([]);
  const [happening, setHappening] = useState([]);
  const [closed, setClosed] = useState([]);

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // CHECK EVENT STATUS
  useEffect(() => {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    events.forEach((data, i) => {
      if (data.status === "Upcoming") {
        arr1.push(data);
      } else if (data.status === "Happening") {
        arr2.push(data);
      } else if (data.status === "Closed") {
        arr3.push(data);
      }
    });

    setUpcoming([...arr1]);
    setHappening([...arr2]);
    setClosed([...arr3]);
  }, [events]);

  return (
    <>
      <Accordion
        className="!bg-inherit mb-2"
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ArrowCircleDownOutlinedIcon />}
          aria-controls="panel1a-content"
        >
          <h3 className="pb-2 font-bold text-gray-700"># Upcoming</h3>
        </AccordionSummary>
        <AccordionDetails>
          {upcoming.length === 0 ? (
            <p className="text-center text-sm text-gray-500 pb-3">
              No events to show
            </p>
          ) : (
            <ul>
              {upcoming?.map((item, index) => (
                <li key={index} className="mb-5">
                  <EventPreview event={item} />
                </li>
              ))}
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="!bg-inherit mb-2"
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ArrowCircleDownOutlinedIcon />}
          aria-controls="panel1a-content"
        >
          <h3 className="pb-2 font-bold text-gray-700"># Happening</h3>
        </AccordionSummary>

        <AccordionDetails className="!p-0 !m-0">
          {happening.length === 0 ? (
            <p className="text-center text-sm text-gray-500 pb-3">
              No events to show
            </p>
          ) : (
            <ul>
              {happening?.map((item, index) => (
                <li key={index} className="mb-5">
                  <EventPreview event={item} />
                </li>
              ))}
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        className="!bg-inherit"
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ArrowCircleDownOutlinedIcon />}
          aria-controls="panel1a-content"
        >
          <h3 className="pb-2 font-bold text-gray-700"># Closed</h3>
        </AccordionSummary>

        <AccordionDetails>
          {closed.length === 0 ? (
            <p className="text-center text-sm text-gray-500 pb-3">
              No events to show
            </p>
          ) : (
            <ul>
              {closed?.map((item, index) => (
                <li key={index} className="mb-5">
                  <EventPreview event={item} />
                </li>
              ))}
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default EventStatusBar;
