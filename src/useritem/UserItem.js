// import { Link } from "react-router-dom";
const UserItem = ({ data }) => {
  return (
    <>
      <tr className="row lg:hidden">
        <td className="data">
          {/* <Link to={`/users/${data.id}`}> */}
          <h3>{data.id}</h3>
          {/* </Link> */}
        </td>
        <td className="data">
          <h3>{data.email}</h3>
        </td>
        <td className="data">
          <h3>{data.username}</h3>
        </td>
        <td className="data">
          <h3>{data.password}</h3>
        </td>
        <td className="data">
          <h3>{data.phone}</h3>
        </td>
      </tr>

      <div className="hidden lg:block mb-5 bg-gray-200 p-5 rounded-lg font-medium">
        <div className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-12 h-12"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>

          <div>
            <h3 className="text-xl font-bold">{data.username}</h3>
            <h4 className="text-sm">{data.email}</h4>
            <h4 className="text-sm">{data.phone}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserItem;
