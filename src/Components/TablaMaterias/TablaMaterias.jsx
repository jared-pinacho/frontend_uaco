import React from 'react'
import Loader from '../Loader/Loader';
import "../TablaMaterias/TablaMaterias.css";
export const TablaMaterias = ({ materias, isLoading }) => {
  const filas = materias.map((materia, index) => (
    <tr key={index}>
      <td>{materia.clave_materia}</td>
      <td>{materia.nombre}</td>
      <td>{materia.creditos}</td>
    </tr>
  ));
  return (
    <div className="table-responsive contenedorTablaMaterias">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Clave materia</th>
            <th>Nombre</th>
            <th>Créditos</th>
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
  )
}
