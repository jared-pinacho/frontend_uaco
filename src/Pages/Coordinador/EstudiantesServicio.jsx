import React, { useEffect, useState } from "react";
import "../Coordinador/EstudiantesServicio.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { EstudiantesLiberacion } from "../../Components/TablaEstudiantes/EstudiantesLiberacion";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { EstudiantesBaja } from "../../Components/TablaEstudiantes/EstudiantesBaja";

export const EstudiantesServicio = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantes2, setEstudiantes2] = useState([]);
  const [modo, setModo] = useState("tabla");
  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [botonesVisibles, setBotonesVisibles] = useState(true); // Inicialmente visibles

  
  const obtenerEstudiantes = () => {
    axios
      .get(`${apiUrl}obc/estudiantes/estudiantess/prestadores/tramite`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEstudiantes(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  };


  const obtenerEstudiantes2 = () => {
    axios
      .get(`${apiUrl}obc/estudiantes/estudiantess/servicio/bajas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEstudiantes2(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  };




  






  useEffect(() => {
    obtenerEstudiantes();
    obtenerEstudiantes2();
  
   
   
  }, []);

  
  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setEstudianteAEditar("");
   
  };
  
  return (
    <div className="estudiantesPage">
      <div className="contenidoDinamico">
        <div className="tituloEstudiantes">
        <h1>Estudiantes prestadores de servicio</h1>
      </div>
      
       {botonesVisibles && (
        <div className="BtnOpciones">
  <>
    <BotonCRUD
      modoActual={modo}
      modo="tabla"
      texto="Prestadores"
      cambiarModo={cambiarModo}
    />
    <BotonCRUD
      modoActual={modo}
      modo="bajas"
      texto="Bajas"
      cambiarModo={cambiarModo}
    />
    
  </>

        </div>
        )} 


        <div className="barraBusqueda">
           
        </div>
      


        {modo === "tabla" && (
          <>
            <div className="tablaEstudiante">
            <EstudiantesLiberacion
                estudiantes={estudiantes}
                isLoading={isLoading}
              />
            </div>
          </>
        )}


{modo === "bajas" && (
          <>
            <div className="tablaEstudiante">
            <EstudiantesBaja
                estudiantes2={estudiantes2}
                isLoading={isLoading}
                

              />
            </div>
          </>
        )}

       
      
     
      </div>
    </div>
  );
};
