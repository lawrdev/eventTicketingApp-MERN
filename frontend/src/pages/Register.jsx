import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: " ",
    email: "",
    password: "",
    // for password checks
    password2: "",
  });
  const { name, email, password, password2 } = formData;

  const onChange = () => {
    console.log("hey");
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <section className="text-center">
        <div>
          <h3 className="font-semibold text-lg">REGISTER</h3>
          <p className="text-gray-900">You're almost there...</p>
        </div>
      </section>

      <section className="text-center my-4">
        <form className="max-w-lg mx-auto">
          <div className=" w-full">
            <Box
              className="mb-4"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <AccountCircleOutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                id="name"
                label="Name"
                variant="standard"
                color="primary"
              />
            </Box>

            <Box
              className="mb-4"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <AlternateEmailOutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                fullWidth
                type="email"
                id="email"
                label="Email"
                variant="standard"
                color="primary"
              />
            </Box>

            <Box
              className="mb-4"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <LockOutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <FormControl variant="standard" className="w-full">
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  fullWidth
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
          </div>
        </form>
      </section>
    </>
  );
}
