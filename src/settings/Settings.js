import { useContext, useEffect, useState } from "react";
import "./Settings.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { DarkMode } from "../context/DarkMode";

const Settings = ({ setOpen, setToken }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pending, setPending] = useState(false);
  const userID = localStorage.getItem("userID");
  const { isDarkMode } = useContext(DarkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrUser = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/users/${userID}`);
        // setCurrUser(res.data);
        const userData = res.data;
        setFirstName(userData.name.firstname);
        setLastName(userData.name.lastname);
        setEmail(userData.email);
        setUsername(userData.username);
        console.log(res.data);
      } catch (e) {
        console.log(e);
      }
    };

    getCurrUser();
  }, [userID]);

  const handleUpdate = async (e) => {
    setPending(true);
    e.preventDefault();
    try {
      const updateRes = await axios.put(
        `https://fakestoreapi.com/users/${userID}`,
        { firstName, lastName, email, username }
      );
      console.log(updateRes);
      setPending(false);
      navigate("/");
    } catch (e) {
      console.log("error", e);
      setPending(false);
    }
  };

  const handleDelete = async () => {
    try {
      const deleteRes = await axios.delete(
        `https://fakestoreapi.com/users/${userID}`
      );
      console.log(deleteRes);
      localStorage.removeItem("token");
      setToken("");
      navigate("/login");
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <div className="container-settings">
      <div className="head-settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 hidden sm:block ${
            isDarkMode ? "text-gray-100" : ""
          }`}
          onClick={() => setOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <h1 className={`title ${isDarkMode ? "text-gray-100" : ""}`}>
          Settings
        </h1>
      </div>

      <div className="personal-account xl:gap-10 md:flex-col">
        <div className="w-[40%] md:w-full">
          <h2
            className={`text-xl font-bold ${isDarkMode ? "text-gray-100" : ""}`}
          >
            Personal Information
          </h2>
          <p
            className={`w-3/4 text-justify sm:w-full ${
              isDarkMode ? "text-gray-100" : ""
            }`}
          >
            You can update your personal information here, click save after
            updating your information
          </p>
        </div>
        <form className="w-full" onSubmit={handleUpdate}>
          <div className="name-settings">
            <div className="w-full">
              <label htmlFor="firstname" className={`block ${isDarkMode? "text-gray-100" : ""}`}>
                First name
              </label>
              <input
                id="firstname"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label htmlFor="lastname" className={`block ${isDarkMode? "text-gray-100" : ""}`}>
                Last name
              </label>
              <input
                id="lastname"
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="email-settings">
            <label htmlFor="email" className={`block ${isDarkMode? "text-gray-100" : ""}`}>
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="username-settings">
            <label htmlFor="username" className={`block ${isDarkMode? "text-gray-100" : ""}`}>
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button className="btn-save">
            {pending ? (
              <CircularProgress size="1rem" color="inherit" />
            ) : (
              "save"
            )}
          </button>
        </form>
      </div>

      <div className="delete-account mt-10 xl:gap-10 md:flex-col">
        <div className="w-[40%] md:w-full">
          <h2
            className={`text-xl font-bold ${isDarkMode ? "text-gray-100" : ""}`}
          >
            Delete account
          </h2>
          <p
            className={`w-3/4 text-justify sm:w-full ${
              isDarkMode ? "text-gray-100" : ""
            }`}
          >
            You can delete your account here. This action is not reversible. All
            information related to this account will be deleted permanently.
          </p>
        </div>

        <div className="w-full">
          <button
            className="btn-delete"
            onClick={() => document.getElementById("delete_modal").showModal()}
          >
            Yes, delete my account
          </button>
        </div>
      </div>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box w-1/4 max-w-5xl">
          <h3 className="font-bold text-lg">
            Warning, this action cannot be reversed
          </h3>
          <p className="py-4">Are you sure you want to continue?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button
                className="btn bg-red-500 text-gray-100 hover:bg-red-600 mr-5"
                onClick={handleDelete}
              >
                delete
              </button>
              <button className="btn text-gray-100 bg-indigo-600 hover:bg-gray-800">
                cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Settings;
