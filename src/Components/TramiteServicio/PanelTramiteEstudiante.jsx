
import React, { useEffect, useState } from "react";

import { UpSideBar } from '../BarraFases/UpSideBar'
import { TramiteServicio } from '../../Pages/Estudiante/TramiteServicio'

export const PanelTramiteEstudiante = () => {
    const queryString = window.location.search;
    const [dataReceived, setDataReceived] = useState(null);
 

// Eliminar el signo de interrogación '?' del inicio de la cadena de consulta
const queryStringWithoutQuestionMark = queryString.slice(1);

// Separar el valor del parámetro (antes del último '=')
const dato = queryStringWithoutQuestionMark.split('=')[0];




  return (
    <div className='panel'>
      
      <UpSideBar
    dato={dato}
    />

  <TramiteServicio
  dato={dato}
  />

    </div>
  )
}
