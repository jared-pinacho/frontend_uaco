import React from "react";
import "../TarjetaCargaAcademica/TarjetaCargaAcademica.css";
export const TarjetaCargaAcademica = ({
  materia,
  profesor,
  calificacion,
  retroalimentacion,
  aula,
  hora
}) => {
  return (
    <div className="tarjeta">
      <div className="tarjeta-encabezado">
        <h3>{materia}</h3>
      </div>
      <div className="tarjeta-contenido">
        <p>
          <strong>Facilitador:</strong> {profesor}
        </p>
        <p>
          <strong>Calificación:</strong> {calificacion}
        </p>
        <p>
          <strong>Retroalimentación:</strong> {retroalimentacion}
        </p>
        <p>
          <strong>Aula:</strong> {aula}
        </p>
        {/* <p><strong>Clase:</strong> {nombreClase}</p> */}
        <p>
          <strong>Hora:</strong> {hora}
        </p>
      </div>
    </div>
  );
};
