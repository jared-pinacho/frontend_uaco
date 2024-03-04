import React, { useEffect, useState } from "react";
import "../Escolar/ClasesPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { TablaClases } from "../../Components/TablaClases/TablaClases";
import { FormularioClases } from "../../Components/FormularioClases/FormularioClases";
import { EstudiantesPorClase } from "../../Components/EstudiantesPorClaseData/EstudiantesPorClase";
export const ClasesPage = () => {
  const [clases, setClases] = useState([]);
  const [modo, setModo] = useState("tabla");
  const [claseAEditar, setClaseAEditar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);

  const obtenerClases = () => {
    axios
      .get(`${apiUrl}obe/clases/clasess`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setClases(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de las clases");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    obtenerClases();
    //Si estás seguro de que obtenerGrupos no cambia durante la vida útil del componente y
    //no deseas observarlo como una dependencia, puedes deshabilitar la advertencia utilizando
    //un comentario especial:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actualizarTabla = () => {
    obtenerClases();
    setModo("tabla");
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setClaseAEditar("");
    // setCarreraAEliminar("");
  };

  const handleBuscarClase = (clave) => {
    if (clave === "") {
      toast.info("El campo esta vacio, ingrese una clave");
      return;
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}clases/${clave}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setClaseAEditar(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        //Para limpiar el formulario cuando no se encuentre la clave ingresada
        setClaseAEditar("");
        toast.error("Error al obtener los datos");
      });
  };
  return (
    <div className="clasesPage">
      <div className="contenidoDinamico">
        <div className="tituloClases">
          <h1>Asignaturas</h1>
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
          <BotonCRUD
          modoActual={modo}
          modo="estudiantesClase"
          texto="Estudiantes por asignatura"
          cambiarModo={cambiarModo}
        />
        </div>
        <div className="barraBusqueda">
          {modo === "editar" || modo === "eliminar" ? (
            <BarraBusquedaC
              placeholdero="Ingrese clave de asignatura"
              onBuscar={handleBuscarClase}
            />
          ) : null}
          {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
        </div>
        {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
          <FormularioClases
            modo={modo}
            claseAEditar={claseAEditar}
            actualizarTabla={actualizarTabla}
          />
        )}

        {modo === "tabla" && (
          <div className="tabla">
            <TablaClases clases={clases} isLoading={isLoading} mostrarBuscador={true}/>
          </div>
        )}

        {modo === "estudiantesClase" && (
          <div className="contenidoEstudiantes">
            <EstudiantesPorClase />
          </div>
        )}
      </div>
    </div>
  );
};
