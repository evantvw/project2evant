import { useState } from "react";
import Login from "./login/Login";
import Sidebar from "./sidebar/Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Details from "./details/Details";
import Products from "./products/Products";
import Users from "./users/Users";
import Settings from "./settings/Settings";
import AddProduct from "./addproduct/AddProduct";
import Home from "./home/Home";
import UserDetails from "./userdetails/UserDetails";

function App() {
  const initialToken = localStorage.getItem("token") || "";
  const [token, setToken] = useState(initialToken);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      {token ? (
        <div className="flex bg-gray-100">
          <Sidebar
            setToken={setToken}
            setSearch={setSearch}
            open={open}
            setOpen={setOpen}
          />
          <Routes>
            <Route path="/" element={<Home setOpen={setOpen} />} />
            <Route
              path="/products"
              element={
                <Products search={search} setOpen={setOpen} open={open} />
              }
            />
            <Route path="/products/:id" element={<Details />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route
              path="/users"
              element={<Users search={search} setOpen={setOpen} open={open} />}
            />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
