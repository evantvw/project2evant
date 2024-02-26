import { useContext, useEffect, useState } from "react";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { DarkMode } from "../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../authSlice";
import { openSidebar } from "../sideBarSlice";
import {
  deleteUser,
  fetchDetail,
  getSingleUser,
  getSingleUserPending,
  updateUser,
} from "../crudSlice";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
  });
  const id = localStorage.getItem("userID");
  const { isDarkMode } = useContext(DarkMode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getSingleUser);
  const pending = useSelector(getSingleUserPending);

  useEffect(() => {
    const getCurrUser = async () => {
      try {
        dispatch(fetchDetail({ id }));
      } catch (e) {
        console.log(e);
      }
    };

    getCurrUser();
  }, [id, dispatch]);

  useEffect(() => {
    setFormData({
      firstName: user.name?.firstname || "",
      lastName: user.name?.lastname || "",
      email: user.email || "",
      username: user.username || "",
    });

    // Log the user whenever it changes
    console.log(user);
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUser({ id, formData }));
      navigate("/");
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteUser({ id }));
      dispatch(logout());
      navigate("/login");
    } catch (e) {
      console.log("error", e);
    }
  };

  return (
    <>
      {pending ? (
        <div className="absolute left-1/2 top-1/2 lg:hidden">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
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
              onClick={() => dispatch(openSidebar())}
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
                className={`text-xl font-bold ${
                  isDarkMode ? "text-gray-100" : ""
                }`}
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
                  <label
                    htmlFor="firstname"
                    className={`block ${isDarkMode ? "text-gray-100" : ""}`}
                  >
                    First name
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="lastname"
                    className={`block ${isDarkMode ? "text-gray-100" : ""}`}
                  >
                    Last name
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="email-settings">
                <label
                  htmlFor="email"
                  className={`block ${isDarkMode ? "text-gray-100" : ""}`}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="username-settings">
                <label
                  htmlFor="username"
                  className={`block ${isDarkMode ? "text-gray-100" : ""}`}
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      username: e.target.value,
                    }))
                  }
                />
              </div>

              <button className="btn-save">save</button>
            </form>
          </div>

          <div className="delete-account mt-10 xl:gap-10 md:flex-col">
            <div className="w-[40%] md:w-full">
              <h2
                className={`text-xl font-bold ${
                  isDarkMode ? "text-gray-100" : ""
                }`}
              >
                Delete account
              </h2>
              <p
                className={`w-3/4 text-justify sm:w-full ${
                  isDarkMode ? "text-gray-100" : ""
                }`}
              >
                You can delete your account here. This action is not reversible.
                All information related to this account will be deleted
                permanently.
              </p>
            </div>

            <div className="w-full">
              <button
                className="btn-delete"
                onClick={() =>
                  document.getElementById("delete_modal").showModal()
                }
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
                <form onSubmit={handleDelete} method="dialog">
                  {/* if there is a button, it will close the modal */}
                  <button
                    className="btn bg-red-500 text-gray-100 hover:bg-red-600 mr-5"
                    type="submit"
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
      )}
    </>
  );
};

export default Settings;
