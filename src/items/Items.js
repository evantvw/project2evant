import "./Items.css";
import { Link } from "react-router-dom";

const Items = ({ data }) => {
  return (
    <tr className="row">
      <Link to={`/products/${data.id}`}>
        <td className="data cursor-pointer">
          <img className="w-8" src={data.image} alt={data.title} />
        </td>
      </Link>
      <td className="data">
        <h3 className="text-balance w-96">{data.title}</h3>
      </td>
      <td className="data">
        <h3>{`$${data.price}`}</h3>
      </td>
      <td className="data">
        <h3>{data.category}</h3>
      </td>
      <td className="data space-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5 text-amber-400"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
            clipRule="evenodd"
          />
        </svg>

        <span className="text-center">
          <h3>{data.rating.rate}</h3>
        </span>
      </td>

      <td className="data">
        <h3 className="pl-2">{data.rating.count}</h3>
      </td>
    </tr>
  );
};

export default Items;
