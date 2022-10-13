import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import StyleIcon from "@mui/icons-material/Style";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import demoIMG from "../assets/img/demo.jpg";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import MenuList from "./MenuList";

const list = [
  "Popular events",
  "Create an event",
  "View Profile",
  "About this project",
  "Settings",
];

export function Header() {
  const [anchor, setAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleOpen = (e) => {
    setAnchor(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchor(null);
  };
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());

    handleClose();

    navigate("/");
  };
  const onProfile = () => {
    handleClose();
    navigate("/profile");
  };

  return (
    <header>
      <div className="mt-2 mb-2 select-none">
        <div className=" !text-gray-700">
          <Toolbar className="!justify-between">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuIcon />
            </IconButton>

            <div
              className="cursor-pointer  hover:bg-black rounded-full
                hover:bg-opacity-5 p-1.5 duration-300 ease-in-out"
              onClick={() => navigate("/")}
            >
              <StyleIcon fontSize="large" />
            </div>

            <Box
              className="flex-grow"
              sx={{ display: { display: "none", sm: "block" } }}
            >
              <p className="font-bold w-fit cursor-pointer">
                EventTicketing App
              </p>
            </Box>

            {!user ? (
              <div className="flex gap-1">
                <Button
                  size="small"
                  onClick={() => navigate("/login")}
                  color="primary"
                  variant="standard"
                  className="!text-blue-500"
                >
                  Sign in
                </Button>
                <Box sx={{ display: { display: "none", sm: "block" } }}>
                  <Button
                    disableElevation
                    size="small"
                    startIcon={<PersonAddAlt1OutlinedIcon />}
                    onClick={() => navigate("/register")}
                    color="primary"
                    variant="contained"
                  >
                    Register
                  </Button>
                </Box>
              </div>
            ) : (
              <div>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpen} sx={{ p: 0 }}>
                    <Avatar alt="account settings" src={demoIMG} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchor)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={onProfile}>
                    <p className="text-center">Profile</p>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <p className="text-center">Sign out</p>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </div>

        <Divider />
      </div>

      {menuOpen ? (
        <div>
          <div className="w-full">
            <MenuList user={user} setMenuOpen={setMenuOpen} />
          </div>
        </div>
      ) : null}
    </header>
  );
}
