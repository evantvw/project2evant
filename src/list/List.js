import axios from "axios";
import { useEffect, useState } from "react";
import Items from "../items/Items";

const List = ({ search }) => {
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
    <table>
      <thead className="text-gray-600">
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
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {products.length > 0 &&
          products
            .filter((product) =>
              search.toLowerCase() === ""
                ? product
                : product.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => <Items key={product.id} data={product} />)}
      </tbody>
    </table>
  );
};

export default List;
