import React, { useState } from "react";
import "../BarraFases/BarraStyloEscolar.css";
import { TramiteServicio } from "../../Pages/Estudiante/TramiteServicio";
import { Contenido } from "../Contenido/Contenido";

const MY_AUTH_APP = "DoFA45-M0pri";

export const UpSideBar = () => {
  const [componenteActivo, setComponenteActivo] = useState(null);

  const handleClick = (componente) => {
    setComponenteActivo(componente);
  };

  // Función auxiliar para renderizar el componente activo
  const renderComponenteActivo = () => {
    switch (componenteActivo) {
      case "informacionServicio":
        return <TramiteServicio />;
      case "momentoUno":
        return <Contenido />;
      case "momentoDos":
        return <Contenido />;
      case "momentoTres":
        return <Contenido />;
      case "momentoCuatro":
        return <Contenido />;
      case "momentoCinco":
        return <Contenido />;
      case "momentoFinal":
        return <Contenido />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="sidebaro-containero">
        <div className="sidebaro">
          <div className="encabezadi">
            <div
              className={`itemo ${
                componenteActivo === "informacionServicio" ||
                componenteActivo === null
                  ? "activo"
                  : ""
              }`}
              onClick={() => handleClick("informacionServicio")}
            >
              <span
                className={`texto-opciono ${
                  componenteActivo === "informacionServicio" ||
                  componenteActivo === null
                    ? "activo"
                    : ""
                }`}
              >
                INFORMACIÓN SERVICIO
              </span>
            </div>

            <div className="itemo" onClick={() => handleClick("momentoUno")}>
              <span className="texto-opciono">MOMENTO 1</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoDos")}>
              <span className="texto-opciono">MOMENTO 2</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoTres")}>
              <span className="texto-opciono">MOMENTO 3</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoCuatro")}>
              <span className="texto-opciono">MOMENTO 4</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoCinco")}>
              <span className="texto-opciono">MOMENTO 5</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoFinal")}>
              <span className="texto-opciono">MOMENTO FINAL</span>
            </div>
          </div>
        </div>
      </div>
      {/* Renderizar el componente activo */}
      {renderComponenteActivo()}
    </>
  );
};
