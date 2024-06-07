import React, { useEffect, useState } from "react";
import "../Escolar/EscolaresEstudiantes.css";
import axios from "axios";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { TablaEstudiantesServicio } from "../../Components/TablaEstudiantes/TablaEstudiantesServicio";
import { TablaEstudiantesServicioActivar } from "../../Components/TablaEstudiantes/TablaEstudiantesServicioActivar";
import { TablaEstudiantesServicioEliminar } from "../../Components/TablaEstudiantes/TablaEstudiantesServicioEliminar";
export const EscolaresEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [candidatos, setCantidatos] = useState([]);
  const [modo, setModo] = useState("tabla");
  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [botonesVisibles, setBotonesVisibles] = useState(true); // Inicialmente visibles

  
  //   const [documentos,setDocumentos]=useState([]);
  const obtenerEstudiantes = () => {
    axios
      .get(`${apiUrl}obc/estudiantes/estudiantess/prestadores`, {
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


  const obtenerCandidatos = () => {
    axios
      .get(`${apiUrl}obc/estudiantes/estudiantess/candidatos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCantidatos(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  };

  const activarServicio = (matricula) => {
    axios
      .patch(`${apiUrl}obc/estudiantes/matricula/activar/${matricula}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
      //  console.log(response.data);
        // Puedes realizar otras acciones después de que se haya activado el servicio
         
        actualizarTabla();
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error al activar el servicio:", error);
      });
     
  };



  const eliminarServicio = (matricula) => {
    axios
      .patch(`${apiUrl}obc/estudiantes/matricula/cancelar/${matricula}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //console.log(response.data);
        // Puedes realizar otras acciones después de que se haya activado el servicio
         
        tablaActualizar();
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error al activar el servicio:", error);
      });
     
  };






  useEffect(() => {
    obtenerEstudiantes();
    obtenerCandidatos();
   
   
  }, []);

  const actualizarTabla = () => {
   
    obtenerCandidatos();
    setModo("activar");
    obtenerEstudiantes();
  };


  const tablaActualizar = () => {
   
    obtenerCandidatos();
    setModo("cancelar");
    obtenerEstudiantes();
  };


  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setEstudianteAEditar("");
   
  };

  const handleBuscarEstudiante = (clave) => {
    if (clave === "") {
      toast.info("El campo esta vacio, ingrese una matricula");
      return;
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}estudiantes/${clave}`, {
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
        toast.error("Verifique los datos ingresados");
      });
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
      texto="Tabla"
      cambiarModo={cambiarModo}
    />
    <BotonCRUD
      modoActual={modo}
      modo="activar"
      texto="Activar"
      cambiarModo={cambiarModo}
    />
    <BotonCRUD
      modoActual={modo}
      modo="cancelar"
      texto="Cancelar"
      cambiarModo={cambiarModo}
    />
  </>

        </div>
        )}
        <div className="barraBusqueda">
           
        </div>
      

        {modo === "activar" && (
          <>
            <div className="tablaEstudiante">
              <TablaEstudiantesServicioActivar
                candidatos={candidatos}
                isLoading={isLoading}
                activarServicio={activarServicio}

                
              />
            </div>
          </>
        )}

{modo === "cancelar" && (
          <>
            <div className="tablaEstudiante">
              <TablaEstudiantesServicioEliminar
                estudiantes={estudiantes}
                isLoading={isLoading}
                eliminarServicio={eliminarServicio}
                
              />
            </div>
          </>
        )}


        {modo === "tabla" && (
          <>
            <div className="tablaEstudiante">
              <TablaEstudiantesServicio
                estudiantes={estudiantes}
                isLoading={isLoading}
                setBotonesVisibles={setBotonesVisibles}

              />
            </div>
          </>
        )}
     
      </div>
    </div>
  );
};
