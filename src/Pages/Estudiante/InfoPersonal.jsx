import React, { useEffect, useState } from "react";
import "../Estudiante/InfoPersonal.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { FormInfoPersonal } from "../../Components/Servicio/FormInfoPersonal";

export const InfoPersonal = () => {
  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);


  useEffect(() => {
    handleBuscarEstudiante();
    
  }, []); // El array vacío como segundo argumento asegura que el efecto se ejecute solo una vez, equivalente a componentDidMount

  
  const actualizarTabla = () => {
    handleBuscarEstudiante();
  };

   // Función para forzar el re-renderizado del componente hijo
   const forceReloadChild = () => {
    setReloadKey(prevKey => prevKey + 1); // Cambiar la clave para forzar el re-renderizado
  };


  const handleBuscarEstudiante = () => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}estudiantes/informacion/general`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
       
        setEstudianteAEditar(response.data.data);

        setIsLoading(false);
      })
      .catch((error) => {
        //Para limpiar el formulario cuando no se encuentre la clave ingresada
        setIsLoading(false);
        // setEstudianteAEditar("");
        toast.error("Verifique los datos ingresados");
      });
  };

  return (
    <div className="estudiantesPage">
      <div className="contenidoDinamico">
        <div className="tituloEstudiantes">
          <h1>Información personal</h1>
        </div>

        {isLoading ? (
          <div className="cargando">Obteniendo datos, por favor espere...</div>
        ) : null}
      </div>

      <FormInfoPersonal
        isLoading={isLoading}
        estudianteAEditar={estudianteAEditar}
        
        key={reloadKey} // Clave para forzar re-renderizado
        actualizarTabla={forceReloadChild} // Pasar la función para forzar re-rend
       
      />
    </div>
  );
};
