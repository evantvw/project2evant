import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Details.css";

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
    <div className="w-3/4 mx-auto md:w-1/2 sm:w-5/6 sm:min-h-screen">
      <button onClick={() => navigate(-1)} className="btn-back py-2">
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
      <div className="container-details w-5/6 h-4/6 leading-7 md:w-full sm:hidden">
        <img className="w-[25%]" src={product.image} alt={product.title} />
        <div className="description">
          <h2 className="font-bold text-3xl mb-28 lg:mb-12 md:text-lg md:mb-3">
            {product.title}
          </h2>
          <h2 className="text-xl mb-2">{`$${product.price}`}</h2>
          <h2 className="font-extrabold text-indigo-600 sm:text-sm">
            {product.category}
          </h2>
          <h2 className="text-balance md:text-sm">
            <span className="font-bold">Description : </span>
            {product.description}
          </h2>
        </div>
      </div>
      <div className="hidden sm:block bg-white p-3 rounded-xl mt-8">
        <img className="w-[30%] mx-auto" src={product.image} alt={product.title} />
        <div className="description">
          <h2 className="font-bold text-3xl mb-28 lg:mb-12 md:text-lg md:mb-3">
            {product.title}
          </h2>
          <h2 className="text-xl mb-2">{`$${product.price}`}</h2>
          <h2 className="font-extrabold text-indigo-600 sm:text-sm">
            {product.category}
          </h2>
          <h2 className="text-balance md:text-sm">
            <span className="font-bold">Description : </span>
            {product.description}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Details;
