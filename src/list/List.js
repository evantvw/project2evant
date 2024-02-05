import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Items from "../items/Items";
import { DarkMode } from "../context/DarkMode";

const List = ({ search, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const { isDarkMode } = useContext(DarkMode);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${filter}${sort}`
        );
        setProducts(res.data);
      } catch (e) {
        console.log("error : ", e);
      }
    }
    getProducts();
  }, [filter, sort]);

  return (
    <>
      <table className="ml-5 lg:hidden">
        <thead className={`${isDarkMode ? "text-gray-100" : "text-gray-600"}`}>
          {products.filter((product) =>
            product.title.toLowerCase().includes(search.trim().toLowerCase())
          ).length > 0 && (
            <tr className="border-b-2">
              <th scope="col" colSpan={2} className="py-2">
                Product
              </th>
              <th scope="col" className="py-2">
                Price
              </th>
              <th scope="col" className="py-2">
                Category
              </th>
              <th scope="col" className="py-2">
                Ratings
              </th>
              <th scope="col" className="py-2 pl-2">
                Sold
              </th>
            </tr>
          )}
        </thead>

        <tbody className={`${isDarkMode ? "text-gray-100" : "text-gray-600"}`}>
          {products.length > 0 &&
            products
              .filter((product) =>
                search.trim().toLowerCase() === ""
                  ? product
                  : product.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((product) => <Items key={product.id} data={product} />)}
        </tbody>
      </table>

      {/* mobile view */}
      <div className="hidden lg:block ml-5">
        {products.length > 0 &&
          products
            .filter((product) =>
              search.trim().toLowerCase() === ""
                ? product
                : product.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => <Items key={product.id} data={product} />)}
      </div>
    </>
  );
};

export default List;
