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

  return <div></div>;
};

export default Summary;
