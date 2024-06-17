import React, { useEffect, useState } from "react";
import "../TablaEstudiantes/TablaEstudiantes.css";
import Loader from "../Loader/Loader";



export const EstudiantesBaja = ({ estudiantes2, isLoading }) => {
  const [filtro, setFiltro] = useState("");

let cuc;



  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filasFiltradas = estudiantes2.filter((estudiante) => {
    const termino = filtro.toLowerCase();
     cuc= estudiante.cuc_nombre.substring(39);
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) 
    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr
      key={index}
      className= 'irregularese' 
    >
      <td>{estudiante.matricula}</td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.usuario.email}</td>
      <td>{estudiante.telefono}</td>
      <td>{cuc}</td>
      <td>{estudiante.estado_tramite}</td>
      <td>{estudiante.nombre_dep}</td>
      <td>{estudiante.programa}</td>
      <td>{estudiante.fecha_ini}</td>
      <td>{estudiante.fecha_fin}</td>
      <td>{estudiante.edad}</td>
      <td>{estudiante.semestre}</td>
      <td>{estudiante.padecimiento}</td>
      <td>{estudiante.direccion.calle}</td>
      <td>{estudiante.direccion.num_exterior}</td>
      <td>{estudiante.direccion.colonia.nombre}</td>
      <td>{estudiante.direccion.colonia.municipio.nombre}</td>
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
            <th>Cuc</th>
            <th>Estatus</th>
            <th>Dependencia</th>
            <th>Programa</th>
            <th>Fecha inicio</th>
            <th>Fecha final</th>
            <th>Edad</th>
            <th>Semestre</th>
            <th>Padecimiento</th>
            <th>Calle</th>
            <th>Numero exterior</th>
            <th>Colonia</th>
            <th>Municipio</th>
         
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
