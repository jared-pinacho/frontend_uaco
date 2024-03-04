import React from "react";
import "../TablaReporteRecibidoGrupo/TablaReporteRecibidoGrupo.css";
import Loader from "../Loader/Loader";
export const TablaReporteRecibidoGrupo = ({
  grupos,
  isLoading,
  descargarReporte,
}) => {
  const filas = grupos.map((grupo, index) => (
    <tr key={index}>
      <td>{grupo.clave_grupo}</td>
      <td>{grupo.nombre}</td>
      <td>{grupo.carrera.nombre}</td>

      <td>
        <button
          className="btnInfoReporte"
          disabled={grupo.periodos[0].aprobado_inicio===0}
          onClick={() => descargarReporte(grupo,1)}
        >
        {grupo.periodos[0].aprobado_inicio===1?("Descargar"):("Sin enviar")}
        </button>
      </td>

      <td>
        <button
          className="btnInfoReporte"
          disabled={grupo.periodos[0].aprobado_final===0}
          onClick={() => descargarReporte(grupo,2)}
        >
          {grupo.periodos[0].aprobado_final===1?("Descargar"):("Sin enviar")}
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="table-responsive contenedor">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Clave del Grupo</th>
            <th>Nombre del Grupo</th>
            <th>Programa</th>
            <th>Reporte Inicial</th>
            <th>Reporte Final</th>
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
