import React from "react";
import "../TablaValidarGrupo/TablaValidarGrupo.css";
export const TablaValidarGrupo = ({
  grupos,
  isLoading,
  descargarReporte,
  confirmarEnvio,
 
}) => {
  const filas = grupos.map((grupo, index) => (
    <tr key={index}>
      <td>{grupo.clave_grupo}</td>
      <td>{grupo.nombre}</td>
      <td>{grupo.carrera.nombre}</td>
      <td>
        <button
          className="btnInfoReporte"
          onClick={() => descargarReporte(grupo, 1)}
        >
          Descargar
        </button>
      </td>

      <td>
        <button
          className="btnInfoReporte"
          
          onClick={() => descargarReporte(grupo, 2)}
        >
          Descargar
        </button>
      </td>
     
          <td>
            <button
              className="btnInfoReporte"
              onClick={() => confirmarEnvio(grupo, 1)}
            >
              Enviar
            </button>
          </td>
          <td>
            <button
              className="btnInfoReporte"
              onClick={() => confirmarEnvio(grupo, 2)}
            >
              Enviar
            </button>
          </td>
      
    </tr>
  ));

  return (
    <div className="table-responsive contenedorTablaValidarGrupo">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Clave del Grupo</th>
            <th>Nombre del Grupo</th>
            <th>Programa</th>
            <th>Reporte Inicial</th>
            <th>Reporte Final</th>
            <th>Enviar reporte inicial</th>
            <th>Enviar reporte final</th>
             
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3">
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
