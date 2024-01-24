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
      // get token
      const res = await axios.post("https://fakestoreapi.com/auth/login", user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      // get User ID
      const res2 = await axios.get("https://fakestoreapi.com/users");
      const users = res2.data;
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          // setUserID(users[i].id);
          localStorage.setItem("userID", users[i].id);
        }
      }

      setIsPending(false);
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      console.log(e.response.data);
      setIsError(true);
      setIsPending(false);
    }
  };

  return (
    <div className="container-login">
      <h1 className="logo-login">AdHub</h1>
      <h2 className="h2-login">Sign in to your account</h2>

      <div className="container-form-login">
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
            <label htmlFor="password" className="label-login">
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
  );
};

export default Login;
