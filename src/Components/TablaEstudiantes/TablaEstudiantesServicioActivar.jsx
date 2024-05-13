import React, { useState } from "react";
import "../TablaEstudiantes/TablaEstudiantes.css";
import Loader from "../Loader/Loader";


export const TablaEstudiantesServicioActivar = ({candidatos,isLoading,activarServicio}) => {


  const [filtro, setFiltro] = useState("");
  const filasFiltradas = candidatos.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    const nombreCompleto =
      `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) ||
      estudiante.edad.toString().includes(termino) ||
      estudiante.nacionalidad.nombre.toLowerCase().includes(termino) ||
      estudiante.curp.toLowerCase().includes(termino) ||
      estudiante.nivel_educativo.toLowerCase().includes(termino) ||
      estudiante.usuario.email.toLowerCase().includes(termino) ||
      estudiante.telefono.includes(termino) ||
      estudiante.telefono_emergencia.includes(termino) ||
      estudiante.tiposangre.nombre.toLowerCase().includes(termino) ||
      estudiante.padecimiento.toLowerCase().includes(termino) ||
      estudiante.direccion.calle.toLowerCase().includes(termino) ||
      estudiante.direccion.num_exterior.toLowerCase().includes(termino) ||
      estudiante.direccion.colonia.nombre.toLowerCase().includes(termino) ||
      estudiante.direccion.colonia.municipio.nombre
        .toLowerCase()
        .includes(termino) ||
      estudiante.grupo.nombre.toLowerCase().includes(termino) ||
      estudiante.grupo.carrera.nombre.toLowerCase().includes(termino) ||
      estudiante.lenguaindigena.nombre.toLowerCase().includes(termino) ||
      estudiante.puebloindigena.nombre.toLowerCase().includes(termino) ||
      estudiante.estatus.toLowerCase().includes(termino) ||
      estudiante.regular.toLowerCase().includes(termino)
    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr
      key={index}
      className={
        estudiante.estatus !== "Activo"
          ? "inactivo"
          : estudiante.regular !== "Si"
          ? "irregular"
          : ""
      }
    >
      <td>{estudiante.matricula}</td>

      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.usuario.email}</td>
      <td>{estudiante.telefono}</td>
      <td>{estudiante.semestre}</td>
      <td>{estudiante.creditos_acumulados}</td>
      <td>
        <button
          className="btnDoc"
          onClick={() => activarServicio(estudiante.matricula)}
        >
          Activar
        </button>
      </td>
    </tr>
  ));
  return (
    <div className="table-responsive contenedorTablaEstudiantes">
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
            <th>Correo</th>
            <th>Telefono</th>
            <th>Semestre</th>
            <th>Creditos acumulados</th>
            <th>Activacion</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="25">
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
