
import React, { useEffect, useState } from "react";

import { UpSideBarEscolar } from '../BarraFases/UpSideBarEscolar '
import { PagePersonalEscolar } from '../../Pages/Escolar/PagePersonalEscolar'
import '../TramiteServicio/PanelTramite.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

export const PanelTramite = ({dato,onBack,estado}) => {

  return (
   
    <div className='panel'>

<button className="regresa" onClick={onBack}>  <FontAwesomeIcon icon={faArrowAltCircleLeft} /> Volver</button>
      <UpSideBarEscolar
    dato={dato}
    estado={estado}
    />

  {/* { <PagePersonalEscolar
  dato={dato}
  /> } */}






    </div>
   
  )
}
