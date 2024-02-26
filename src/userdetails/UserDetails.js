import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./UserDetails.css";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import {
  fetchDetail,
  getSingleUser,
  getSingleUserPending,
} from "../crudSlice";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(getSingleUser);
  const pending = useSelector(getSingleUserPending);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(fetchDetail({ id }));
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, [dispatch, id]);

  return (
    <div className="container-user-details">
      <button onClick={() => navigate(-1)} className="btn-back">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 pr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
        <span>Back</span>
      </button>

      {pending ? (
        <div className="absolute left-1/2 top-1/2 lg:left-[60%] md:left-[50%]">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
        <div className="content-user-details">
          <div className="photo-profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
            <div className="description-user-details">
              <h2 className="font-bold text-2xl">
                <span>{user.name && user.name.firstname}</span>{" "}
                <span>{user.name && user.name.lastname}</span>
              </h2>
              <h2 className="text-lg text-gray-400">-</h2>
              <h2 className="text-lg text-gray-400">
                <span>{user.address && user.address.street}</span>,{" "}
                <span>{user.address && user.address.city}</span>
              </h2>
            </div>
          </div>

          <div className="personal-information">
            <div className="mb-5 text-xl font-bold">Personal Information</div>
            <div className="personal-information-description">
              <div className="row1">
                <h2 className="text-lg">First Name</h2>
                <h2 className="mb-5 font-bold">
                  {user.name && user.name.firstname}
                </h2>
                <h2 className="text-lg">Email address</h2>
                <h2 className="mb-5 font-bold">{user.email}</h2>
                <h2 className="text-lg">Bio</h2>
                <h2 className="font-bold mb-5">-</h2>
              </div>

              <div className="row2">
                <h2 className="text-lg">Last Name</h2>
                <h2 className="mb-5 font-bold">
                  {user.name && user.name.lastname}
                </h2>
                <h2 className="text-lg">Phone</h2>
                <h2 className="font-bold mb-5">{user.phone}</h2>
              </div>
            </div>
          </div>

          <div className="address mb-5">
            <div className="mb-5 text-xl font-bold">Address</div>
            <div className="address-description ">
              <div className="row1">
                <h2 className="text-lg">Street</h2>
                <h2 className="mb-5 font-bold">
                  {user.address && user.address.street}
                </h2>
                <h2 className="text-lg">Zipcode</h2>
                <h2 className="mb-5 font-bold">
                  {user.address && user.address.zipcode}
                </h2>
              </div>

              <div className="row2">
                <h2 className="text-lg">City</h2>
                <h2 className="mb-5 font-bold">
                  {user.address && user.address.city}
                </h2>
                <h2 className="text-lg">Number</h2>
                <h2 className="font-bold">
                  {user.address && user.address.number}
                </h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
