import { useState, useEffect } from "react";
import Home from "./home/Home";
import Login from "./login/Login";
import Sidebar from "./sidebar/Sidebar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Details from "./details/Details";
import Products from "./products/Products";
import Users from "./users/Users";
import Settings from "./settings/Settings";

function App() {
  // const [token, setToken] = useState("");
  // const [search, setSearch] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setToken(token);
  //   }
  // }, []);
  const initialToken = localStorage.getItem("token") || "";
  const [token, setToken] = useState(initialToken);
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <BrowserRouter>
        {token ? (
          <div className="flex bg-gray-100">
            <Sidebar setToken={setToken} setSearch={setSearch} />
            <Routes>
              <Route path="/" element={<Home search={search} />} />
              <Route path="/products" element={<Products search={search} />} />
              <Route path="/products/:id" element={<Details />} />
              <Route path="/users" element={<Users/>} />
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
    </>
  );
}

export default App;
