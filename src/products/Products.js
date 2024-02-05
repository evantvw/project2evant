import { useState, useContext } from "react";
import List from "../list/List";
import "./Products.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import { DarkMode } from "../context/DarkMode";
import OutlinedInput from "@mui/material/OutlinedInput";

const Products = ({ search, setOpen, open }) => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("?sort=asc");
  const { isDarkMode } = useContext(DarkMode);
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  
  return (
    <div className="container-products">
      <div className="head-products">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 hidden sm:block ${isDarkMode? "text-gray-100" : ""}`}
          onClick={() => setOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <h1 className={`title ${isDarkMode ? "text-gray-100" : ""}`}>
          Products
        </h1>

        <div className={`buttons ${open ? "hidden" : ""}`}>
          <Link className="btn-add-products" to="/products/add">
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
            <span>Add Product</span>
          </Link>

          <Box sx={{ minWidth: 80 }} className="mt-7">
            <FormControl fullWidth>
              <InputLabel
                id="filter"
                sx={isDarkMode ? { color: "#f7fafc" } : {}}
              >
                Filter
              </InputLabel>
              <Select
                labelId="filter"
                id="filter-select"
                value={filter}
                label="Filter"
                input={<OutlinedInput label="filter" />} // Use OutlinedInput
                sx={
                  isDarkMode
                    ? {
                        "& fieldset": { borderColor: "#f7fafc" },
                        color: "#f7fafc",
                      }
                    : {}
                } // Customize border color
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

          <Box sx={{ minWidth: 80 }} className="mt-7">
            <FormControl fullWidth>
              <InputLabel id="sort" sx={isDarkMode ? { color: "#f7fafc" } : {}}>
                Sort
              </InputLabel>
              <Select
                labelId="sort"
                id="sort-select"
                value={sort}
                label="Sort"
                input={<OutlinedInput label="Sort" />} // Use OutlinedInput
                sx={
                  isDarkMode
                    ? {
                        "& fieldset": { borderColor: "#f7fafc" },
                        color: "#f7fafc",
                      }
                    : {}
                } // Customize border color
                onChange={handleChangeSort}
              >
                <MenuItem value={"?sort=asc"}>Ascending</MenuItem>
                <MenuItem value={"?sort=desc"}>Descending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className="lg:w-full overflow-x-auto">
        <List search={search} filter={filter} sort={sort} />
      </div>
    </div>
  );
};

export default Products;
