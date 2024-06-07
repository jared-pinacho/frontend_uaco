import React, { useEffect, useState } from "react";
import "../Escolar/AnunciosPage.css";
import axios from "axios";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { TablaAnuncios } from "../../Components/TablaAnuncios/TablaAnuncios";
import { FormularioAnuncios } from "../../Components/FormularioAnuncios/FormularioAnuncios";

export const AnunciosPage = () => {
  const [anuncios, setAnuncios] = useState([]);
  const [modo, setModo] = useState("tabla");
  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  
  const obtenerAnuncios = () => {
    axios
      .get(`${apiUrl}obc/anuncios/cuc`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAnuncios(response.data.data);
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
    obtenerAnuncios(); 
  }, []);

  const actualizarTabla = () => {
    obtenerAnuncios();
    setModo("tabla");
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
      .get(`${apiUrl}anuncio/${clave}`, {
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
          <h1>Anuncios y vacantes</h1>
        </div>
        <div className="BtnOpciones">
          <BotonCRUD
            modoActual={modo}
            modo="tabla"
            texto="Anuncios"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="agregar"
            texto="Agregar"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="editar"
            texto="Editar"
            cambiarModo={cambiarModo}
          />
          {/* <BotonCRUD
                        modoActual={modo}
                        modo="eliminar"
                        texto="Eliminar"
                        cambiarModo={cambiarModo}
                    /> */}
        </div>
        <div className="barraBusqueda">
          {modo === "editar" || modo === "eliminar" ? (
            <BarraBusquedaC
              placeholdero="Identificador de anuncio"
              onBuscar={handleBuscarEstudiante}
            />
          ) : null}
          {isLoading && (modo === "editar" || modo === "eliminar") ? (
            <div className="cargando">
              Obteniendo datos, por favor espere...
            </div>
          ) : null}
        </div>
        {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
          <FormularioAnuncios
            modo={modo}
            estudianteAEditar={estudianteAEditar}
            actualizarTabla={actualizarTabla}
          />
        )}

        {modo === "tabla" && (
          <>
            <div className="tablaEstudiante">
              <TablaAnuncios
                actualizarTabla={actualizarTabla}
                anuncios={anuncios}
                isLoading={isLoading}               
              />
            </div>
          </>
        )}
      

        {/* {estudianteKardex ? (
          <VentanaModalKardex
          abierto={abiertoKardex}
          estudiante={estudianteKardex}
          onCancel={()=>cerrarKardex()}
          />
        ) : null} */}
      </div>
    </div>
  );
};
