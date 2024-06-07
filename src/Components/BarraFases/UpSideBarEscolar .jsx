import React, { useState, useEffect} from "react";
import "../BarraFases/BarraStyloEscolar.css";
import { PagePersonalEscolar } from '../../Pages/Escolar/PagePersonalEscolar';
import { PageServicioEscolar } from "../../Pages/Escolar/PageServicioEscolar";
import { Escolar } from '../../Components/FaseUno/Escolar';
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { Contenido } from "../Contenido/Contenido";
import { FaseDosEscolar } from "../FaseDos/FaseDosEscolar";
import { FaseTresEscolar } from "../FaseTres/FaseTresEscolar";
import { FaseCuatroEscolar } from "../FaseCuatro/FaseCuatroEscolar";
import { FaseCincoEstudiante } from "../FaseCinco/FaseCincoEstudiante";
import { FaseCincoEscolar } from "../FaseCinco/FaseCincoEscolar";
import { FaseFinalEscolar } from "../FaseFinal/FaseFinalEscolar";


const MY_AUTH_APP = "DoFA45-M0pri";

export const UpSideBarEscolar = ({dato,estado}) => {
  const [componenteActivo, setComponenteActivo] = useState(null);
  const [informacion, setInformacion] = useState(null);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [actualizar, setActualizar]=useState(false);

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
  
  useEffect(()=>{

    obtenerInformacion();
    
},[actualizar]);



  // Función auxiliar para renderizar el componente activo
  const renderComponenteActivo = () => {
    switch (componenteActivo) {
      case "informacionPersonal":
        return <PagePersonalEscolar dato={dato}/>;
      case "informacionServicio":
        return <PageServicioEscolar dato={dato} />;
      case "momentoUno":
        return <Escolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
      case "momentoDos":
        return <FaseDosEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
      case "momentoTres":
        return <FaseTresEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
      case "momentoCuatro":
        return <FaseCuatroEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
      case "momentoCinco":
        return <FaseCincoEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar}/>;
      case "momentoFinal":
        return <FaseFinalEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar}  />;
      default:
        if (estado === 'Iniciado') {
          return <h1 style={{ color: "red" }}>Información no actualizada</h1>;
        } 

        if (estado === 'Información personal') {
          return <PagePersonalEscolar dato={dato} />;
        } 
        if (estado === 'Información de servicio') {
          return <Escolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
        } 
        if (estado === 'Inicio de servicio') {
          return <FaseDosEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
        } 
        if (estado === 'Informe bimestral 1') {
           return <FaseTresEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
         } 
         if (estado === 'Informe bimestral 2') {
          return <FaseCuatroEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar}  />;
        } 
        if (estado === 'Informe bimestral 3') {
          return <FaseCincoEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
        } 

        if (estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ) {
          return <FaseFinalEscolar informacion={informacion} actualizar={actualizar} setActualizar={setActualizar} />;
        } 
    }
  };

  return (
    <>
      <div className="sidebaro-containero">
        <div className="sidebaro">
          <div className="encabezadi">
            
          <div
              className={`itemo ${componenteActivo === "informacionPersonal"   || estado === 'Información de servicio' || estado === 'Información personal' || estado === 'Inicio de servicio' || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
              onClick={() => handleClick("informacionPersonal","inframcion")}
            >
              <span className={`texto-opciono ${componenteActivo === "informacionPersonal"  || estado === 'Información de servicio'    || estado === 'Información personal' || estado === 'Inicio de servicio' || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}   >INFORMACIÓN PERSONAL</span>
            </div>



            
            <div  className={`itemo ${componenteActivo === "informacionServicio" || estado === 'Información de servicio'|| estado === 'Inicio de servicio' || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
              onClick={() => handleClick("informacionServicio")}
            >
               <span className={`texto-opciono ${componenteActivo === "informacionServicio"  || estado === 'Información de servicio'  || estado === 'Inicio de servicio' || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}   >INFORMACIÓN SERVICIO </span>
            </div>





            <div  className={`itemo ${  estado === 'Inicio de servicio' || estado === "Información de servicio" || componenteActivo === "momentoUno" || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
              onClick={() => handleClick("momentoUno")}
            >
               <span className={`texto-opciono ${componenteActivo === "momentoUno"  || estado === 'Inicio de servicio' || estado === "Información de servicio" || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`} >INICIO DE SERVICIO</span>
            </div>





            <div className={`itemo ${  estado === 'Inicio de servicio' || componenteActivo === "momentoDos" || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
              onClick={() => handleClick("momentoDos")}>


              <span className={`texto-opciono ${componenteActivo === "momentoDos"  || estado === 'Inicio de servicio' || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}>INFORME BIMESTRAL 1</span>
            </div>




            <div className={`itemo ${  estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || componenteActivo === "momentoTres" || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
            onClick={() => handleClick("momentoTres")}>


              <span className={`texto-opciono ${componenteActivo === "momentoTres"  || estado === 'Informe bimestral 1' || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}>INFORME BIMESTRAL 2</span>
            </div>





            <div className={`itemo ${ estado === 'Informe bimestral 2' || componenteActivo === "momentoCuatro"  || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
            onClick={() => handleClick("momentoCuatro")}>

              <span className={`texto-opciono ${componenteActivo === "momentoCuatro"  || estado === 'Informe bimestral 2' || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}>INFORME BIMESTRAL 3</span>
            </div>




           
            <div className={`itemo ${  componenteActivo === "momentoCinco"  || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
            onClick={() => handleClick("momentoCinco")}>


<span className={`texto-opciono ${componenteActivo === "momentoCinco"  || estado === 'Informe bimestral 3' || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}>CARTA DE TERMINACIÓN</span>
            </div>




            <div className={`itemo ${  componenteActivo === "momentoFinal"  || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}
            onClick={() => handleClick("momentoFinal")}>

            
             {/* <div className="itemo" onClick={() => handleClick("momentoFinal")}> */}

             <span className={`texto-opciono ${componenteActivo === "momentoFinal" || estado === 'Carta de terminación' || estado === 'Comprobante de pago' || estado === 'Constancia solicitada' ? "activo" : ""}`}>CONSTANCIA LIBERACIÓN</span>
         
            </div> 
          </div>
        </div>
      </div>
      {/* Renderizar el componente activo */}
      {renderComponenteActivo()}
    </>
  );
};
