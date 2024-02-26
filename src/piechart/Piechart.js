import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, getProducts } from "../fetchSlice";

const Piechart = () => {
  const [categories, setCategories] = useState({
    electronics: 0,
    jewelery: 0,
    menclothing: 0,
    womenclothing: 0,
  });
  const dispatch = useDispatch();
  const products = useSelector(getProducts);

  useEffect(() => {
    async function countCategory() {
      try {
        await dispatch(fetchData());
      } catch (e) {
        console.log("error : ", e);
      }
    }
    countCategory();
  }, [dispatch]);

  useEffect(() => {
    let electronicsCount = 0;
    let jeweleryCount = 0;
    let menclothingCount = 0;
    let womenclothingCount = 0;

    for (let product of products) {
      if (product.category === "electronics") electronicsCount++;
      if (product.category === "jewelery") jeweleryCount++;
      if (product.category === "men's clothing") menclothingCount++;
      if (product.category === "women's clothing") womenclothingCount++;
    }

    setCategories((prevData) => ({
      ...prevData,
      electronics: electronicsCount,
      jewelery: jeweleryCount,
      menclothing: menclothingCount,
      womenclothing: womenclothingCount,
    }));
  }, [products]);

  const data = [
    ["Category", "Amount"],
    ["electronics", categories.electronics],
    ["jewelery", categories.jewelery],
    ["men's clothing", categories.menclothing],
    ["women's clothing", categories.womenclothing],
  ];

  const options = {
    title: "Categories Ratio",
    backgroundColor: "#e5e7eb",
  };
  return (
    <>
      {categories.electronics &&
      categories.jewelery &&
      categories.menclothing &&
      categories.womenclothing ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      ) : (
        <CircularProgress size="1.5rem" color="inherit" />
      )}
    </>
  );
};

export default Piechart;
