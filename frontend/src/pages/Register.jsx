import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  // store dispatch
  const dispatch = useDispatch();

  // destructure values from the 'auth' global state
  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // update data onchange
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // on submit of form
  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(
      register({
        name,
        email,
        password,
      })
    );
  };

  return (
    <>
      <section className="text-center mb-6">
        <div>
          <h3 className="headerTitle">REGISTER</h3>
          <p className="headerSubTitle">You're almost there</p>
        </div>
      </section>

      <section className="text-center">
        <form className="max-w-lg mx-auto" onSubmit={onSubmit}>
          <div className="formWrapper w-full">
            <Box
              className="mb-4"
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <AccountCircleOutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <TextField
                required
                fullWidth
                id="name"
                label="Enter your name"
                name="name"
                value={name}
                variant="standard"
                color="primary"
                onChange={onChange}
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
                required
                fullWidth
                type="email"
                id="email"
                name="email"
                label="Enter your email address"
                value={email}
                variant="standard"
                color="primary"
                onChange={onChange}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <LockOutlinedIcon
                sx={{ color: "action.active", mr: 1, my: 0.5 }}
              />
              <FormControl variant="standard" className="w-full">
                <InputLabel htmlFor="standard-adornment-password">
                  Create a new password
                </InputLabel>
                <Input
                  required
                  fullWidth
                  id="password"
                  name="password"
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

            <div className="pt-9">
              <Button
                fullWidth
                disableElevation
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </div>

            <div className="pt-6">
              <p>
                Already a member?{" "}
                <span className="text-blue-700">
                  <Link to="/login">Log in</Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
