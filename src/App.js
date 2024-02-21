import { useState, useContext } from "react";
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
import { DarkMode } from "./context/DarkMode";
import { useSelector } from "react-redux";
import { getToken } from "./authSlice";

function App() {
  const token = useSelector(getToken);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(DarkMode);

  return (
    <BrowserRouter>
      {token ? (
        <div className={`flex bg-gray-100 ${isDarkMode ? "bg-slate-800" : ""}`}>
          <Sidebar setSearch={setSearch} open={open} setOpen={setOpen} />
          <button
            className={`absolute p-3 bg-indigo-800 rounded-2xl top-3 right-6 ${
              open ? "hidden" : ""
            }`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <Routes>
            <Route path="/" element={<Home setOpen={setOpen} open={open} />} />
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
            <Route
              path="/settings"
              element={<Settings setOpen={setOpen} open={open} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
