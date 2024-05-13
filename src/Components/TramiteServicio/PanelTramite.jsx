
import React, { useEffect, useState } from "react";

import { UpSideBarEscolar } from '../BarraFases/UpSideBarEscolar '
import { PagePersonalEscolar } from '../../Pages/Escolar/PagePersonalEscolar'
import '../TramiteServicio/PanelTramite.css'

export const PanelTramite = ({dato,onBack,estado}) => {

  return (
   
    <div className='panel'>

<button className="regresa" onClick={onBack}>&lt;----</button>
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
