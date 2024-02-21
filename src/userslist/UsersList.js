import { useContext, useEffect } from "react";
import UserItem from "../useritem/UserItem";
import { DarkMode } from "../context/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getUserPending, getUsers } from "../fetchSlice";
import CircularProgress from "@mui/material/CircularProgress";

const UsersList = ({ search, sort }) => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);
  const userPending = useSelector(getUserPending);
  const { isDarkMode } = useContext(DarkMode);
  useEffect(() => {
    const getUsers = async () => {
      try {
        await dispatch(fetchData({ sort }));
      } catch (e) {
        console.log("error : ", e);
      }
    };

    getUsers();
  }, [sort, dispatch]);

  return (
    <>
      {userPending ? (
        <div className="absolute left-1/2 top-1/2 lg:hidden">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
        <table className="ml-5 lg:hidden">
          <thead
            className={`${isDarkMode ? "text-gray-100" : "text-gray-600"}`}
          >
            {users.filter((user) =>
              user.username.toLowerCase().includes(search.trim().toLowerCase())
            ).length > 0 && (
              <tr className="border-b-2">
                <th scope="col" className="py-2">
                  ID
                </th>
                <th scope="col" className="py-2">
                  Email
                </th>
                <th scope="col" className="py-2">
                  Username
                </th>
                <th scope="col" className="py-2">
                  Password
                </th>
                <th scope="col" className="py-2 pl-2">
                  Phone Number
                </th>
              </tr>
            )}
          </thead>
          <tbody
            className={`${isDarkMode ? "text-gray-100" : "text-gray-600"}`}
          >
            {users.length > 0 &&
              users
                .filter((user) =>
                  search.trim().toLowerCase() === ""
                    ? user
                    : user.username.toLowerCase().includes(search.toLowerCase())
                )
                .map((user) => <UserItem key={user.id} data={user} />)}
          </tbody>
        </table>
      )}

      {/* mobile view */}
      {userPending ? (
        <div className="hidden lg:block ml-36 mt-40">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
        <div className="hidden lg:block md:ml-5">
          {users.length > 0 &&
            users
              .filter((user) =>
                search.trim().toLowerCase() === ""
                  ? user
                  : user.username.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => <UserItem key={user.id} data={user} />)}
        </div>
      )}
    </>
  );
};

export default UsersList;
