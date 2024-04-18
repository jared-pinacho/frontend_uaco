import React, { useState, useEffect } from "react";
import "../BarraFases/BarraStylo.css";
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

export const UpSideBar = () => {


  return (
    <>
  
    <div className="sidebar-containere">
    
            <div className="sidebare">
              <div className="encabezade">


    <NavLink to="/servicioTramite" activeclassname="active" style={{ textDecoration: "none" }}>
      <div className="iteme">
        <span className="texto-opcione">INFORMACION SERVICIO</span>
      </div>
    </NavLink>
    
        <NavLink to="/servicioTramite/faseuno" activeclassname="active" style={{ textDecoration: "none" }}>
        <div className="iteme">
          <span className="texto-opcione">MOMENTO 1</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/fasedos" activeclassname="active" style={{ textDecoration: "none" }}>
        <div className="iteme">
          <span className="texto-opcione">MOMENTO 2</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/fasetres" activeclassname="active" style={{ textDecoration: "none" }}>
        <div className="iteme">
          <span className="texto-opcione">MOMENTO 3</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/fasecuatro" activeclassname="active" style={{ textDecoration: "none" }}>
        <div className="iteme">
          <span className="texto-opcione">MOMENTO 4</span>
        </div>
      </NavLink>

      <NavLink to="/servicioTramite/faseCinco" activeclassname="active" style={{ textDecoration: "none" }}>
        <div className="iteme">
          <span className="texto-opcione">MOMENTO 5</span>
        </div>

      </NavLink>
      <NavLink to="/servicioTramite/faseFinal" activeclassname="active" style={{ textDecoration: "none" }}>
        <div className="iteme">
          <span className="texto-opcione">MOMENTO FINAL</span>
        </div>
      </NavLink>
      
      </div>
      </div>
      </div>
      

          </>
  );
};
