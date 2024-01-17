import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Login = ({ setToken }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    const user = {
      username: username,
      password: password,
    };

    try {
      const res = await axios.post("https://fakestoreapi.com/auth/login", user);
      setToken(res.data.token);
      navigate("/");
      setIsPending(false);
      localStorage.setItem("token", res.data.token);
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      console.log(e.response.data);
      setIsError(true);
      setIsPending(false);
    }

    // setPassword("");
    // setUsername("");
  };

  return (
    <>
      <div className="container-login">
        <img
          className="mx-auto h-10 w-auto"
          src="\logo\technopedia.png"
          alt="technopedia"
        />
        <h2 className="h2">Sign in to your account</h2>

        <div className="container-form">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="label-login">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="label-login">
                  Password
                </label>
              </div>
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
              <button type="submit" className="submit bg-indigo-600">
                {isPending ? (
                  <CircularProgress size="1.5rem" color="inherit" />
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
            {isError && <div className="text-red-600 text-md">*{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
