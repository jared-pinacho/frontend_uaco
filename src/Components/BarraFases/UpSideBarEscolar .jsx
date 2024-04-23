import React, { useState } from "react";
import "../BarraFases/BarraStyloEscolar.css";
import { PagePersonalEscolar } from '../../Pages/Escolar/PagePersonalEscolar'
import { PageServicioEscolar } from "../../Pages/Escolar/PageServicioEscolar";

import { Contenido } from "../Contenido/Contenido";


const MY_AUTH_APP = "DoFA45-M0pri";

export const UpSideBarEscolar = ({dato}) => {
  const [componenteActivo, setComponenteActivo] = useState(null);

  const handleClick = (componente) => {
    setComponenteActivo(componente);
  };

  // Función auxiliar para renderizar el componente activo
  const renderComponenteActivo = () => {
    switch (componenteActivo) {
      case "informacionPersonal":
        return <PagePersonalEscolar dato={dato}/>;
      case "informacionServicio":
        return <PageServicioEscolar dato={dato} />;
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
              className={`itemo ${componenteActivo === "informacionPersonal" || componenteActivo===null ? "activo" : ""}`}
              onClick={() => handleClick("informacionPersonal")}
            >
              <span className={`texto-opciono ${componenteActivo === "informacionPersonal"  || componenteActivo===null ? "activo" : ""}`}     >INFORMACIÓN PERSONAL</span>
            </div>

            
            <div  className={`itemo ${componenteActivo === "informacionServicio" ? "activo" : ""}`}
              onClick={() => handleClick("informacionServicio")}
            >
               <span className={`texto-opciono ${componenteActivo === "informacionServicio" ? "activo" : ""}`}     >INFORMACIÓN SERVICIO </span>
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
