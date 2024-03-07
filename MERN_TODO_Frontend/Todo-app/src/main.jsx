import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/styles/app.scss";
import { createContext } from "react";

export const server = "https://mern-todo-backend-r7dn.onrender.com/api/v1";

export const Context = createContext({ isAuthenticated: false });

const Appwraper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Appwraper />
  </React.StrictMode>
);
