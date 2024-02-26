import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Details.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  deleteProduct,
  fetchDetail,
  getSingleProduct,
  getSingleProductPending,
  updateProduct,
} from "../crudSlice";

const Details = () => {
  const { id } = useParams();
  const [update, setUpdate] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    price: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(getSingleProduct);
  const pending = useSelector(getSingleProductPending);

  useEffect(() => {
    async function getProduct() {
      try {
        dispatch(fetchDetail({ id }));
      } catch (e) {
        console.log("error : ", e);
      }
    }
    getProduct();
  }, [dispatch, id]);

  useEffect(() => {
    setFormData({
      title: product.title,
      category: product.category,
      description: product.description,
      image: product.image,
      price: product.price,
    });

    // Log the product whenever it changes
    console.log(product);
  }, [product]);

  const handleUpdate = async () => {
    setUpdate(false);

    try {
      dispatch(updateProduct({ id, formData }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteProduct({ id }));
      navigate("/products");
    } catch (e) {
      console.log(e);
    }
  };

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

      {pending ? (
        <div className="absolute left-1/2 top-1/2 lg:hidden">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
        <div className="content-details shadow-md">
          <img
            className="w-[20%] max-h-[50%]"
            src={product.image}
            alt={product.title}
          />
          <div className="description no-scrollbar">
            <h2 className="description-title">
              {update ? (
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full max-w-xs"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      title: e.target.value,
                    }))
                  }
                />
              ) : (
                product.title
              )}
            </h2>
            <h2 className="description-price">
              {update ? (
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full max-w-xs"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      price: e.target.value,
                    }))
                  }
                />
              ) : (
                `$${product.price}`
              )}
            </h2>
            <h2
              className={`description-rating ${
                product.rating && product.rating.rate >= 4
                  ? "text-green-500"
                  : "text-red-600"
              }`}
            >
              ⭐{product.rating && product.rating.rate}
            </h2>
            <h2 className="description-count">
              🛍️{product.rating && product.rating.count}
            </h2>
            <h2 className="description-category">
              {update ? (
                <input
                  type="text"
                  placeholder="Type here"
                  className="input w-full max-w-xs"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      category: e.target.value,
                    }))
                  }
                />
              ) : (
                product.category
              )}
            </h2>
            <h2 className="text-base">
              <span className="font-bold">Description : </span>
              {update ? (
                <textarea
                  className="textarea textarea-lg w-full"
                  placeholder="Bio"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              ) : (
                product.description
              )}
            </h2>

            <div className="action mt-5 w-1/2 ml-auto text-right lg:w-full md:flex">
              {update ? (
                <button
                  onClick={handleUpdate}
                  className="p-2 bg-indigo-600 hover:bg-gray-800 text-gray-100 font-bold rounded-lg mr-5 md:block"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setUpdate(true)}
                  className="p-2 bg-indigo-600 hover:bg-gray-800 text-gray-100 font-bold rounded-lg mr-5 md:block"
                >
                  Update
                </button>
              )}

              {update ? (
                <button
                  onClick={() => setUpdate(false)}
                  className="p-2 bg-indigo-600 hover:bg-gray-800 text-gray-100 font-bold rounded-lg mr-5 md:block"
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="p-2 bg-red-600 hover:bg-red-700 text-gray-100 font-bold rounded-lg md:block"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* mobile view */}
      {pending ? (
        <div className="hidden lg:block ml-36 mt-40">
          <CircularProgress size="1.5rem" color="inherit" />
        </div>
      ) : (
        <div className="content-details-mobile mb-7">
          <img
            className="w-[30%] mx-auto"
            src={product.image}
            alt={product.title}
          />
          <div className="description-mobile">
            <h2 className="description-title-mobile">{product.title}</h2>
            <h2 className="description-price-mobile">{`$${product.price}`}</h2>
            <h2
              className={`description-rating-mobile ${
                product.rating && product.rating.rate >= 4
                  ? "text-green-500"
                  : "text-red-600"
              }`}
            >
              ⭐{product.rating && product.rating.rate}
            </h2>
            <h2 className="description-count-mobile">
              🛍️{product.rating && product.rating.count}
            </h2>
            <h2 className="description-category-mobile">{product.category}</h2>
            <h2 className="text-balance md:text-sm">
              <span className="font-bold">Description : </span>
              {product.description}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
