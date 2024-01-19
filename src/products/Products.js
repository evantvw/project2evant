import { useState } from "react";
import List from "../list/List";
import "./Products.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

const Products = ({ search, setOpen, open }) => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("?sort=asc");
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="container-products lg:w-4/6 sm:w-full sm:p-0 ">
      <div className="head-products">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hidden sm:block"
          onClick={() => setOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <h1 className="text-5xl font-bold md:text-center">Products</h1>

        <div className={`buttons items-center ${open? "hidden":""}`}>
          <Link className="button-add lg:w-auto md:py-2" to="/add">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 pr-1 md:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="md:text-sm">Add Product</span>
          </Link>

          <Box sx={{ minWidth: 100 }} className="mt-7">
            <FormControl fullWidth>
              <InputLabel id="filter">Filter</InputLabel>
              <Select
                labelId="filter"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={handleChangeFilter}
              >
                <MenuItem value={""}>default</MenuItem>
                <MenuItem value={"category/men's clothing"}>
                  men's clothing
                </MenuItem>
                <MenuItem value={"category/women's clothing"}>
                  women's clothing
                </MenuItem>
                <MenuItem value={"category/jewelery"}>jewelery</MenuItem>
                <MenuItem value={"category/electronics"}>electronics</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 100 }} className="mt-7">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleChangeSort}
              >
                <MenuItem value={"?sort=asc"}>Ascending</MenuItem>
                <MenuItem value={"?sort=desc"}>Descending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="lg:w-full">
        <List search={search} filter={filter} sort={sort} />
      </div>
    </div>
  );
};

export default Products;
