import React, { useEffect, useState } from "react";
import "../PresentaInfo/EstudianteInfo.css";

export const EstudianteInfo = ({estudianteAEditar}) => {
  const [formData, setFormData] = useState({
    apellidopaterno: "",
    apellidomaterno: "",
    nombre: "",
    email: "",
    matricula: "",
    cuc: "",
    carrera: "",
    semestre: "",
  });

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto estudianteAEditar, llenar el formulario con esos datos.
   
      setFormData({
        nombre: estudianteAEditar.nombre || "",
        apellidopaterno: estudianteAEditar.apellido_paterno || "",
        apellidomaterno: estudianteAEditar.apellido_materno || "",
        email: estudianteAEditar.correo || "",
        matricula: estudianteAEditar.matricula || "",
        cuc: estudianteAEditar.cuc || "",
        carrera: estudianteAEditar.carrera || "",
        semestre: estudianteAEditar.semestre || "",
      });
    
      console.log(formData.apellidopaterno);

  }, [estudianteAEditar]);

  return (
    <div className="contenedor-info">
      <h1>DATOS DEL ESTUDIANTE</h1>

      <div className="contenedor-dos-columnas">
        {/* Primera columna */}
        <div className="columna">
          <div>
            <label className="titulo">Apellido paterno:</label>
            <label className="text">{formData.apellidopaterno}</label>
          </div>
          <div>
            <label className="titulo">Apellido materno:</label>
            <label className="text">{formData.apellidomaterno}</label>
          </div>
          <div>
            <label className="titulo">Nombre(s):</label>
            <label className="text">{formData.nombre}</label>
          </div>
          <div>
            <label className="titulo">Correo electrónico:</label>
            <label className="text">{formData.email}</label>
          </div>
        </div>

        {/* Segunda columna */}
        <div className="columna">
          <div>
            <label className="titulo">Matricula:</label>
            <label className="text-2">{formData.matricula}</label>
          </div>
          <div>
          <label className="titulo">Semestre:</label>
            <label className="text-2">{formData.semestre}</label>
          </div>
          <div>
            <label className="titulo">Carrera</label>
            <label className="text-2">{formData.carrera}</label>
          </div>
          <div >
           
            <label className="titulo">CUC:</label>
            <label className="especial">{formData.cuc}</label>
          </div>
        </div>
      </div>
    </div>
  );
};
