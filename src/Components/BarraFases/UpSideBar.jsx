import React, { useState, useEffect } from "react";
import "../BarraFases/BarraStylo.css";
import { TramiteServicio } from "../../Pages/Estudiante/TramiteServicio";
import { Contenido } from "../Contenido/Contenido";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
const MY_AUTH_APP = "DoFA45-M0pri";
import axios from "axios";
import { FaseUnoEstudiante } from '../../Components/FaseUno/FaseUnoEstudiante';



export const UpSideBar = ({estadoTramite}) => {
  const [informacion, setInformacion] = useState(null);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [componenteActivo, setComponenteActivo] = useState(null);
  

  const handleClick = (componente) => {
    setComponenteActivo(componente);
  };




  const obtenerInformacio = () => {
    axios.get(`${apiUrl}obten/info/general/propia/est`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setInformacion(response.data.data);
   
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  };

  useEffect(()=>{

    obtenerInformacio();
    
},[]);





  // Función auxiliar para renderizar el componente activo
  const renderComponenteActivo = () => {
    switch (componenteActivo) {
      case "informacionServicio":
        return <TramiteServicio />;

      case "momentoUno":
        return <FaseUnoEstudiante informacion={informacion} />;

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
      <div className="sidebaro-containerov">
        <div className="sidebarov">
          <div className="encabezadiv">


            <div
              className={`itemo ${
                componenteActivo === "informacionServicio" || componenteActivo === null ? "activo" : ""}`}

                
              onClick={() => handleClick("informacionServicio")}>
              <span
                className={`texto-opciono ${componenteActivo === "informacionServicio" || componenteActivo === null ? "activo": ""  }`}
              >
                INFORMACIÓN SERVICIO
              </span>
            </div>



            <div
              className={`itemo ${
                componenteActivo === "momentoUno"  ? "activo" : ""}`}
                onClick={estadoTramite === "Información de servicio" || estadoTramite === "Inicio de servicio"  ? () => handleClick("momentoUno") : null}
                style={{
                  // Aplicar estilos condicionales para cursor y otras propiedades CSS
                  ...(estadoTramite === "Información de servicio" || estadoTramite === "Inicio de servicio"
                    ? { cursor: 'pointer', opacity: 1, backgroundColor: '#ffffff', color: '#333333' }
                    : { cursor: 'not-allowed', opacity: 0.5, backgroundColor: '#f2f2f2', color: '#999999' }),
                  // Otros estilos existentes o adicionales según sea necesario
                }}
              >
              <span
                className={`texto-opciono ${componenteActivo === "momentoUno"  ? "activo": ""  }`} 
                
                >
                INICIO DE SERVICIO
              </span>
            </div>




            <div
              className={`itemo ${
                componenteActivo === "momentoDos"  ? "activo" : ""}`}
                onClick={estadoTramite === "Inicio de servicio"  ? () => handleClick("momentoDos") : null}
                style={{          
                  ...(estadoTramite === "Inicio de servicio"
                    ? { cursor: 'pointer', opacity: 1, backgroundColor: '#ffffff', color: '#333333' }
                    : { cursor: 'not-allowed', opacity: 0.5, backgroundColor: '#f2f2f2', color: '#999999' }),}}
              >
              <span
                className={`texto-opciono ${componenteActivo === "momentoDos"  ? "activo": ""  }`}  >
                INFORME BIMESTRAL 1
              </span>
            </div>



            <div
              className={`itemo ${
                componenteActivo === "momentoTres"  ? "activo" : ""}`}
                onClick={estadoTramite === "Momento 3"  ? () => handleClick("momentoTres") : null}
                style={{          
                  ...(estadoTramite === "Momento 3"
                    ? { cursor: 'pointer', opacity: 1, backgroundColor: '#ffffff', color: '#333333' }
                    : { cursor: 'not-allowed', opacity: 0.5, backgroundColor: '#f2f2f2', color: '#999999' }),}}
              >
              <span
                className={`texto-opciono ${componenteActivo === "momentoTres"  ? "activo": ""  }`}  >
                REPORTE BIMESTRAL 2
              </span>
            </div>



            <div
              className={`itemo ${
                componenteActivo === "momentoCuatro"  ? "activo" : ""}`}
                onClick={estadoTramite === "Momento 4"  ? () => handleClick("momentoCuatro") : null}
                style={{          
                  ...(estadoTramite === "Momento 4"
                    ? { cursor: 'pointer', opacity: 1, backgroundColor: '#ffffff', color: '#333333' }
                    : { cursor: 'not-allowed', opacity: 0.5, backgroundColor: '#f2f2f2', color: '#999999' }),}}
              >
              <span
                className={`texto-opciono ${componenteActivo === "momentoCuatro"  ? "activo": ""  }`}  >
                INFORME BIMESTRAL 3
              </span>
            </div>



            <div
              className={`itemo ${
                componenteActivo === "momentoCinco"  ? "activo" : ""}`}
                onClick={estadoTramite === "Momento 5"  ? () => handleClick("momentoCinco") : null}
                style={{          
                  ...(estadoTramite === "Momento 5"
                    ? { cursor: 'pointer', opacity: 1, backgroundColor: '#ffffff', color: '#333333' }
                    : { cursor: 'not-allowed', opacity: 0.5, backgroundColor: '#f2f2f2', color: '#999999' }),}}
              >
              <span
                className={`texto-opciono ${componenteActivo === "momentoCinco"  ? "activo": ""  }`}  >
               CARTA DE TERMINACIÓN
              </span>
            </div>




            <div
              className={`itemo ${
                componenteActivo === "momentoFinal"  ? "activo" : ""}`}
                onClick={estadoTramite === "Momento Final"  ? () => handleClick("momentoFinal") : null}
                style={{          
                  ...(estadoTramite === "Momento Final"
                    ? { cursor: 'pointer', opacity: 1, backgroundColor: '#ffffff', color: '#333333' }
                    : { cursor: 'not-allowed', opacity: 0.5, backgroundColor: '#f2f2f2', color: '#999999' }),}}
              >
              <span
                className={`texto-opciono ${componenteActivo === "momentoFinal"  ? "activo": ""  }`}  >
                CONSTACIA DE LIBERACIÓN
              </span>
            </div>



          </div>
        </div>
      </div>
      {/* Renderizar el componente activo */}
      {renderComponenteActivo()}
    </>
  );
};
