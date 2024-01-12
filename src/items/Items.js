import "./Items.css";
import { Link } from "react-router-dom";

const Items = ({ data }) => {
  return (
    <tr className="row">
      <Link to={`/products/${data.id}`} >
        <td className="data cursor-pointer">
          <img className="w-8" src={data.image} alt={data.title} />
        </td>
      </Link>
      <td className="data">
        <h3>{data.title}</h3>
      </td>
      <td className="data">
        <h3>{`$${data.price}`}</h3>
      </td>
      <td className="data">
        <h3>{data.category}</h3>
      </td>
    </tr>
  );
};

export default Items;
