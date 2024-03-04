import React, { useState } from "react";
import "../TablaClases/TablaClases.css";
import Loader from "../Loader/Loader";
export const TablaClases = ({ clases, isLoading, mostrarBuscador }) => {
  const [filtro, setFiltro] = useState("");
  const filasFiltradas = clases.filter((clase) => {
    const termino = filtro.toLowerCase();
    const nombreCompleto =
      `${clase.facilitador.nombre} ${clase.facilitador.apellido_paterno} ${clase.facilitador.apellido_materno}`.toLowerCase();
    return (
      clase.clave_clase.toLowerCase().includes(termino) ||
      clase.nombre.toLowerCase().includes(termino) ||
      clase.materia.nombre.toLowerCase().includes(termino) ||
      clase.carrera.nombre.toLowerCase().includes(termino) ||
      nombreCompleto.toLowerCase().includes(termino) ||
      clase.hora_inicio.includes(termino) ||
      clase.hora_final.includes(termino) ||
      clase.periodo.nombre.toLowerCase().includes(termino) ||
      clase.salon.toLowerCase().includes(termino) ||
      clase.status_facilitador.includes(termino) ||
      clase.status_escolar.includes(termino)
    );
  });
  const filas = filasFiltradas.map((clase, index) => (
    <tr key={index}>
      <td>{clase.clave_clase}</td>
      <td>{clase.nombre}</td>
      <td>{clase.materia.nombre}</td>
      <td>{clase.carrera.nombre}</td>
      <td>
        {clase.facilitador.nombre +
          " " +
          clase.facilitador.apellido_paterno +
          " " +
          clase.facilitador.apellido_materno}
      </td>
      <td>{clase.hora_inicio}</td>
      <td>{clase.hora_final}</td>
      <td>{clase.periodo.nombre}</td>
      <td>{clase.salon}</td>
      <td>{clase.status_facilitador?('Si'):('No')
}</td>
      <td>{clase.status_escolar?('Si'):('No')
}</td>
    </tr>
  ));
  return (
    <div className="table-responsive contenedorTablaClases">
      {mostrarBuscador ? (
        <input
          className="campoBusqueda"
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      ) : null}

      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Clave Asignatura</th>
            <th>Nombre</th>
            <th>Materia</th>
            <th>Programa</th>
            <th>Facilitador</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th>Periodo</th>
            <th>Salon</th>
            <th>Calificado por facilitador</th>
            <th>Calificado por escolar</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="11">
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
