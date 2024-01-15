import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(res.data);
      } catch (e) {
        console.log("error : ", e);
      }
    }
    getProduct();
  }, [id]);

  console.log(product);

  return (
    <div className="w-3/4 mx-auto">
      <button onClick={() => navigate(-1)} className="button">
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
      <div className="flex items-center mt-8 mx-auto gap-10 leading-10 border-2 p-10 rounded-xl border-indigo-600">
        <img className="w-1/4" src={product.image} alt={product.title} />
        <div className="description pl-3">
          <h2>
            <span className="font-medium">ID : </span>
            {product.id}
          </h2>
          <h2>
            <span className="font-medium">TITLE : </span>
            {product.title}
          </h2>
          <h2>
            <span className="font-medium">PRICE : </span>
            {`$${product.price}`}
          </h2>
          <h2>
            <span className="font-medium">CATEGORY : </span>
            {product.category}
          </h2>
          <h2 className="text-balance">
            <div className="font-medium">DESCRIPTION : </div>
            {product.description}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Details;
