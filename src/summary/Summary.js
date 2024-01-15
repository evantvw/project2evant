import axios from "axios";
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

    return total;
  }

  return (
    <div className="flex flex-wrap gap-5 mt-5">
      <div className="border rounded-xl bg-gray-200 text-gray-800 text-xl p-5 w-1/5 h-1/5 ml-5 text-xl text-center flex flex-col gap-3 mr-auto">
        <h2>Total Products</h2>
        <h2 className="font-extrabold text-5xl">{products.length}</h2>
      </div>
      <div className="border rounded-xl bg-gray-200 text-gray-800 text-xl p-5 w-1/5 h-1/5 ml-5 text-xl text-center flex flex-col gap-3 mr-auto">
        <h2>Total Categories</h2>
        <h2 className="font-extrabold text-5xl">{category.length}</h2>
      </div>
      <div className="border rounded-xl bg-gray-200 text-gray-800 text-xl p-5 w-1/5 h-1/5 ml-5 text-xl text-center flex flex-col gap-3 mr-auto">
        <h2>Total Purchases</h2>
        <h2 className="font-extrabold text-5xl">{getPurchases()}</h2>
      </div>
      <div className="border rounded-xl bg-gray-200 text-gray-800 text-xl p-5 w-1/5 h-1/5 ml-5 text-xl text-center flex flex-col gap-3 ">
        <h2>Average Ratings</h2>
        <h2 className="font-extrabold text-5xl">{getAverageRating()}</h2>
      </div>
      <div className="border rounded-xl bg-gray-200 text-gray-800 text-2xl p-5 w-full h-1/5 ml-5 text-xl text-center flex flex-col gap-3 ">
        <h2>Total Revenue</h2>
        <h2 className="font-extrabold text-5xl">${getRevenue()}</h2>
      </div>
    </div>
  );
};

export default Summary;
