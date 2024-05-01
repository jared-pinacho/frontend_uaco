import React from "react";
import "../TablaFacilitadores/TablaFacilitadores.css";
import axios from "axios";
import Loader from "../Loader/Loader";
export const TablaFacilitadores = ({ facilitadores, isLoading }) => {
  const filas = facilitadores.map((facilitador, index) => (
    <tr key={index}>
      <td>{facilitador.matricula}</td>
      <td>{facilitador.nombre}</td>
      <td>{facilitador.apellido_paterno}</td>
      <td>{facilitador.apellido_materno}</td>
      <td>{facilitador.nacionalidad.nombre}</td>
      <td>{String(facilitador.id_nacionalidad) === "2" ? facilitador.curp : "No aplica"}</td>
      <td>{facilitador.rfc}</td>
      <td>{facilitador.nivel_educativo}</td>
      <td>{facilitador.usuario.email}</td>
      <td>{facilitador.telefono}</td>
      <td>{facilitador.telefono_emergencia}</td>
      <td>{facilitador.tiposangre.nombre}</td>
      <td>{facilitador.padecimiento}</td>
      <td>{facilitador.direccion.calle}</td>
      <td>{facilitador.direccion.num_exterior}</td>
      <td>{facilitador.direccion.colonia.nombre}</td>
      <td>{facilitador.direccion.colonia.municipio.nombre}</td>
    </tr>
  ));

  return (
    <div className="table-responsive contenedorTablaEstudiantes">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Matrícula</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Nacionalidad</th>
            <th>CURP</th>
            <th>RFC</th>
            <th>Nivel Educativo</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Teléfono emergencia</th>
            <th>Tipo de sangre</th>
            <th>Padecimiento</th>
            <th>Calle</th>
            <th>Número exterior</th>
            <th>Colonia</th>
            <th>Municipio</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="17">
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
