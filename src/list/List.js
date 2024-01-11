import axios from "axios";
import { useEffect, useState } from "react";
import "./List.css";
import Items from "../items/Items";

const List = () => {
  const [products, setProducts] = useState([]);

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
  }, []);

  return (
    <div className="p-7">
      <div className="head p-5 text-gray-800">
        <h1 className="text-5xl font-bold ">Dashboard</h1>
        <button className="py-2 px-3 border rounded-lg mt-8 bg-indigo-600 hover:bg-gray-800 text-gray-200 font-medium flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <span>Add Product</span>
        </button>
      </div>

      {/* <ul className="p-5">
        <div className="flex border border-gray-300 px-4 py-2 gap-5 justify-around font-bold text-lg bg-indigo-100 text-gray-600">
          <div>Product</div>
          <div className="flex gap-5 justify-center w-28">
            <div>Price</div>
            <div>category</div>
          </div>
        </div>
        {products.length > 0 &&
          products.map((product) => <Items key={product.id} data={product} />)}
      </ul> */}
      <table>
        <thead className="text-gray-600">
          <tr className="border-b-2">
            <th scope="col" colSpan={2} className="py-2">Product</th>
            <th scope="col" className="py-2">Price</th>
            <th scope="col" className="py-2">Category</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {products.length > 0 &&
            products.map((product) => (
              <Items key={product.id} data={product} />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
