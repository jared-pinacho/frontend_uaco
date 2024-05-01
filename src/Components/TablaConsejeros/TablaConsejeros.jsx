import React, { useState, useEffect } from "react";
import "../TablaConsejeros/TablaConsejeros.css";
// import axios from "axios";
import Loader from "../Loader/Loader";
// const apiUrl = "http://127.0.0.1:8000/api/";
export const TablaConsejeros = ({ consejeros, isLoading }) => {
  const filas = consejeros.map((consejero, index) => (
    <tr key={index}>
      <td>{consejero.matricula}</td>
      <td>{consejero.nombre}</td>
      <td>{consejero.apellido_paterno}</td>
      <td>{consejero.apellido_materno}</td>
      <td>{consejero.nacionalidad.nombre}</td>
      <td>{String(consejero.id_nacionalidad) === "2" ? consejero.curp : "No aplica"}</td>
      <td>{consejero.rfc}</td>
      <td>{consejero.nivel_educativo}</td>
      <td>{consejero.cuc.nombre}</td>
    {/* {<td>{consejero.usuario.email}</td> } */}
      <td>{consejero.telefono}</td>
      <td>{consejero.telefono_emergencia}</td>
      <td>{consejero.tiposangre.nombre}</td>
      <td>{consejero.padecimiento}</td>
      <td>{consejero.direccion.calle}</td>
      <td>{consejero.direccion.num_exterior}</td>
      <td>{consejero.direccion.colonia.nombre}</td>
      <td>{consejero.direccion.colonia.municipio.nombre}</td>
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
            <th>CUC</th>
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
              <td colSpan="18">
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
