import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
// 4TH: import from reducer and RTK
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import { snack, resetSnackbar } from "../features/global/globalSlice";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  // store dispatch
  const dispatch = useDispatch();
  const { user, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isError) {
      // notify error;
      dispatch(snack(message));
    }
  }, [isError, user, message, navigate, dispatch]);

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
    dispatch(resetSnackbar());

    // reset auth state first then try to login
    dispatch(reset());
    dispatch(login({ email, password }));
  };

  return (
    <>
      <section className="text-center mb-6">
        <div>
          <h3 className="headerTitle">LOGIN</h3>
          <p className="headerSubTitle">Welcome back</p>
        </div>
      </section>

      <section className="text-center">
        <form className="max-w-lg mx-auto" onSubmit={onSubmit}>
          <div className="formWrapper w-full">
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
                label="Email"
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
                  Password
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
                Log In
              </Button>
            </div>

            <div className="pt-6">
              <p>
                Not yet a member?{" "}
                <span className="text-blue-700">
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
