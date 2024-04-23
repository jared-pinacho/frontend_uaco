import React, { useEffect, useState } from "react";
import "../Escolar/EstudiantesPage.css";
import axios from "axios";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { TablaEstudiantes } from "../../Components/TablaEstudiantes/TablaEstudiantes";
import { FormularioEstudiantes } from "../../Components/FormularioEstudiantes/FormularioEstudiantes";
import { VentanaEstadoDocumentacion } from "../../Components/VentanaEstadoDocumentacion/VentanaEstadoDocumentacion";
import { VentanaModalKardex } from "../../Components/VentanaModalKardex/VentanaModalKardex";

import { TablaForaneos } from "../../Components/TablaForaneos/TablaForaneos";
import { FormularioForaneos } from "../../Components/FormularioForaneos/FormularioForaneos";

export const ForaneosPage = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [modo, setModo] = useState("tabla");
  const [estudianteAEditar, setEstudianteAEditar] = useState("");
  const [estudianteDocumentacion, setEstudianteDocumentacion] = useState("");
  const [estudianteKardex, setEstudianteKardex] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [abiertaDocumentacion, setAbiertaDocumentacion] = useState(false);
  const [abiertoKardex, setAbiertoKardex] = useState(false);
  //   const [documentos,setDocumentos]=useState([]);
  const obtenerEstudiantes = () => {
    axios
      .get(`${apiUrl}obc/foraneos/cuc`, {
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

  useEffect(() => {
    obtenerEstudiantes();
    setAbiertaDocumentacion(false);
    setAbiertoKardex(false);
    setEstudianteDocumentacion("");
    setEstudianteKardex("");
  }, []);

  const actualizarTabla = () => {
    obtenerEstudiantes();
    setModo("tabla");
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setEstudianteAEditar("");
    setAbiertaDocumentacion(false);
    setAbiertoKardex(false);
    setEstudianteDocumentacion("");
    setEstudianteKardex("");
  };

  const handleBuscarEstudiante = (clave) => {
    if (clave === "") {
      toast.info("El campo esta vacio, ingrese una matricula");
      return;
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}foraneo/${clave}`, {
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

  const enviarEstadoDocumentacion = (data) => {
    if (!data) {
      toast.info(
        "No hay un estudiante seleccionado para enviar su documentacion"
      );
    }

    axios
      .put(`${apiUrl}documentacion/${data.matricula}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success("Estado de documentacion actualizada");
        actualizarTabla();
        setEstudianteDocumentacion("");
        setAbiertaDocumentacion(false);
      })
      .catch((error) => {
        toast.error("No se pudo actualizar es estado de documentacion");
        setEstudianteDocumentacion("");
        setAbiertaDocumentacion(false);
      });
  };

  const abrirDocumentacion = (estudiante) => {
    if (!estudiante) {
      return;
    }

    setEstudianteDocumentacion(estudiante);
    // setDocumentos(estudiante.documentacion);
    setAbiertaDocumentacion(true);
  };

  const abrirKardex = (estudiante) => {
    if (!estudiante) {
      return;
    }
    setEstudianteKardex(estudiante);
    
    setAbiertoKardex(true);
  };

  const cerrarDocumentacion = () => {
    setEstudianteDocumentacion("");

    // setDocumentos([]);
    setAbiertaDocumentacion(false);
  };

  const cerrarKardex = () => {
    setEstudianteKardex("");
    setAbiertoKardex(false);
  };
  return (
    <div className="estudiantesPage">
      <div className="contenidoDinamico">
        <div className="tituloEstudiantes">
          <h1>Preestadores foráneos</h1>
        </div>
        <div className="BtnOpciones">
          <BotonCRUD
            modoActual={modo}
            modo="tabla"
            texto="Tabla"
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
              placeholdero="Identificador foraneo"
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
          <FormularioForaneos
            modo={modo}
            estudianteAEditar={estudianteAEditar}
            actualizarTabla={actualizarTabla}
          />
        )}

        {modo === "tabla" && (
          <>
            <div className="tablaEstudiante">
              <TablaForaneos
                estudiantes={estudiantes}
                isLoading={isLoading}
                abrirDocumentacion={abrirDocumentacion}
                abrirKardex={abrirKardex}
              />
            </div>
          </>
        )}
        {estudianteDocumentacion ? (
          <VentanaEstadoDocumentacion
            abierto={abiertaDocumentacion}
            estudiante={estudianteDocumentacion}
            enviar={enviarEstadoDocumentacion}
            onCancel={() => cerrarDocumentacion()}
            editable={true}
            grado={
              estudianteDocumentacion &&
              estudianteDocumentacion.grupo &&
              estudianteDocumentacion.grupo.carrera
                ? estudianteDocumentacion.grupo.carrera.grado
                : ""
            }
          />
        ) : null}

        {estudianteKardex ? (
          <VentanaModalKardex
          abierto={abiertoKardex}
          estudiante={estudianteKardex}
          onCancel={()=>cerrarKardex()}
          />
        ) : null}
      </div>
    </div>
  );
};
