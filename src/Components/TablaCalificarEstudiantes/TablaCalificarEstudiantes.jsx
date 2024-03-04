import React, { useState } from "react";
import "../TablaSeleccionEstudiantes/TablaSeleccionEstudiantes.css";
import Loader from "../Loader/Loader";
export const TablaCalificarEstudiantes = ({
  clase,
  estudiantes,
  isLoading,
  asistencias,
  calificacionesNumericas,
  calificacionesTexto,
  retroalimentaciones,
  setAsistencias,
  setCalificacionesNumericas,
  setCalificacionesTexto,
  setRetroalimentaciones,
}) => {
  const [filtro, setFiltro] = useState("");
  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino)
      //   ||
      //   estudiante.grupo.clave_carrera.toLowerCase().includes(termino)
    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr key={index}>
      <td>{estudiante.matricula}</td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      {/* <td>{estudiante.grupo.clave_carrera}</td> */}
      {clase.status_facilitador ? (
        <>
          <td>
            <input
              type="number"
              value={estudiante.calificacion??""}
              disabled={true}
            />
          </td>
          <td>
            <input
              type="text"
              value={estudiante.calificacion_letra??""}
              disabled={true}
            />
          </td>
          <td>
            <input
              type="text"
              value={estudiante.retroalimentacion??""}
              disabled={true}
            />
          </td>
          <td>
            <input
              type="number"
              value={estudiante.asistencia??""}
              disabled={true}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <input
              type="number"
              placeholder="Solo numeros"
              value={calificacionesNumericas[index] ?? ""}
              onChange={(e) => {
                const newCalificacionesNumericas = [...calificacionesNumericas];
                newCalificacionesNumericas[index] = e.target.value;
                setCalificacionesNumericas(newCalificacionesNumericas);
              }}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Solo letras"
              value={calificacionesTexto[index] ?? ""}
              onChange={(e) => {
                const newCalificacionesTexto = [...calificacionesTexto];
                newCalificacionesTexto[index] = e.target.value;
                setCalificacionesTexto(newCalificacionesTexto);
              }}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder="Retroalimentación"
              value={retroalimentaciones[index] ?? ""}
              onChange={(e) => {
                const newRetroalimentaciones = [...retroalimentaciones];
                newRetroalimentaciones[index] = e.target.value;
                setRetroalimentaciones(newRetroalimentaciones);
              }}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Solo numeros"
              value={asistencias[index] ?? ""}
              onChange={(e) => {
                const newAsistencias = [...asistencias];
                newAsistencias[index] = e.target.value;
                setAsistencias(newAsistencias);
              }}
            />
          </td>
        </>
      )}
    </tr>
  ));
  return (
    <div className="table-responsive contenedor">
      <input
        className="campoBusqueda"
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            {/* <th>Clave_carrera</th> */}
            <th>Calificacion (0 - 100)*</th>
            <th>Calificacion (solo letras)*</th>
            <th>Retroalimentacion</th>
            <th>Asistencia (0 - 100 %)*</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="8">
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
