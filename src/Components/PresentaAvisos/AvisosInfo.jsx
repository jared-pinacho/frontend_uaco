import React from "react";
import "../PresentaAvisos/AvisosInfo.css";

export const AvisosInfo = ({ avisos }) => {
  // Asegurarse de que avisos sea un arreglo
  const avisosArray = Array.isArray(avisos) ? avisos : [];

  return (
    <div className="contenedor-infox">
      <h1>AVISOS Y VACANTES</h1>
      {avisosArray.map((aviso) => (
        <details key={aviso.id_anuncio} className="details-custom">
          <summary className="summary-custom">
            {aviso.titulo}  <span className="fecha">Fecha: {aviso.fecha}</span>
          </summary>
          <div className="details-content">
            <p>{aviso.descripcion}</p>
            <p>Fecha de publicación: {aviso.fecha}</p>
          
            {/* Puedes agregar más detalles si los deseas */}
          </div>
        </details>
      ))}
    </div>
  );
};
