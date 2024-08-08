import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Coordinador/CarrerasPage.css";
//import { OpcionesBoton } from "../Components/OpcionesBoton/OpcionesBoton";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import { TablaCarreras } from "../../Components/TablaCarreras/TablaCarreras";
import { FormularioCarreras } from "../../Components/FormularioCarreras/FormularioCarreras";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const CarrerasPage = () => {
  const [carreras, setCarreras] = useState([]);
  const [carrerasCuc, setCarrerasCuc] = useState([]);
  const [modo, setModo] = useState("tabla");
  const [carreraAEditar, setCarreraAEditar] = useState("");
  // const [carreraAEliminar, setCarreraAEliminar] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get('tok');
  const [isLoading, setIsLoading] = useState(true);
  const obtenerCarreras = () => {
   // console.log(apiUrl);
    axios
      .get(`${apiUrl}carreras`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setCarreras(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de los programas");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    obtenerCarreras();
  }, []);

  const actualizarTabla = () => {
    obtenerCarreras();
    setModo("tabla");
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setCarreraAEditar("");
    // setCarreraAEliminar("");
  };

  const handleBuscarCarrera = (clave) => {
    if (clave === "") {
      toast.info('El campo esta vacio, ingrese una clave');
      return
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}carreras/${clave}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setCarreraAEditar(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        //Para limpiar el formulario cuando no se encuentre la clave ingresada
        setIsLoading(false);
        setCarreraAEditar("");
        toast.error('Verifique los datos ingresados');
      });
    // if (modo === "editar") {
    //   setCarreraAEditar(clave);
    // } 
    // else if (modo === "eliminar") {
    //   setCarreraAEliminar(clave);
    // }
  };
  const carrerasDeCuc = (clave_cuc) => {
    if (clave_cuc === "") {
      setCarrerasCuc([]);
      toast.info('Seleccione una opcion');
      return
    }
    axios
      .get(`${apiUrl}cucs/${clave_cuc}/carreras`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCarrerasCuc(response.data.data);
        //setOpciones(response.data.data);
      })
      .catch((error) => {
        setCarrerasCuc([]);
        toast.error('Error al obtener los datos');
      });
  }
  return (
    <div className="carrerasPage">
      <div className="contenidoDinamico">
        <div className="tituloCarreras">
          <h1>Registro de Programas</h1>
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
            modo="eliminar"
            texto="Eliminar"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="carreraPorCuc"
            texto="Programas Por Cuc"
            cambiarModo={cambiarModo}
          />
        </div>
        <div className="barraBusqueda">
          {modo === "editar" || modo === "eliminar" ? (
            <BarraBusquedaC placeholdero='Ingrese clave del Programa' onBuscar={handleBuscarCarrera} />
          ) : null}
          {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
          {modo === "carreraPorCuc" ? (
            /* <OpcionesBoton cargarCarrerasCuc={setCarrerasCuc} urlOpciones={`${apiUrl}cucs/`}/> */
            <BarraSelect
              urlOpciones={`${apiUrl}cucs`}
              txtBoton="Obtener Programas"
              clave={"clave_cuc"}
              mostrar={"nombre"}
              metodo={carrerasDeCuc}
            />
          ) : null}

        </div>
        {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
          <FormularioCarreras
            modo={modo}
            carreraAEditar={carreraAEditar}
            actualizarTabla={actualizarTabla}
          />
        )}

        {modo === "tabla" &&
          <div className="tabla">
            <TablaCarreras carreras={carreras} isLoading={isLoading} />
          </div>
        }
        {modo === "carreraPorCuc" &&
          <div className="tabla">
            <TablaCarreras carreras={carrerasCuc} isLoading={isLoading} />
          </div>
        }
      </div>
    </div>
  );
};
