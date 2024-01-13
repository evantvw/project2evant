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
      <h2>{product.id}</h2>
      <h2>{product.title}</h2>
      <h2>{product.price}</h2>
      <h2>{product.category}</h2>
      <h2>{product.description}</h2>
      <img className="w-1/4" src={product.image} alt={product.title} />
    </div>
  );
};

export default Details;
