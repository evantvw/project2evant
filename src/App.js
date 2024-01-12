import { useState, useEffect } from "react";
import Home from "./home/Home";
import Login from "./login/Login";
import Sidebar from "./sidebar/Sidebar";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Details from "./details/Details";

function App() {
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        {token ? (
          <div className="flex bg-gray-100">
            <Sidebar setToken={setToken} setSearch={setSearch}/>
            <Routes>
              <Route path="/home" element={<Home search={search}/>} />
              <Route path="/products/:id" element={<Details />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
