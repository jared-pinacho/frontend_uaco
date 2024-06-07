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
    
    

  }, [estudianteAEditar]);

  return (
    <div className="contenedor-info">
      <h1>DATOS DEL ESTUDIANTE</h1>

      <div className="contenedor-dos-columnas">
        {/* Primera columna */}
        <div className="columna">
          <div>
            <label className="titu">Apellido paterno:</label>
            <label className="text">{formData.apellidopaterno}</label>
          </div>
          <div>
            <label className="titu">Apellido materno:</label>
            <label className="text">{formData.apellidomaterno}</label>
          </div>
          <div>
            <label className="titu">Nombre(s):</label>
            <label className="text">{formData.nombre}</label>
          </div>
          <div>
            <label className="titu">Correo electrónico:</label>
            <label className="text">{formData.email}</label>
          </div>
        </div>

        {/* Segunda columna */}
        <div className="columna">
          <div>
            <label className="titu">Matricula:</label>
            <label className="text-2">{formData.matricula}</label>
          </div>
          <div>
          <label className="titu">Semestre:</label>
            <label className="text-2">{formData.semestre}</label>
          </div>
          <div>
            <label className="titu">Carrera</label>
            <label className="text-2">{formData.carrera}</label>
          </div>
          <div >
           
            <label className="titu">CUC:</label>
            <label className="especial">{formData.cuc}</label>
          </div>
        </div>
      </div>
    </div>
  );
};
