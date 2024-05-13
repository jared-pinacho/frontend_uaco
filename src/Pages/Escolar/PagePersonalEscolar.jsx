import React, { useEffect, useState } from "react";
import "../Escolar/PagePersonalEscolar.css";
import axios from "axios"
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { EscolarPersonal } from "../../Components/Servicio/EscolarPersonal";


export const PagePersonalEscolar = ({dato}) => {

  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
 
  

  useEffect(() => {
    handleBuscarEstudiante();
    // Mostrar el valor resultante

  }, []); 
  
  const actualizarTabla = () => {
    handleBuscarEstudiante();
  };

   // Función para forzar el re-renderizado del componente hijo
   const forceReloadChild = () => {
    setReloadKey(prevKey => prevKey + 1); // Cambiar la clave para forzar el re-renderizado
  };


  const handleBuscarEstudiante = (clave) => {
    
    setIsLoading(true);
    axios
      .get(`${apiUrl}estudiantes/${dato}`, {
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
        
      });
  };




  return (
    <div className="estudiantesPag">
      <div className="contenidoDinamic"></div>
      
    

      <div className="barraBusquedas">
        {isLoading ? (
          <div className="cargandos">Obteniendo datos, por favor espere...</div>
        ) : null}
      </div>

      <EscolarPersonal
      isLoading={isLoading}
      estudianteAEditar={estudianteAEditar}
      actualizarTabla={forceReloadChild} // Pasar la función para forzar re-rend

      key={reloadKey}
    
      
       
      />
     
    </div>
  );
};
