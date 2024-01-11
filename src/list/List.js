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
    <div>
      {products.length > 0 &&
        products.map((product) => (
          //   <div key={product.id}>
          //     <img src={product.image} alt={product.name} />
          //   </div>
          <Items key={product.id} data={product}/>
        ))}
    </div>
  );
};

export default List;
