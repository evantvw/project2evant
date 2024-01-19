import axios from "axios";
import "./Summary.css";
import React, { useState, useEffect } from "react";

const Summary = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (e) {
        console.log("error : ", e);
      }
    }
    getProducts();

    async function getCategory() {
      try {
        const res = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategory(res.data);
      } catch (e) {
        console.log("error : ", e);
      }
    }
    getCategory();
  }, []);

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
    <div className="summary-container sm:flex-col">
      <div className="card-container sm:w-full sm:mx-auto">
        <div className="label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h2 className="md:text-sm sm:text-xl">Products</h2>
        </div>

        <h2 className="font-extrabold text-5xl lg:text-3xl md:text-2xl truncate">{products.length}</h2>
      </div>

      <div className="card-container sm:w-full sm:mx-auto">
        <div className="label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>

          <h2 className="md:text-sm sm:text-xl">Categories</h2>
        </div>
        <h2 className="font-extrabold text-5xl lg:text-3xl md:text-2xl truncate">{category.length}</h2>
      </div>

      <div className="card-container sm:w-full sm:mx-auto">
        <div className="label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          <h2 className="md:text-sm sm:text-xl">Purchases</h2>
        </div>
        <h2 className="font-extrabold text-5xl lg:text-3xl md:text-2xl lg:truncate">{getPurchases()}</h2>
      </div>

      <div className="card-container mr-1 lg:mr-0 sm:w-full sm:mx-auto">
        <h2 className="md:text-xs sm:text-xl">Average Ratings</h2>
        <h2 className="font-extrabold text-5xl lg:text-3xl md:text-2xl lg:truncate">{getAverageRating()}</h2>
      </div>

      <div className="card-container w-full text-2xl lg:text-xl lg:w-1/2 lg:pb-12 md:text-md md:w-[55%] md:pb-8 sm:w-full sm:mx-auto">
        <div className="label items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 lg:hidden"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <h2 className="md:text-md sm:text-xl">Revenues</h2>
        </div>
        <h2 className="font-extrabold text-5xl lg:text-3xl md:text-2xl text-clip">{getRevenue()}</h2>
      </div>
    </div>
  );
};

export default Summary;
