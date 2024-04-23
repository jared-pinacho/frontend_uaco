import React, { useEffect, useState } from "react";
import "../Estudiante/TramiteServicio.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { FormInfoSocial } from "../../Components/FormularioServicio/FormInfoSocial";
import "../Escolar/EstudiantesPage.css";
import { UpSideBar } from "../../Components/BarraFases/UpSideBar";

export const TramiteServicio = () => {
  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);


  useEffect(() => {
    handleBuscarEstudiante();
    
  }, []);

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
      .get(`${apiUrl}servicio/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setEstudianteAEditar(response.data.data);
        setIsLoading(false);
        
      })
      .catch((error) => {
        //Para limpiar el formulario cuando no se encuentre la clave ingresada
        setIsLoading(false);
        setEstudianteAEditar("");
     //   toast.error("Verifique los datos ingresados");
      });
  };

  return (
    <div className="estudiantesPage">
      <div className="contenidoDinamico"></div>
      
   

      <div className="barraBusqueda">
        {isLoading ? (
          <div className="cargando-letra">Obteniendo datos, por favor espere...</div>
        ) : null}
      </div>

      <FormInfoSocial
      isLoading={isLoading}
      estudianteAEditar={estudianteAEditar}
      actualizarTabla={forceReloadChild} // Pasar la función para forzar re-rend

      key={reloadKey}
       
      />
     
    </div>
  );
};
