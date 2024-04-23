
import React, { useEffect, useState } from "react";

import { UpSideBarEscolar } from '../BarraFases/UpSideBarEscolar '
import { PagePersonalEscolar } from '../../Pages/Escolar/PagePersonalEscolar'
import '../TramiteServicio/PanelTramite.css'

export const PanelTramite = ({estudiante}) => {
    const queryString = window.location.search;
    const [dataReceived, setDataReceived] = useState(null);
 
// Eliminar el signo de interrogación '?' del inicio de la cadena de consulta
const queryStringWithoutQuestionMark = queryString.slice(1);

// Separar el valor del parámetro (antes del último '=')
const dato = queryStringWithoutQuestionMark.split('=')[0];

  return (
   
    <div className='panel'>
      <UpSideBarEscolar
    dato={dato}
    />
  <PagePersonalEscolar
  dato={dato}
  />

    </div>
   
  )
}
