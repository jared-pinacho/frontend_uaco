import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { LeftSideBar } from "./Components/LeftSideBar/LeftSideBar";
import Reloj from "./Components/Reloj/Reloj";
import { AppRoutes } from "./Routes/AppRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'chart.js/auto';
function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="app">
          <LeftSideBar />
          <AppRoutes />
          <ToastContainer />
          <Reloj />
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
