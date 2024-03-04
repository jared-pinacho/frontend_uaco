import React from "react";
import "../BtnLogout/BtnLogout.css";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { URL_API } from "../../Services/Const";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonRunning } from "@fortawesome/free-solid-svg-icons";
export const BtnLogout = () => {
  const apiUrl = URL_API;

  const { logout } = useAuthContext();
  const token = Cookies.get('tok');
  const Salir = () => {
    axios
      .delete(`${apiUrl}logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        // Cookies.remove('token');
        // Cookies.remove('nombre');
        // Cookies.remove('rol');
        // Cookies.remove('clave_cuc');
        toast.success(response.data.message);
        logout();

      })
      .catch((error) => {

        // console.log(error);
        toast.error(error.response.data.error);
        logout();
        return <Navigate to="/" />
      });
  };
  return (
    <button className="btn-logout" onClick={() => Salir()}>
      <FontAwesomeIcon className="icono" icon={faPersonRunning} color="#135585" />
      Cerrar Sesión
    </button>
  );
};
