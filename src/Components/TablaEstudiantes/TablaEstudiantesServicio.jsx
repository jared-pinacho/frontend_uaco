import React from 'react';
import "../TablaEstudiantes/TablaEstudiantes.css";
import Loader from "../Loader/Loader";
import { useState } from 'react';




export const TablaEstudiantesServicio = ({
  estudiantes,
  isLoading,
}) => {
  const [filtro, setFiltro] = useState("");
  const [datoAPasar, setDatoAPasar] = useState(null);
  
  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) ||
      estudiante.usuario.email.toLowerCase().includes(termino) ||
      estudiante.telefono.includes(termino) 
    );
  });

  function redirectTo(url, data) {
    const queryString = new URLSearchParams(data).toString();
    const fullUrl = `${url}?${queryString}`;
   
    window.location.href = fullUrl;
  }
  
let estatus= "";

  const handleButtonClick = (mat) => {
    // Datos que deseas pasar al siguiente componente
    const dataToSend = mat;
    redirectTo('/escolarInfoPersonal', dataToSend);
  };




 
  
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr
      key={index}
    >
      <td>{estudiante.matricula}</td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.usuario.email}</td>
      <td>{estudiante.telefono}</td>
      <td>{estudiante.estado_tramite}</td>
      <td>
        <button
        //to="/homePage"
          className="btnDoc"
          id={estudiante.matricula}
          onClick={() => handleButtonClick(estudiante.matricula)}
        >
          Ingresar
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
            <th>Momento aprobado</th>
            <th>Perfil</th>
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
