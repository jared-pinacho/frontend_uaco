import React from "react";
import "../TablaPeriodos/TablaPeriodos.css";
import Loader from "../Loader/Loader";
export const TablaPeriodos = ({ periodos, isLoading }) => {
  const filas = periodos.map((periodo, index) => (
    <tr key={index}>
      <td>{periodo.id_periodo}</td>
      <td>{periodo.nombre}</td>
      <td>{periodo.fecha_inicio}</td>
      <td>{periodo.fecha_final}</td>
      <td>{periodo.periodicidad}</td>
    </tr>
  ));

  return (
    <div className="table-responsive contenedorTablaPeriodos">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Id Periodo</th>
            <th>Nombre</th>
            <th>Fecha inicio</th>
            <th>Fecha final</th>
            <th>Periodicidad</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">
                <Loader />
              </td>
            </tr>
          ) : (
            filas
          )}
        </tbody>
      </table>
    </div>
  );
};
