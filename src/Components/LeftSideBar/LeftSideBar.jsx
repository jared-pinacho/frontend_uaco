import React, { useState } from "react";
import "../LeftSideBar/LeftSideBar.css";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { BtnLogout } from "../BtnLogout/BtnLogout";
import { useAuthContext } from "../../context/AuthContext";
import logo2 from "../../assets/img/Logo2.svg";
import { enc, AES } from "crypto-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHome,
  faEyeSlash,
  faEye,
  faUser,
  faPersonChalkboard,
  faChalkboardUser,
  faSchool,
  faChalkboard,
  faBook,
  faClock,
  faPlus,
  faUserPlus,
  faUserGroup,
  faUserGraduate,
  faUsersViewfinder,
  faPersonCirclePlus,
  faCheckToSlot,
  faListCheck,
  faPen,
  faRectangleList,
  faGlobe,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const MY_AUTH_APP = "DoFA45-M0pri";

export const LeftSideBar = () => {
  const { isAuthenticated, userData, logout } = useAuthContext();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const decrypt = (encryptedData) => {
    const bytes = AES.decrypt(encryptedData, MY_AUTH_APP);
    const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
    return decryptedData;
  };

  // const token = Cookies.get("token");
  // const nombre = Cookies.get("nombre");
  // const rol = Cookies.get("rol");
  try {
    if (isAuthenticated) {
      const rol = decrypt(Cookies.get("rol"));
      const nombre = Cookies.get("nombre");
      return (
        <>
          <div className="sidebar-container">
            <div className={`sidebar ${sidebarVisible ? "visible" : "oculto"}`}>
              <div className="encabezado">
                <img
                  className="img_Encabezado"
                  src={logo2}
                  alt="Descripción de la imagen"
                />
              </div>
              <hr className="linea" />
              <div className="usuario">
                <span className="texto_Usuario">{nombre}</span>
                <hr />
                <span className="texto_Rol">
                  {(() => {
                    switch (rol) {
                      case "coordinador":
                        return "Coordinación académica";
                      case "consejero":
                        return "Consejería académica";
                      case "escolar":
                        return "Servicios escolares";
                      case "administrativo":
                        return "Coordinación administrativa";
                      case "facilitador":
                        return "Facilitador";
                      case "estudiante":
                        return "Estudiante";
                      // Agrega más casos según sea necesario
                      default:
                        return "Rol desconocido";
                    }
                  })()}
                </span>
              </div>
              <div>
                <BtnLogout />
              </div>

              <hr className="linea" />

              <ul className="sidebar-nav">
                {/* Coordinador */}
                {rol === "coordinador" && (
                  <>
                    <li>
                      <NavLink to="/homePageCoordinador" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faHome}
                            color="#135585"
                          />
                          <span className="texto-opcion">Inicio</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/cucs" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faSchool}
                            color="#135585"
                          />
                          <span className="texto-opcion">CUC'S</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/carreras" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faChalkboard}
                            color="#135585"
                          />
                          <span className="texto-opcion">Programas</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/periodos" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faClock}
                            color="#135585"
                          />
                          <span className="texto-opcion">Periodos</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/materias" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faBook}
                            color="#135585"
                          />
                          <span className="texto-opcion">Materias</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/datosGenerales" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faGlobe}
                            color="#135585"
                          />
                          <span className="texto-opcion">Datos Generales</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/reportesRecibidos" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faFile}
                            color="#135585"
                          />
                          <span className="texto-opcion">Reportes de grupos</span>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Consejero */}
                {rol === "consejero" && (
                  <>
                    <li>
                      <NavLink to="/homePageConsejero" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faHome}
                            color="#135585"
                          />
                          <span className="texto-opcion">Inicio</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/seleccionCarreras" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faPlus}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Seleccionar Programas
                          </span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/seleccionFacilitadores"
                        activeclassname="active"
                      >
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faUserPlus}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Seleccionar Facilitadores
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Escolares */}
                {rol === "escolar" && (
                  <>
                    <li>
                      <NavLink to="/homePageEscolar" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faHome}
                            color="#135585"
                          />
                          <span className="texto-opcion">Inicio</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/grupos" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faUserGroup}
                            color="#135585"
                          />
                          <span className="texto-opcion">Grupos</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/estudiantes" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faUserGraduate}
                            color="#135585"
                          />
                          <span className="texto-opcion">Estudiantes</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/clases" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faUsersViewfinder}
                            color="#135585"
                          />
                          <span className="texto-opcion">Asignaturas</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/asignarClaseEstudiante"
                        activeclassname="active"
                      >
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faPersonCirclePlus}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Asignar Estudiantes a asignatura
                          </span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/clasesCalificadasRevision"
                        activeclassname="active"
                      >
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faCheckToSlot}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Asignaturas calificadas
                          </span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/validarGrupoParaReporte"
                        activeclassname="active"
                      >
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faCheckToSlot}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Validar grupos para reporte
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Administrativo */}
                {rol === "administrativo" && (
                  <>
                    <li>
                      <NavLink to="/homePage" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faHome}
                            color="#135585"
                          />
                          <span className="texto-opcion">Inicio</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/consejeros" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faUser}
                            color="#135585"
                          />
                          <span className="texto-opcion">Consejeros</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/facilitadores" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faPersonChalkboard}
                            color="#135585"
                          />
                          <span className="texto-opcion">Facilitadores</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/escolares" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faChalkboardUser}
                            color="#135585"
                          />
                          <span className="texto-opcion">Escolares</span>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}
                {/* facilitador */}
                {rol === "facilitador" && (
                  <>
                    <li>
                      <NavLink to="/homePage" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faHome}
                            color="#135585"
                          />
                          <span className="texto-opcion">Inicio</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/calificarClases" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faPen}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Asignar Calificaciones
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}

                {/* estudiante */}
                {rol === "estudiante" && (
                  <>
                    <li>
                      <NavLink to="/homePage" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faHome}
                            color="#135585"
                          />
                          <span className="texto-opcion">Inicio</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/materiasCursando" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faBook}
                            color="#135585"
                          />
                          <span className="texto-opcion">Carga Academica</span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/boletas" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faRectangleList}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Consultar boletas
                          </span>
                        </div>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/kardex" activeclassname="active">
                        <div className="item">
                          <FontAwesomeIcon
                            className="icono"
                            icon={faRectangleList}
                            color="#135585"
                          />
                          <span className="texto-opcion">
                            Kardex
                          </span>
                        </div>
                      </NavLink>
                    </li>
                  </>
                )}
                <br />
                <li>
                  <button onClick={toggleSidebar}>
                    <FontAwesomeIcon
                      className="icono"
                      icon={faEyeSlash}
                      color="#135585"
                    />
                    Ocultar Menú
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <button
            className={`btnMostrar ${sidebarVisible ? "visible" : "oculto"}`}
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              className="icono"
              icon={faEye}
              color="#135585"
              beat
            />
            Ver Menú
          </button>
        </>
      );
    } else {
      return null;
    }
  } catch (error) {
    logout();
  }
};
