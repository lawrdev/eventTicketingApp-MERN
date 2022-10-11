import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import demoIMG from "../assets/img/demo.jpg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";

export function Header() {
  const [anchor, setAnchor] = useState(null);

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

  return (
    <header>
      <div className="mt-2 mb-2 select-none">
        <div className=" !text-gray-700">
          <Toolbar>
            <div style={{ flexGrow: 1 }}>
              <div
                onClick={() => navigate("/")}
                className="flex items-center cursor-pointer w-fit"
              >
                <InterestsOutlinedIcon fontSize="large" />
                <h3 className="font-bold ml-2 tracking-wide whitespace-nowrap">
                  Tickets App
                </h3>
              </div>
            </div>

            {!user ? (
              <div className="flex gap-1">
                <Button
                  // disableElevation
                  onClick={() => navigate("/login")}
                  sx={{ textTransform: "none" }}
                  color="primary"
                  variant="outlined"
                >
                  Login
                </Button>
                <Button
                  disableElevation
                  onClick={() => navigate("/register")}
                  sx={{ textTransform: "none" }}
                  startIcon={<PersonAddAlt1OutlinedIcon />}
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
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
                  <MenuItem onClick={handleClose}>
                    <p className="text-center">Profile</p>
                  </MenuItem>
                  <MenuItem onClick={onLogout}>
                    <p className="text-center">Logout</p>
                  </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </div>

        <Divider />
      </div>
    </header>
  );
}
