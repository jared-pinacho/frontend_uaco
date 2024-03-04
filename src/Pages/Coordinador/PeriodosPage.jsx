import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Coordinador/PeriodosPage.css";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { TablaPeriodos } from "../../Components/TablaPeriodos/TablaPeriodos";
import { FormularioPeriodos } from "../../Components/FormularioPeriodos/FormularioPeriodos";

export const PeriodosPage = () => {
    const [periodos, setPeriodos] = useState([]);
    const [modo, setModo] = useState("tabla");
    const [periodoAEditar, setPeriodoAEditar] = useState("");
    const apiUrl = URL_API;
    const token = Cookies.get('tok');
  const [isLoading, setIsLoading] = useState(true);
  
  const obtenerPeriodos=()=>{
    axios
            .get(`${apiUrl}periodos/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log(response);
                setPeriodos(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error("Error al obtener los datos de los periodos");
                setIsLoading(false);
            });
  }

  useEffect(() => {
    obtenerPeriodos();
  }, []);

  const actualizarTabla = () => {
    obtenerPeriodos();
    setModo("tabla");
};

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setPeriodoAEditar("");
    // setCucAEliminar("");
  };

  const handleBuscarPeriodo = (clave) => {
    if (clave === "") {
      toast.info('El campo esta vacio, ingrese una clave');
      return
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}periodos/${clave}`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then((response) => {
        setPeriodoAEditar(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        //Para limpiar el formulario cuando no se encuentre la clave ingresada
        setIsLoading(false);
        setPeriodoAEditar("");
        toast.error('Verifique los datos ingresados');
      });
    
  };

  return (
    <div className="periodosPage">
      <div className="contenidoDinamico">
        <div className="tituloPeriodos">
          <h1>Periodos</h1>
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
            <BarraBusquedaC placeholdero='Ingrese clave Periodo' onBuscar={handleBuscarPeriodo} />
          ) : null}
          {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
        </div>
        {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
          <FormularioPeriodos
            modo={modo}
            periodoAEditar={periodoAEditar}
            actualizarTabla={actualizarTabla}
          />
        )}

        {modo === "tabla" &&
          <div className="tabla">
            <TablaPeriodos periodos={periodos} isLoading={isLoading}/>
          </div>
        }

      </div>
    </div>
  )
}

