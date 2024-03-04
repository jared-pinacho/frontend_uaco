import React from "react";
import "../TablaKardex/TablaKardex.css";
import Loader from "../Loader/Loader";

export const TablaKardex = ({ data, isLoading }) => {
  const calcularPromedio = (calificaciones) => {
    const calificacionesValidas = calificaciones.filter(
      (calificacion) => calificacion !== "Sin calificar"
    );

    if (calificacionesValidas.length === 0) {
      return "Sin calificar";
    }

    const sumaCalificaciones = calificacionesValidas.reduce(
      (total, calificacion) => total + parseFloat(calificacion),
      0
    );
    return (sumaCalificaciones / calificacionesValidas.length).toFixed(2);
  };

  const renderPeriodo = (periodoData, periodo, index) => {
    const promedioCalificaciones = calcularPromedio(
      periodoData.map((item) => item.calificacion_estudiante)
    );

    return (
      <>
        <tr key={index} >
          <td colSpan="4" className="nombrePeriodoKardex">{periodo}</td>
        </tr>
        <tr>
          <th>Materia</th>
          <th>Creditos</th>
          <th>Calificacion</th>
          <th>Acreditado</th>
        </tr>
        {periodoData.map((item, itemIndex) => (
          <tr key={itemIndex}>
            <td>{item.nombre_materia}</td>
            <td>{item.creditos_materia}</td>
            <td>
              {/* {item.status_facilitador
                ? item.calificacion_estudiante
                : "Sin calificar"} */}
                {item.calificacion_estudiante
                }
            </td>
            <td>{item.acreditado_estudiante ===""? "Sin calificar":item.acreditado_estudiante
                }</td>
          </tr>
        ))}
        <tr className="promedio-row">
          <td colSpan="2"></td>
          <td className="promedio">Promedio:</td>
          <td className="promedio">{promedioCalificaciones}</td>
        </tr>
      </>
    );
  };

  const periodos = Object.entries(data).map(([periodo, periodoData], index) =>
    renderPeriodo(periodoData, periodo, index)
  );

  return (
    <div className="table-responsive contenedorKardex">
      <table className="table-responsive table tablita">
        {/* <thead>
          <tr>
            <th>Materia</th>
            <th>Creditos</th>
            <th>Calificacion</th>
            <th>Observacion</th>
          </tr>
        </thead> */}

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4">
                <Loader />
              </td>
            </tr>
          ) : (
            periodos
          )}
        </tbody>
      </table>
    </div>
  );
};
