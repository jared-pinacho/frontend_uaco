import React, { useState, useEffect } from "react";
import "../BarraFases/BarraStyloEscolar.css";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { BtnLogout } from "../BtnLogout/BtnLogout";
import { useAuthContext } from "../../context/AuthContext";
import logo2 from "../../assets/img/Logo2.svg";
import { enc, AES } from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { URL_API } from "../../Services/Const";

const MY_AUTH_APP = "DoFA45-M0pri";

export const UpSideBarEscolar = () => {


  return (
    <>
  
    <div className="sidebaro-containero">
    
            <div className="sidebaro">
              <div className="encabezadi">


              <NavLink to="/escolarInfoPersonal" activeclassname="activo" style={{ textDecoration: "none" }}
              
              >
      <div className="itemo">
        <span className="texto-opciono">INFORMACION PERSONAL</span>
      </div>
    </NavLink>

    <NavLink to="/infoServicioSocial" activeclassname="activo" style={{ textDecoration: "none" }}>
      <div className="itemo">
        <span className="texto-opciono">INFORMACION SERVICIO</span>
      </div>
    </NavLink>
    
        <NavLink to="/servicioTramite/faseuno" activeclassname="activo" style={{ textDecoration: "none" }}>
        <div className="itemo">
          <span className="texto-opciono">MOMENTO 1</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/fasedos" activeclassname="active" style={{ textDecoration: "none" }}>
        <div className="itemo">
          <span className="texto-opciono">MOMENTO 2</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/fasetres" activeclassname="activo" style={{ textDecoration: "none" }}>
        <div className="itemo">
          <span className="texto-opciono">MOMENTO 3</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/fasecuatro" activeclassname="activo" style={{ textDecoration: "none" }}>
        <div className="itemo">
          <span className="texto-opciono">MOMENTO 4</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/faseCinco" activeclassname="activo" style={{ textDecoration: "none" }}>
        <div className="itemo">
          <span className="texto-opciono">MOMENTO 5</span>
        </div>

      </NavLink>
      <NavLink to="/servicioTramite/faseFinal" activeclassname="activo" style={{ textDecoration: "none" }}>
        <div className="itemo">
          <span className="texto-opciono">MOMENTO FINAL</span>
        </div>
      </NavLink>
      
      </div>
      </div>
      </div>
      

          </>
  );
};
