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

export const UpSideBarEscolar = ({dato}) => {
  const [componenteActivo, setComponenteActivo] = useState(null);
  const [informacion, setInformacion] = useState(null);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");


  const handleClick = (componente) => {
    setComponenteActivo(componente);
  };

  
  
  

    const obtenerInformacion = () => {
      axios.get(`${apiUrl}obten/info/general/${dato}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setInformacion(response.data.data);
      console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error al obtener los datos:", error);
        });
    };







  useEffect(()=>{

    obtenerInformacion();
    
},[]);



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



            <div  className={`itemo ${componenteActivo === "momentoUno" ? "activo" : ""}`}
              onClick={() => handleClick("momentoUno")}
            >
               <span className={`texto-opciono ${componenteActivo === "momentoUno" ? "activo" : ""}`}     >MOMENTO 1</span>
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
