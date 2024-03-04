import React, { useState } from "react";
import "../TablaSeleccionEstudiantes/TablaSeleccionEstudiantes.css";
import Loader from "../Loader/Loader";
export const TablaSeleccionEstudiantes = ({
  datoform,
  estudiantes,
  isLoading,
  form,
  clave,
  onCheckboxChange,
}) => {
  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState([]);
  const [filtro, setFiltro] = useState("");
  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    // console.log(value);
    const updatedEstudiantes = [...form[datoform]];
    // console.log(updatedEstudiantes);
    if (updatedEstudiantes.includes(value)) {
      // console.log("si");
      updatedEstudiantes.splice(updatedEstudiantes.indexOf(value), 1);
    } else {
      // console.log("no");
      updatedEstudiantes.push(value);
    }
    onCheckboxChange(updatedEstudiantes);
  };
  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      estudiante.grupo.nombre.toLowerCase().includes(termino) ||
      estudiante.grupo.clave_carrera.toLowerCase().includes(termino) ||
      estudiante.estatus.toLowerCase().includes(termino) ||
      estudiante.regular.toLowerCase().includes(termino)
    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr key={index}>
      <td>
        <input
          type="checkbox"
          name={[clave]}
          value={estudiante[clave]}
          checked={form[datoform].includes(estudiante[clave].toString())}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{estudiante.matricula}</td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.grupo.nombre}</td>
      <td>{estudiante.grupo.clave_carrera}</td>
      <td>{estudiante.estatus}</td>
      <td>{estudiante.regular}</td>
    </tr>
  ));
  return (
    <div className="table-responsive contenedorTablaSeleccionEstudiantes">
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
            <th>Seleccion</th>
            <th>Matricula</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Grupo</th>
            <th>Clave_carrera</th>
            <th>Estatus</th>
            <th>Regular</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="16">
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
