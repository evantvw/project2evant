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
    <div className="container-details">
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

      <div className="content-details">
        <img
          className="w-[20%] max-h-[50%]"
          src={product.image}
          alt={product.title}
        />
        <div className="description no-scrollbar">
          <h2 className="description-title">{product.title}</h2>
          <h2 className="description-price">{`$${product.price}`}</h2>
          <h2 className="description-category">{product.category}</h2>
          <h2 className="text-base">
            <span className="font-bold">Description : </span>
            {product.description}
          </h2>
        </div>
      </div>

      {/* mobile view */}
      <div className="content-details-mobile">
        <img
          className="w-[30%] mx-auto"
          src={product.image}
          alt={product.title}
        />
        <div className="description-mobile">
          <h2 className="description-title-mobile">{product.title}</h2>
          <h2 className="description-price-mobile">{`$${product.price}`}</h2>
          <h2 className="description-category-mobile">{product.category}</h2>
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
