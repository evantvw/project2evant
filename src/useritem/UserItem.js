// import { Link } from "react-router-dom";

const UserItem = ({ data }) => {
  return (
    <tr className="row">
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
  );
};

export default UserItem;
