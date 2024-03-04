import React, { useState, useEffect } from "react";
import "../TablaCucs/TablaCucs.css";
import axios from "axios";
import Loader from "../Loader/Loader";
export const TablaCucs = ({ cucs, isLoading }) => {
  const filas = cucs.map((cuc, index) => (
    <tr key={index}>
      <td>{cuc.clave_cuc}</td>
      <td>{cuc.nombre}</td>
      <td>{cuc.numero}</td>
      <td>{cuc.direccion.colonia.municipio.estado.nombre}</td>
      <td>{cuc.direccion.colonia.municipio.nombre}</td>
      <td>{cuc.direccion.colonia.nombre}</td>
      <td>{cuc.direccion.calle}</td>
      <td>{cuc.direccion.num_exterior}</td>
      <td>{cuc.direccion.colonia.cp.id_cp}</td>
    </tr>
  ));

  return (
    <div className="table-responsive contenedorTablaCucs">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Clave CUC</th>
            <th>Nombre</th>
            <th>Número de CUC</th>
            <th>Estado</th>
            <th>Municipio</th>
            <th>Colonia</th>
            <th>Calle</th>
            <th>Número Exterior</th>
            <th>Código Postal</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="9">
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
