import { Chart } from "react-google-charts";
import axios from "axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Piechart = () => {
  const [electronics, setElectronics] = useState(0);
  const [jewelery, setJewelery] = useState(0);
  const [menclothing, setMenclothing] = useState(0);
  const [womenclothing, setWomenclothing] = useState(0);
  // const [pending, setPending] = useState(false);

  useEffect(() => {
    async function countCategory() {
      // setPending(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        const datas = res.data;

        let electronicsCount = 0;
        let jeweleryCount = 0;
        let menclothingCount = 0;
        let womenclothingCount = 0;

        for (let product of datas) {
          if (product.category === "electronics") electronicsCount++;
          if (product.category === "jewelery") jeweleryCount++;
          if (product.category === "men's clothing") menclothingCount++;
          if (product.category === "women's clothing") womenclothingCount++;
        }

        setElectronics(electronicsCount);
        setJewelery(jeweleryCount);
        setMenclothing(menclothingCount);
        setWomenclothing(womenclothingCount);
        // setPending(false);
      } catch (e) {
        console.log("error : ", e);
        // setPending(true);
      }
    }
    countCategory();
  }, []);

  const data = [
    ["Category", "Amount"],
    ["electronics", electronics],
    ["jewelery", jewelery],
    ["men's clothing", menclothing],
    ["women's clothing", womenclothing],
  ];

  const options = {
    title: "Categories Ratio",
    backgroundColor: "#e5e7eb",
  };
  return (
    <>
      {electronics && jewelery && menclothing && womenclothing ? (
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
