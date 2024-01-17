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

function App() {
  const initialToken = localStorage.getItem("token") || "";
  const [token, setToken] = useState(initialToken);
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      {token ? (
        <div className="flex bg-gray-100">
          <Sidebar setToken={setToken} setSearch={setSearch} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products search={search} />} />
            <Route path="/products/:id" element={<Details />} />
            <Route path="/users" element={<Users search={search} />} />
            {/* <Route path="/users/:id" element={<Details />} /> */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/add" element={<AddProduct />} />
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
