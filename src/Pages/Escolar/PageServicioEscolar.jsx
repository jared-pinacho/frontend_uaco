import React, { useEffect, useState } from "react";
import "../Escolar/PagePersonalEscolar.css";
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { EscolarSocial } from "../../Components/Servicio/EscolarSocial";

export const PageServicioEscolar = ({dato}) => {

  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
 
  

  useEffect(() => {
    handleBuscarEstudiante();

  }, []); // Se ejecuta la funcion al renderizar el componente

  
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
      .get(`${apiUrl}obten/servicio/info/${dato}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setEstudianteAEditar(response.data.data);
        setIsLoading(false);
        console.log(response.data.data);
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
 
      <div className="barraBusquedas">
        {isLoading ? (
          <div className="cargandos">Obteniendo datos, por favor espere...</div>
        ) : null}
      </div>

      <EscolarSocial
      isLoading={isLoading}
      estudianteAEditar={estudianteAEditar}
      actualizarTabla={forceReloadChild} // Pasar la función para forzar re-rend

      key={reloadKey}  
      />
     
    </div>
  );
};
