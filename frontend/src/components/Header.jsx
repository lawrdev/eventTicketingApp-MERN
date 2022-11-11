import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import StyleIcon from "@mui/icons-material/Style";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Box from "@mui/material/Box";
import MenuList from "./MenuList";

// cloudinary keys
const cloud_name = "dqveipmsp";

export function Header({ className, variant }) {
  // const [anchor, setAnchor] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  return (
    <header>
      <div className="mt-2 select-none">
        <div className="mb-2 !text-gray-700">
          <Toolbar
            variant="dense"
            className="!justify-between max-w-5xl mx-auto !px-0 !pl-2"
          >
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              className="qbox"
              sx={{ display: { sm: "none" } }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <MenuOutlinedIcon />
            </IconButton>

            <Box sx={{ display: { display: "none", sm: "block" } }}>
              <div
                className="cursor-pointer text-gray-700 flex gap-2 items-center"
                onClick={() => navigate("/")}
              >
                <StyleIcon fontSize="large" />

                <p
                  className="font-bold w-fit cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  EventTicketing App
                </p>
              </div>
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
              <>
                <Tooltip title="Profile">
                  <IconButton sx={{ p: 0 }}>
                    <Link to="/profile">
                      <Avatar
                        alt="profile"
                        src={`https://res.cloudinary.com/${cloud_name}/image/upload/w_50,h_50,c_fill,q_100/${user?.img}.jpg`}
                      />
                    </Link>
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Toolbar>
        </div>

        <Divider />
      </div>

      {menuOpen ? (
        <div>
          <div className="w-full" data-aos="fade-right">
            {user ? (
              <MenuList user={user} setMenuOpen={setMenuOpen} />
            ) : (
              <>
                <Box sx={{ display: { sm: "none" } }}>
                  <div className="mb-10 pb-3 border-b-2 border-gray-300 rounded-b-lg">
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
                            <p>About this project</p>
                          </Link>
                        </li>
                        <li
                          className="menuListItem scaleDown"
                          onClick={() => setMenuOpen(false)}
                        >
                          <Divider />
                          <Link to="/register">
                            <p>Register</p>
                          </Link>
                        </li>
                        <li
                          className="menuListItem scaleDown"
                          onClick={() => setMenuOpen(false)}
                        >
                          <Divider />
                          <Link to="/login">
                            <p>Login</p>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Box>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
