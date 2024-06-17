import React, { useState, useEffect } from "react";
import "../BarraFases/BarraStylo.css";
import { TramiteServicio } from "../../Pages/Estudiante/TramiteServicio";
import { Contenido } from "../Contenido/Contenido";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
const MY_AUTH_APP = "DoFA45-M0pri";
import axios from "axios";
import { FaseUnoEstudiante } from '../../Components/FaseUno/FaseUnoEstudiante';
import { FaseDosEstudiante } from "../FaseDos/FaseDosEstudiante";
import { FaseTresEstudiante } from "../FaseTres/FaseTresEstudiante";
import { FaseCuatroEstudiante } from "../FaseCuatro/FaseCuatroEstudiante";
import { FaseCincoEstudiante } from "../FaseCinco/FaseCincoEstudiante";
import { FaseFinalEstudiante } from "../FaseFinal/FaseFinalEstudiante";



export const UpSideBar = ({estadoTramite}) => {
  const [informacion, setInformacion] = useState(null);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [componenteActivo, setComponenteActivo] = useState(null);
  const [actualizar, setActualizar]=useState(false);
  // const [matricula,setMatricula]=useState(null);

  const handleClick = (componente) => {
    setComponenteActivo(componente);
  };



  const obtenerInformacio = async () => {
    try {
      const response = await axios.get(`${apiUrl}obten/info/general/propia/est`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInformacion(response.data.data);
      // setMatricula(response.data.estudiante);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(()=>{

    obtenerInformacio();
    
},[actualizar]);


  // Función auxiliar para renderizar el componente activo
  const renderComponenteActivo = () => {
    switch (componenteActivo) {
      case "informacionServicio":
        return <TramiteServicio />;

      case "momentoUno":
        return <FaseUnoEstudiante informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;

      case "momentoDos":
        return <FaseDosEstudiante informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
      case "momentoTres":
        return <FaseTresEstudiante informacion={informacion} actualizar={actualizar} setActualizar={setActualizar}  />;
      case "momentoCuatro":
        return <FaseCuatroEstudiante  setActualizar={setActualizar} informacion={informacion} actualizar={actualizar}  />;
      case "momentoCinco":
        return <FaseCincoEstudiante  setActualizar={setActualizar} informacion={informacion} actualizar={actualizar} />;
      case "momentoFinal":
        return <FaseFinalEstudiante setActualizar={setActualizar} informacion={informacion} actualizar={actualizar} />;
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
                onClick={estadoTramite === "Información de servicio" ||  estadoTramite === "Informe bimestral 1" || estadoTramite === "Inicio de servicio" || estadoTramite === "Informe bimestral 2"  || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación" || estadoTramite === 'Constancia solicitada' ? () => handleClick("momentoUno") : null}
                style={{
                  // Aplicar estilos condicionales para cursor y otras propiedades CSS
                  ...(estadoTramite === "Información de servicio" || estadoTramite === "Inicio de servicio" || estadoTramite === "Informe bimestral 1" || estadoTramite === "Informe bimestral 2" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada'
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
                onClick={estadoTramite === "Inicio de servicio" || estadoTramite === "Informe bimestral 1" || estadoTramite === "Informe bimestral 2" || estadoTramite === "Informe bimestral 3"  || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada' ? () => handleClick("momentoDos") : null}
                style={{          
                  ...(estadoTramite === "Inicio de servicio" || estadoTramite === "Informe bimestral 1" || estadoTramite === "Informe bimestral 2" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada'
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
                onClick={estadoTramite === "Inicio de servicio" || estadoTramite === "Informe bimestral 1" || estadoTramite === "Informe bimestral 2" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada' ? () => handleClick("momentoTres") : null}
                style={{          
                  ...(estadoTramite === "Momento 3" || estadoTramite === "Informe bimestral 1" || estadoTramite === "Informe bimestral 2" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada'
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
                onClick={estadoTramite === "Informe bimestral 2" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada' ? () => handleClick("momentoCuatro") : null}
                style={{          
                  ...(estadoTramite === "Momento 4" || estadoTramite === "Informe bimestral 2" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada'
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
                onClick={estadoTramite === "Momento 5" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada' ? () => handleClick("momentoCinco") : null}
                style={{          
                  ...(estadoTramite === "Momento 5" || estadoTramite === "Informe bimestral 3" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada'
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
                onClick={estadoTramite === "Momento Final" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada' ? () => handleClick("momentoFinal") : null}
                style={{          
                  ...(estadoTramite === "Momento Final" || estadoTramite === "Carta de terminación"  || estadoTramite === 'Constancia solicitada'
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
