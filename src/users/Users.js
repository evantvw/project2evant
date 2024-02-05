import "./Users.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useContext } from "react";
import UsersList from "../userslist/UsersList";
import { DarkMode } from "../context/DarkMode";
import OutlinedInput from "@mui/material/OutlinedInput";

const Users = ({ search, setOpen, open }) => {
  const [sort, setSort] = useState("?sort=asc");
  const { isDarkMode } = useContext(DarkMode);
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };

  console.log(open)
  return (
    <div className="container-users">
      <div className="head-users">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 hidden sm:block ${
            isDarkMode ? "text-gray-100" : ""
          }`}
          onClick={() => setOpen(true)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <h1 className={`title ${isDarkMode ? "text-gray-100" : ""}`}>Users</h1>

        <div className={`buttons ${open ? "hidden" : ""}`}>
          <Box sx={{ minWidth: 100 }} className="mt-7">
            <FormControl fullWidth>
              <InputLabel id="sort" sx={isDarkMode ? { color: "#f7fafc" } : {}}>
                Sort
              </InputLabel>
              <Select
                labelId="sort"
                id="sort-select"
                value={sort}
                label="Sort"
                onChange={handleChangeSort}
                input={<OutlinedInput label="Sort" />} // Use OutlinedInput
                sx={
                  isDarkMode
                    ? {
                        "& fieldset": { borderColor: "#f7fafc" },
                        color: "#f7fafc",
                      }
                    : {}
                } // Customize border color
              >
                <MenuItem value={"?sort=asc"}>Ascending</MenuItem>
                <MenuItem value={"?sort=desc"}>Descending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>

      <div className="lg:w-full overflow-x-auto">
        <UsersList search={search} sort={sort} />
      </div>
    </div>
  );
};

export default Users;
