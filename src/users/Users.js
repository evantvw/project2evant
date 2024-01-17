import "./Users.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import UsersList from "../userslist/UsersList";

const Users = ({ search }) => {
  const [sort, setSort] = useState("?sort=asc");
  const handleChangeSort = (event) => {
    setSort(event.target.value);
  };
  return (
    <div className="container-users">
      <div className="head-users">
        <h1 className="text-5xl font-bold ">Users</h1>

        <div className="buttons items-center">
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
      <UsersList search={search} sort={sort}/>
    </div>
  );
};

export default Users;
