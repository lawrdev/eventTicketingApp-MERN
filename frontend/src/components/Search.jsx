import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { getSearchEvents } from "../features/event/eventSlice";
import { snack } from "../features/global/globalSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const cloud_name = "dqveipmsp";

export default function Search() {
  const [options, setOptions] = useState(null);

  const { searchEvents } = useSelector((state) => state.event);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { SingleValue, Option } = components;

  // set react-select options
  useEffect(() => {
    let arr = [];
    if (searchEvents) {
      searchEvents.forEach((item) => {
        let obj = {
          value: item,
          label: item.details.title,
          image: `https://res.cloudinary.com/${cloud_name}/image/upload/w_40,h_40,c_fill,q_100/${item.details.img_id}.jpg`,
        };
        arr.push(obj);
      });

      setOptions(arr);
    }
  }, [searchEvents]);

  // callback - fired after you've run api req to backend for results
  const loadOptions = (searchValue, callback) => {
    dispatch(getSearchEvents(searchValue))
      .unwrap()
      .then(() => {
        if (options) callback(options);
      })
      .catch((error) => dispatch(snack(error)));

    // console.log("loadOptions", searchValue);
  };

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <SearchOutlinedIcon fontSize="small" />
      </components.DropdownIndicator>
    );
  };

  const IconSingleValue = (props) => (
    <SingleValue {...props}>
      <img
        alt="event"
        src={props.data.image}
        style={{
          height: "30px",
          width: "40px",
          borderRadius: "4px",
          marginRight: "10px",
        }}
      />
      {props.data.label}
    </SingleValue>
  );

  const IconOption = (props) => (
    <Option {...props}>
      <img
        alt="event"
        src={props.data.image}
        style={{
          height: "30px",
          width: "40px",
          borderRadius: "4px",
          marginRight: "10px",
        }}
      />
      {props.data.label}
    </Option>
  );

  const customStyles = {
    control: (styles) => {
      return {
        ...styles,
        border: 0,
        // This line disable the blue border
        boxShadow: "none",
        borderWidth: 1,
        backgroundColor: "white",
        // "&:hover": {
        //   boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
        // },
      };
    },
    option: (provided, { isFocused }) => ({
      ...provided,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "5px 8px",
      fontSize: "14px",
      fontWeight: "600",
      backgroundColor: isFocused ? "#a855f7" : "inherit",
      color: isFocused ? "#fff" : "#6B7280",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontSize: "14px",
      fontWeight: "600",
      color: "#374151",
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        fontSize: "14px",
      };
    },
  };

  // to get selected option and do smth with it
  const handleChange = (selectedOption) => {
    navigate(`/events/${selectedOption.value._id}`);
  };

  return (
    <>
      <AsyncSelect
        styles={customStyles}
        loadOptions={loadOptions}
        onChange={handleChange}
        components={{
          DropdownIndicator,
          SingleValue: IconSingleValue,
          Option: IconOption,
        }}
        placeholder="Find your next event"
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? "search for an event" : "No results found"
        }
      />
    </>
  );
}
