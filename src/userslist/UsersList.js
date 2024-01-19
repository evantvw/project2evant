import axios from "axios";
import { useEffect, useState } from "react";
import UserItem from "../useritem/UserItem";

const UsersList = ({ search, sort }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`https://fakestoreapi.com/users${sort}`);
        setUsers(res.data);
      } catch (e) {
        console.log("error : ", e);
      }
    };

    getUsers();
  }, [sort]);

  return (
    <>
      <table className="ml-5 lg:hidden">
        <thead className="text-gray-600">
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
        <tbody className="text-gray-600">
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
    </>
  );
};

export default UsersList;
