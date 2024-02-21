import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DarkModeContextProvider from "./context/DarkMode";
import { store } from "./App/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
