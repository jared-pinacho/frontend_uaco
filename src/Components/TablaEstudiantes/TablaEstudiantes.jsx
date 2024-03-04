import React, { useState } from "react";
import "../TablaEstudiantes/TablaEstudiantes.css";
import Loader from "../Loader/Loader";
export const TablaEstudiantes = ({ estudiantes, isLoading, abrirDocumentacion, abrirKardex }) => {
  const [filtro, setFiltro] = useState("");
  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) ||
      estudiante.edad.toString().includes(termino) ||
      estudiante.nacionalidad.nombre.toLowerCase().includes(termino) ||
      estudiante.curp.toLowerCase().includes(termino) ||
      estudiante.nivel_educativo.toLowerCase().includes(termino) ||
      estudiante.usuario.email.toLowerCase().includes(termino) ||
      estudiante.telefono.includes(termino) ||
      estudiante.telefono_emergencia.includes(termino) ||
      estudiante.tiposangre.nombre.toLowerCase().includes(termino) ||
      estudiante.padecimiento.toLowerCase().includes(termino) ||
      estudiante.direccion.calle.toLowerCase().includes(termino) ||
      estudiante.direccion.num_exterior.toLowerCase().includes(termino) ||
      estudiante.direccion.colonia.nombre.toLowerCase().includes(termino) ||
      estudiante.direccion.colonia.municipio.nombre
        .toLowerCase()
        .includes(termino) ||
      estudiante.grupo.nombre.toLowerCase().includes(termino) ||
      estudiante.grupo.carrera.nombre.toLowerCase().includes(termino) ||
      estudiante.lenguaindigena.nombre.toLowerCase().includes(termino) ||
      estudiante.puebloindigena.nombre.toLowerCase().includes(termino) ||
      estudiante.estatus.toLowerCase().includes(termino) ||
      estudiante.regular.toLowerCase().includes(termino)
    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr key={index} className={estudiante.estatus!=="Activo"?"inactivo":estudiante.regular!=="Si"?"irregular":""}>
      <td>{estudiante.matricula}</td>
      <td><button className="btnDoc" onClick={()=>abrirDocumentacion(estudiante)}>Ver</button></td>
      <td><button className="btnDoc" onClick={()=>abrirKardex(estudiante)}>Ver</button></td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.edad}</td>
      <td>{estudiante.nacionalidad.nombre}</td>
      <td>{String(estudiante.id_nacionalidad) === "2" ? estudiante.curp : "No aplica"}</td>
      <td>{estudiante.nivel_educativo}</td>
      <td>{estudiante.usuario.email}</td>
      <td>{estudiante.telefono}</td>
      <td>{estudiante.telefono_emergencia}</td>
      <td>{estudiante.tiposangre.nombre}</td>
      <td>{estudiante.padecimiento}</td>
      <td>{estudiante.direccion.calle}</td>
      <td>{estudiante.direccion.num_exterior}</td>
      <td>{estudiante.direccion.colonia.nombre}</td>
      <td>{estudiante.direccion.colonia.municipio.nombre}</td>
      <td>{estudiante.grupo.carrera.nombre}</td>
      <td>{estudiante.grupo.nombre}</td>
      <td>{estudiante.semestre}</td>
      <td>{estudiante.lenguaindigena.nombre}</td>
      <td>{estudiante.puebloindigena.nombre}</td>
      <td>{estudiante.estatus}</td>
      <td>{estudiante.regular}</td>
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
            <th>Documentacion</th>
            <th>Kardex</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Edad</th>
            <th>Nacionalidad</th>
            <th>CURP</th>
            <th>Nivel educativo</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Telefono emergencia</th>
            <th>Tipo de sangre</th>
            <th>Padecimiento</th>
            <th>Calle</th>
            <th>Numero exterior</th>
            <th>Colonia</th>
            <th>Municipio</th>
            <th>Programa</th>
            <th>Grupo</th>
            <th>Semestre</th>
            <th>Lengua indigena</th>
            <th>Pueblo indigena</th>
            <th>Estatus</th>
            <th>Regular</th>
            
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
