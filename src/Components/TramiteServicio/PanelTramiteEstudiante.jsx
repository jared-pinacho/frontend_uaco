
import React, { useEffect, useState } from "react";

import { UpSideBar } from '../BarraFases/UpSideBar'
import { TramiteServicio } from '../../Pages/Estudiante/TramiteServicio'
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
const MY_AUTH_APP = "DoFA45-M0pri";
import axios from "axios";
import { HmacSHA1 } from "crypto-js";
import '../TramiteServicio/PanelTramite.css'


export const PanelTramiteEstudiante = ({}) => {
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
    const queryString = window.location.search;
    const [dataReceived, setDataReceived] = useState(null);
    const [estadoTramite, setEstadoTramite] = useState("");
    const [componenteActivo, setComponenteActivo] = useState(null);
 

// Eliminar el signo de interrogación '?' del inicio de la cadena de consulta
const queryStringWithoutQuestionMark = queryString.slice(1);

// Separar el valor del parámetro (antes del último '=')
const dato = queryStringWithoutQuestionMark.split('=')[0];




const estado_tramite = () => {
  axios
    .get(`${apiUrl}info/estado`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      setEstadoTramite(response.data.data);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
      //   toast.error("Verifique los datos ingresados");
    });
};


useEffect(() => {
  estado_tramite();
  // Mostrar el valor resultante
}, []);


  return (
    <div className='panel'>
      
     
     
      {estadoTramite !=="Iniciado" ? <UpSideBar estadoTramite={estadoTramite} /> : null}
      

      {estadoTramite !=="Iniciado" ? <TramiteServicio dato={dato} /> :  <h3>La información personal aún no ha sido aprobada</h3>}


    </div>
  )
}
