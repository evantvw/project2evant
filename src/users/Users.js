import "./Users.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import UsersList from "../userslist/UsersList";

const Users = ({ search, setOpen, open }) => {
  const [sort, setSort] = useState("?sort=asc");
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  return (
    <div className="container-users sm:w-full ">
      <div className="head-users">
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
        <h1 className="text-5xl font-bold sm:text-center">Users</h1>

        <div className={`buttons items-center ${open? "hidden" : ""}`}>
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
      <UsersList search={search} sort={sort} />
    </div>
  );
};

export default Users;
