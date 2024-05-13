import React, { useState, useEffect} from "react";
import "../BarraFases/BarraStyloEscolar.css";
import { PagePersonalEscolar } from '../../Pages/Escolar/PagePersonalEscolar';
import { PageServicioEscolar } from "../../Pages/Escolar/PageServicioEscolar";
import { Escolar } from '../../Components/FaseUno/Escolar';
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { Contenido } from "../Contenido/Contenido";


const MY_AUTH_APP = "DoFA45-M0pri";

export const UpSideBarEscolar = ({dato,estado}) => {
  const [componenteActivo, setComponenteActivo] = useState(null);
  const [informacion, setInformacion] = useState(null);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  

  const handleClick = (componente) => {
    setComponenteActivo(componente);
    
  };

  
  const obtenerInformacion = async () => {
    try {
      const response = await axios.get(`${apiUrl}obten/info/general/${dato}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInformacion(response.data.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  
  useEffect(() => {
    obtenerInformacion();
  }, []);



  // Función auxiliar para renderizar el componente activo
  const renderComponenteActivo = () => {
    switch (componenteActivo) {
      case "informacionPersonal":
        return <PagePersonalEscolar dato={dato}/>;
      case "informacionServicio":
        return <PageServicioEscolar dato={dato} />;
      case "momentoUno":
        return <Escolar informacion={informacion} />;
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
        if (estado === 'Iniciado') {
          return <h1 style={{ color: "red" }}>Información no actualizada</h1>;
        } 

        if (estado === 'Información personal') {
          return <PagePersonalEscolar dato={dato} />;
        } 
        if (estado === 'Información de servicio') {
          return <PageServicioEscolar dato={dato} />;
        } 
        if (estado === 'Inicio de servicio') {
          return <Escolar informacion={informacion} />;
        } 
    }
  };

  return (
    <>
      <div className="sidebaro-containero">
        <div className="sidebaro">
          <div className="encabezadi">
            
          <div
              className={`itemo ${componenteActivo === "informacionPersonal"   || estado === 'Información de servicio'    || estado === 'Información personal' | estado === 'Inicio de servicio' ? "activo" : ""}`}
              onClick={() => handleClick("informacionPersonal","inframcion")}
            >
              <span className={`texto-opciono ${componenteActivo === "informacionPersonal"  || estado === 'Información de servicio'    || estado === 'Información personal' | estado === 'Inicio de servicio' ? "activo" : ""}`}   >INFORMACIÓN PERSONAL</span>
            </div>

            
            <div  className={`itemo ${componenteActivo === "informacionServicio" || estado === 'Información de servicio'|| estado === 'Inicio de servicio'  ? "activo" : ""}`}
              onClick={() => handleClick("informacionServicio")}
            >
               <span className={`texto-opciono ${componenteActivo === "informacionServicio"  || estado === 'Información de servicio'  || estado === 'Inicio de servicio' ? "activo" : ""}`}   >INFORMACIÓN SERVICIO </span>
            </div>



            <div  className={`itemo ${ componenteActivo === "informacionServicio" || estado === 'Inicio de servicio' || componenteActivo === "momentoUno" ? "activo" : ""}`}
              onClick={() => handleClick("momentoUno")}
            >
               <span className={`texto-opciono ${componenteActivo === "momentoUno"  | estado === 'Inicio de servicio' ? "activo" : ""}`}     >INICIO DE SERVICIO</span>
            </div>




            <div className="itemo" onClick={() => handleClick("momentoDos")}>
              <span className="texto-opciono">INFORME BIMESTRAL 1</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoTres")}>
              <span className="texto-opciono">INFORME BIMESTRAL 2</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoCuatro")}>
              <span className="texto-opciono">INFORME BIMESTRAL 3</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoCinco")}>
              <span className="texto-opciono">CARTA DE TERMINACIÓN</span>
            </div>
            <div className="itemo" onClick={() => handleClick("momentoFinal")}>
              <span className="texto-opciono">CONSTANCIA DE LIBERACIÓN</span>
            </div>
          </div>
        </div>
      </div>
      {/* Renderizar el componente activo */}
      {renderComponenteActivo()}
    </>
  );
};
