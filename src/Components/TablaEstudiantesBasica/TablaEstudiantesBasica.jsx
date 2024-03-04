import React, { useState } from "react";
import "../TablaEstudiantesBasica/TablaEstudiantesBasica.css";
import Loader from "../Loader/Loader";
export const TablaEstudiantesBasica = ({
  metodoDesociar,
  estudiantes,
  isLoading,
}) => {
  const [filtro, setFiltro] = useState("");
  const [formData, setFormData] = useState({
    clave_clase: "",
    matricula: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      estudiante.semestre.toLowerCase().includes(termino) ||
      estudiante.edad.toString().includes(termino)
    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr key={index}>
      <td>{estudiante.matricula}</td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.edad}</td>
      <td>{estudiante.semestre}</td>
      <td>{estudiante.grupo.nombre}</td>
    </tr>
  ));
  return (
    <div className="table-responsive contenedor">
      <div className="opcionesBusqueda">
        <div className="divCampoBusqueda">
          <input
            className="campoBusqueda"
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>

        <div className="eliminarEstudiante">
          <input
            type="text"
            name="matricula"
            placeholder="Introduzca la matricula del estudiante para eliminarlo"
            value={formData.matricula}
            onChange={handleChange}
          />
          <button onClick={()=>metodoDesociar(formData.matricula)} className="btnE">Eliminar</button>
        </div>
      </div>

      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Edad</th>
            <th>Semestre</th>
            <th>Grupo</th>
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
