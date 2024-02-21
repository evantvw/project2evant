import { useContext, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { DarkMode } from "../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchToken,
  fetchUserData,
  loginFailure,
  userInfo,
} from "../authSlice";
import { getIsError } from "../authSlice";

const Login = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);
  const isError = useSelector(getIsError);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const user = {
      username: username,
      password: password,
    };

    try {
      // get token
      await dispatch(fetchToken(user));
      await dispatch(userInfo({ username, password }));

      // get User ID
      await dispatch(fetchUserData());

      setIsPending(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      dispatch(loginFailure());
      setIsPending(false);
    }
  };

  return (
    <div
      className={`absolute h-screen w-full ${isDarkMode ? "bg-slate-800" : ""}`}
    >
      <button
        className="absolute p-3 bg-indigo-800 rounded-2xl top-3 right-6"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
      <div className="container-login">
        <h1 className="logo-login">AdHub</h1>
        <h2 className={`h2-login ${isDarkMode ? "text-gray-100" : ""}`}>
          Sign in to your account
        </h2>

        <div className="container-form-login">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className={`label-login ${isDarkMode ? "text-gray-100" : ""}`}
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="input-login"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className={`label-login ${isDarkMode ? "text-gray-100" : ""}`}
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="input-login"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn-submit-login bg-indigo-600">
                {isPending ? (
                  <CircularProgress size="1.5rem" color="inherit" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
            {isError && <div className="error-msg-login">*{error}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
