// import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import demoIMG from "../assets/img/demo.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Box from "@mui/material/Box";
import Search from "./Search";

function MenuList({ user, setMenuOpen }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div className="mb-10 pb-3 border-b-2 border-gray-300 rounded-b-lg !no-select">
        <div className="my-2">
          <Search />
        </div>

        <div className="font-semibold">
          <ul>
            <li
              className="menuListItem scaleDown"
              onClick={() => setMenuOpen(false)}
            >
              <Divider />
              <Link to="/">
                <p>Home</p>
              </Link>
            </li>
            <li
              className="menuListItem scaleDown"
              onClick={() => setMenuOpen(false)}
            >
              <Divider />
              <Link to="/create-event">
                <p>Create an event</p>
              </Link>
            </li>
            <li
              className="menuListItem scaleDown"
              onClick={() => setMenuOpen(false)}
            >
              <Divider />
              <Link to="/profile">
                <p>View Profile</p>
              </Link>
            </li>
            <li
              className="menuListItem scaleDown"
              onClick={() => setMenuOpen(false)}
            >
              <Divider />
              <Link to="/">
                <p>About this project</p>
              </Link>
            </li>
            <li className="menuListItem scaleDown !text-gray-400">
              <Divider />
              <p>Settings</p>
            </li>
          </ul>
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
