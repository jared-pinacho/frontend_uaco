import React, { useState, useEffect } from "react";
import "../TablaGrupos/TablaGrupos.css";
import Loader from "../Loader/Loader";
const apiUrl = "http://127.0.0.1:8000/api/";
export const TablaGrupos = ({ grupos, isLoading }) => {
  const filas = grupos.map((grupo, index) => (
    <tr key={index}>
      <td>{grupo.clave_grupo}</td>
      <td>{grupo.nombre}</td>
      <td>{grupo.carrera.nombre}</td>
    </tr>
  ));

  return (
    <div className="table-responsive contenedorTablaGrupos">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Clave del Grupo</th>
            <th>Nombre del Grupo</th>
            <th>Programa</th>
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
