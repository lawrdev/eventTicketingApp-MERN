// import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";

export function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <div className="mt-2 mb-6 select-none">
        <div className="!bg-white !text-gray-700">
          <Toolbar>
            {/* <BookOnlineSharpIcon fontSize="large" /> */}
            <div style={{ flexGrow: 1 }}>
              <div
                onClick={() => navigate("/")}
                className="flex items-center cursor-pointer w-fit"
              >
                <InterestsOutlinedIcon fontSize="large" />
                <h3 className="font-semibold ml-2 tracking-wide whitespace-nowrap">
                  Tickets App
                </h3>
              </div>
            </div>

            <div className="flex gap-1">
              <Button
                disableElevation
                onClick={() => navigate("/login")}
                sx={{ textTransform: "none" }}
                color="primary"
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
          </Toolbar>
        </div>

        <Divider />
      </div>
    </header>
  );
}
