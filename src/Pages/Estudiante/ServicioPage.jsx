

import React, { useEffect, useState } from "react";
import "../Estudiante/ServicioPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { FormInfoSocial } from "../../Components/FormularioServicio/FormInfoSocial";
import { EstudianteInfo } from "../../Components/PresentaInfo/EstudianteInfo"
import { AvisosInfo } from "../../Components/PresentaAvisos/AvisosInfo";



export const ServicioPage = () => {

const [estudianteAEditar, setEstudianteAEditar] = useState("");
const [avisos, setAvisos] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    handleBuscarEstudiante();
    handleBuscarAvisos();
  }, []);


  const handleBuscarEstudiante = () => {
    setIsLoading(true);
    
    axios
      .get(`${apiUrl}infoPage`, {
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



  const handleBuscarAvisos = () => {
    setIsLoading(true);
    
    axios
      .get(`${apiUrl}anuncios/Cuc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setAvisos(response.data.data);
        setIsLoading(false);
        
      })
      .catch((error) => {
        //Para limpiar el formulario cuando no se encuentre la clave ingresada
        setIsLoading(false);
        setAvisos("");
     //   toast.error("Verifique los datos ingresados");
      });
  }; 


  return (
    <div className="estudiantesPage">
    <div className="contenidoDinamico">
     
      <EstudianteInfo
      estudianteAEditar={estudianteAEditar}
      isLoading={isLoading}
      />
    
      

<AvisosInfo
      avisos={avisos}
      isLoading={isLoading}
      />

    

    
    </div>
    </div>
  );
};
