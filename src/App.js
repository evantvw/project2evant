import { useState, useEffect } from "react";
import Home from "./home/Home";
import Login from "./login/Login";
import Sidebar from "./sidebar/Sidebar";
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  const [token, setToken] = useState("");

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
            <Sidebar setToken={setToken}/>
            <Routes>
              <Route path="/home" element={<Home />} />
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
