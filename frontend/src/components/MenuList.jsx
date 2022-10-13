import { useState } from "react";
import Divider from "@mui/material/Divider";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import demoIMG from "../assets/img/demo.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

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
    <div className="mb-10">
      {/* search here */}
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
  );
}

export default MenuList;
