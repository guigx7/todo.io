import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";
const saved = localStorage.getItem("jwtToken");
if (saved) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${saved}`;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
