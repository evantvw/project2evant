import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      navigate("/home");
      setIsPending(false);
      localStorage.setItem("token", res.data.token);
    } catch (e) {
      console.log(e);
      setError(e.response.data);
      console.log(e.response.data);
      setIsError(true);
      setIsPending(false);
    }

    setPassword("");
    setUsername("");
  };

  return (
    <>
      {isPending ? (
        <div className="text-gray-200 text-3xl font-bold flex justify-center items-center h-screen">
          Loading...
        </div>
      ) : (
        <div className="container-login">
          <img
            className="mx-auto h-10 w-auto"
            src="\logo\technopedia.png"
            alt="technopedia"
          />
          <h2 className="h2">Sign in to your account</h2>

          <div className="mt-10 mx-auto w-full max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
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
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
              {isError && <div className="text-red-600 text-md">*{error}</div>}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
