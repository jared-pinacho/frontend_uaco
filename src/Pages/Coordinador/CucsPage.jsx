import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Coordinador/CucsPage.css";
import { FormularioCucs } from "../../Components/FormularioCucs/FormularioCucs";
import { TablaCucs } from "../../Components/TablaCucs/TablaCucs";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const CucsPage = (props) => {
  const [cucs, setCucs] = useState([]);
  const [modo, setModo] = useState("tabla");
  const [cucAEditar, setCucAEditar] = useState("");
  const apiUrl = URL_API;
  // const [cucAEliminar, setCucAEliminar] = useState("");
  const token = Cookies.get('tok');
  const [isLoading, setIsLoading] = useState(true);

  const obtenerCucs = () => {

    axios
      .get(`${apiUrl}cucs/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setCucs(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de las CUCs:");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    obtenerCucs();
  }, []);

  const actualizarTabla = () => {
    obtenerCucs(); // Volvemos a obtener los datos de las CUCs
    setModo("tabla");
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setCucAEditar("");
    // setCucAEliminar("");
  };
  const handleBuscarCuc = (clave) => {
    if (clave === "") {
      toast.info('El campo esta vacio, ingrese una clave');
      return
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}cucs/${clave}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCucAEditar(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        //Para limpiar el formulario cuando no se encuentre la clave ingresada
        setIsLoading(false);
        setCucAEditar("");
        toast.error('Verifique los datos ingresados');
      });
    // if (modo === "editar") {
    //   setCucAEditar(clave);
    // }
    //  else if (modo === "eliminar") {
    //   setCucAEliminar(clave);
    // }
  };
  return (
    <div className="cucsPage">
      <div className="contenidoDinamico">
        <div className="tituloCucs">
          <h1>Registro de CUC</h1>
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
        </div>
        <div className="barraBusqueda">
          {modo === "editar" || modo === "eliminar" ? (
            <BarraBusquedaC placeholdero='Ingrese clave CUC' onBuscar={handleBuscarCuc} />
          ) : null}
          {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
        </div>
        {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
          <FormularioCucs
            modo={modo}
            cucAEditar={cucAEditar}
            actualizarTabla={actualizarTabla}
          />
        )}

        {modo === "tabla" &&
          <div className="tabla">
            <TablaCucs cucs={cucs} isLoading={isLoading} />
          </div>
        }

      </div>
    </div>
  );
};
