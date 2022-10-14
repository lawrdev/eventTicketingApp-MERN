import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import demoIMG from "../assets/img/demo.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import { useAutocomplete } from "@mui/base/AutocompleteUnstyled";

const list = [
  "Popular events",
  "Create an event",
  "View Profile",
  "About this project",
  "Settings",
];
function MenuList({ user, setMenuOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO:: create search functionality

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    setMenuOpen(false);

    navigate("/");
  };
  const onProfile = () => {
    setMenuOpen(false);
    navigate("/profile");
  };

  return (
    <Box sx={{ display: { sm: "none" } }}>
      <div className="mb-10">
        {/* search here */}

        <div className="px-3 py-1.5">
          <label htmlFor="search" className="relative">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search events..."
              className="searchInput"
            />
            <div className="searchIconWrapper">
              <SearchIcon fontSize="small" className="hover:scale-105" />
            </div>
          </label>
        </div>

        <div className="font-semibold">
          <ul>
            {list.map((item, index) => (
              <li
                key={index}
                className="menuListItem scaleDown"
                onClick={() => setMenuOpen(false)}
              >
                <Divider />
                <Link to="/">
                  <p>{item}</p>
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="px-3 flex flex-col justify-between py-1 h-10 ">
              <Divider />
              <div
                className="flex gap-1 cursor-pointer scaleDown"
                onClick={onProfile}
              >
                <Avatar
                  alt="profile"
                  src={demoIMG}
                  sx={{ width: 24, height: 24 }}
                />
                <p className="hover:underline">{user.name}</p>
              </div>
            </div>
          ) : null}
          <div className="px-3 flex flex-col justify-between py-1 h-10">
            <Divider />
            <p
              className="hover:text-red-600 flex gap-1 items-center  w-fit pr-2 duration-300 ease-in-out cursor-pointer scaleDown"
              onClick={onLogout}
            >
              <LogoutIcon />
              <span>Sign out</span>
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default MenuList;
