import "./Summary.css";
import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  getCategories,
  getCategoryPending,
  getProductPending,
  getProducts,
} from "../fetchSlice";

const Summary = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  const categoryPending = useSelector(getCategoryPending);
  const products = useSelector(getProducts);
  const productPending = useSelector(getProductPending);

  useEffect(() => {
    // fetch Products
    const fetchingData = async () => {
      await dispatch(fetchData());
    };

    fetchingData();
  }, [dispatch]);

  function getPurchases() {
    let total = 0;
    for (let product of products) {
      total += product.rating.count;
    }

    return total;
  }

  function getAverageRating() {
    let total = products.length;
    let totalRating = 0;
    let avgRating = 0;
    for (let product of products) {
      totalRating += product.rating.rate;
    }

    avgRating = totalRating / total;

    return avgRating.toFixed(2);
  }

  function getRevenue() {
    let total = 0;
    for (let product of products) {
      total += product.rating.count * product.price;
    }

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <div className="container-summary">
      <div className="container-card-summary">
        <div className="label-summary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 min-w-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h2 className="label-h2-summary">Products</h2>
        </div>
        <h2 className="value-h2-summary">
          {productPending ? (
            <CircularProgress size="1.5rem" color="inherit" />
          ) : (
            products.length
          )}
        </h2>
      </div>

      <div className="container-card-summary">
        <div className="label-summary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 min-w-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
          <h2 className="label-h2-summary">Categories</h2>
        </div>
        <h2 className="value-h2-summary">
          {categoryPending ? (
            <CircularProgress size="1.5rem" color="inherit" />
          ) : (
            categories.length
          )}
        </h2>
      </div>

      <div className="container-card-summary">
        <div className="label-summary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 min-w-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <h2 className="label-h2-summary">Purchases</h2>
        </div>
        <h2 className="value-h2-summary">
          {productPending ? (
            <CircularProgress size="1.5rem" color="inherit" />
          ) : (
            getPurchases()
          )}
        </h2>
      </div>

      <div className="container-card-summary mr-1 lg:mr-0">
        <div className="label-summary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 min-w-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>

          <h2 className="label-h2-summary"> AVG Ratings</h2>
        </div>
        <h2 className="value-h2-summary">
          {productPending ? (
            <CircularProgress size="1.5rem" color="inherit" />
          ) : (
            getAverageRating()
          )}
        </h2>
      </div>

      <div className="container-card-summary w-full container-card-revenue">
        <div className="label-summary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 min-w-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h2 className="label-h2-summary">Revenues</h2>
        </div>
        <h2 className="value-h2-summary">
          {productPending ? (
            <CircularProgress size="1.5rem" color="inherit" />
          ) : (
            getRevenue()
          )}
        </h2>
      </div>
    </div>
  );
};

export default Summary;
