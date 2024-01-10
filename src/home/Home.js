import axios from "axios";
import { useEffect, useState } from "react";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (e) {
        console.log("error", e);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      {products.length > 0 &&
        products.map((product) => (
          <div key={product.id}>
            <img src={product.image} alt={product.name} />
          </div>
        ))}
    </div>
  );
};

export default Home;
