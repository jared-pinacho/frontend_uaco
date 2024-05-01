import React, { useState } from "react";
import "../TablaForaneos/TablaForaneos.css";
import Loader from "../Loader/Loader";


export const TablaForaneos = ({ estudiantes, isLoading, abrirDocumentacion, abrirKardex }) => {
  const [filtro, setFiltro] = useState("");
  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
   
    return (
      estudiante.id_foraneo.toString().toLowerCase().includes(termino) ||
      estudiante.matricula_escolar.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) ||
      estudiante.edad.toString().includes(termino) ||
      estudiante.telefono.includes(termino) ||
      estudiante.correo.toLowerCase().includes(termino) ||
      estudiante.discapacidad.toLowerCase().includes(termino) ||
      estudiante.semestre.toLowerCase().includes(termino) ||
      estudiante.licenciatura.toLowerCase().includes(termino) ||
      estudiante.lenguaindigena.nombre.toLowerCase().includes(termino) ||
      estudiante.institucion.toLowerCase().includes(termino) ||
      estudiante.titular_dep.toLowerCase().includes(termino) ||
      estudiante.resp_seg.toLowerCase().includes(termino) ||
      estudiante.programa.toLowerCase().includes(termino) ||
      estudiante.horas.toLowerCase().includes(termino) ||
      estudiante.fecha_inicio.toLowerCase().includes(termino) ||
      estudiante.fecha_final.toLowerCase().includes(termino) 
     

    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr key={index} >
      <td>{estudiante.id_foraneo}</td>  
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.edad}</td>
      <td>{estudiante.telefono}</td>
      <td>{estudiante.correo}</td>
      <td>{estudiante.discapacidad}</td>
      <td>{estudiante.lenguaindigena.nombre}</td>
      <td>{estudiante.semestre}</td>
      <td>{estudiante.licenciatura}</td>
      <td>{estudiante.matricula_escolar}</td>  
      <td>{estudiante.institucion}</td>
      <td>{estudiante.titular_dep}</td>
      <td>{estudiante.resp_seg}</td>
      <td>{estudiante.programa}</td>
      <td>{estudiante.horas}</td>
      <td>{estudiante.fecha_inicio}</td>
      <td>{estudiante.fecha_final}</td>
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
          <th>Identificador</th>
          
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Edad</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Discapacidad</th>
            <th>Lengua indigena</th>
            <th>Semestre</th>
            <th>Carrera</th>
            <th>Matricula</th>
            
            <th>Institución</th>
            <th>Titular</th>
            <th>Responsable </th>
            <th>Programa</th>
            <th>Horas</th>
            <th>Fecha inicio</th>
            <th>Fecha termino</th>            
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
