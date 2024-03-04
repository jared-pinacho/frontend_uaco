import React from "react";
import "../TablaCarreras/TablaCarreras.css";
import Loader from "../Loader/Loader";
export const TablaCarreras = ({ carreras, isLoading }) => {
  const filas = carreras.map((carrera, index) => (
    <tr key={index}>
      <td>{carrera.clave_carrera}</td>
      <td>{carrera.nombre}</td>
      <td>{carrera.creditos}</td>
      <td>{carrera.duracion}</td>
      <td>{carrera.periodicidad}</td>
      <td>{carrera.grado}</td>
      <td>{carrera.modalidad}</td>
    </tr>
  ));
  return (
    <div className="table-responsive contenedorTablaCarreras">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Clave Programa</th>
            <th>Nombre</th>
            <th>Créditos</th>
            <th>Ciclos Escolares</th>
            <th>Periodicidad</th>
            <th>Grado</th>
            <th>Modalidad</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="7">
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
