import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Consejero/SeleccionCarreraPage.css";
import { TablaCucs } from "../../Components/TablaCucs/TablaCucs";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import { TablaCarreras } from "../../Components/TablaCarreras/TablaCarreras";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const SeleccionCarreraPage = () => {
  const [Cuc, setCuc] = useState([]);
  //const [claveCarrera, setClaveCarrera] = useState("");
  const [CarrerasEspecificasCuc, setCarrerasEspecificasCuc] = useState([]);
  const [modo, setModo] = useState("agregar");
  //const [carreraADesasociar, setCarreraADesasociar] = useState("");
  // const [claveCuc, setClaveCuc] = useState("20USU0040M"); 
  const apiUrl = URL_API;
  const token = Cookies.get('tok');
  const [isLoading, setIsLoading] = useState(true);
  const obtenerCuc = () => {
    axios
      .get(`${apiUrl}consejeros/cuc/especifico`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then((response) => {
        setCuc([response.data.data]);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
        setIsLoading(false);
      });
  };

  const obtenerCarrerasDeCuc = () => {
    axios
      .get(`${apiUrl}cucs/carreras/carreritas`, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then((response) => {
        setCarrerasEspecificasCuc(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        //alert(error.message);
        toast.error("Error al obtener los datos");
        setIsLoading(false);
      });
  };

  const obtenerDatosIniciales = () => {
    obtenerCuc();
    obtenerCarrerasDeCuc();
  };

  useEffect(() => {
    obtenerDatosIniciales();
    //El comentario de abajo lo pones para quitar esa advertencia
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const asociarCarreraConCuc = (datosEnviar) => {
    axios
      .post(`${apiUrl}carreras/asociar-cuc/`, datosEnviar, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        obtenerCarrerasDeCuc();
        //obtenerDatosIniciales();
      })
      .catch((error) => {
        toast.error("Error al obtener los datos:");
      });
  };
  const desasociarCarreraConCuc = (datosEnviar) => {
    axios
      .post(`${apiUrl}carreras/desasociar-cuc/`, datosEnviar, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        obtenerCarrerasDeCuc();
        //obtenerDatosIniciales();
      })
      .catch((error) => {
        // console.log(error);
        toast.error(error.response.data.message);
      });
  };
  const asociar = (claveCarrera) => {
    if(!claveCarrera){
      toast.info("Primero seleccione un programa");
      return
    }
    const datosEnviar = {
      carreraId: claveCarrera,
    };
    // console.log(datosEnviar);
    asociarCarreraConCuc(datosEnviar);
  };

  const desasociar = (claveCarrera) => {
    if(!claveCarrera){
      toast.info("Primero seleccione un programa");
      return
    }
    const datosEnviar = {
      carreraId: claveCarrera
    };
    // console.log(datosEnviar);
    desasociarCarreraConCuc(datosEnviar);
    setModo("agregar");
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
  };

  return (
    <div className="seleccionCarreras">
      <div className="contenidoD">
        <div className="tituloC">
          <h1>Seleccionar Programas para Cuc</h1>
        </div>

        <div className="tablaCuc">
          <TablaCucs cucs={Cuc} isLoading={isLoading}/>
        </div>
        <div className="BtnOpciones">
          <BotonCRUD
            modoActual={modo}
            modo="agregar"
            texto="Agregar"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="eliminar"
            texto="Eliminar"
            cambiarModo={cambiarModo}
          />
        </div>
        <div className="botonSeleccionarCarrera">
          {modo === "agregar" ? (
            <BarraSelect
              urlOpciones={`${apiUrl}carreras/`}
              txtBoton="Agregar programa"
              clave={"clave_carrera"}
              mostrar={"nombre"}
              metodo={asociar}
            />
          ) : null}
          {modo === "eliminar" ? (
            <BarraSelect
              urlOpciones={`${apiUrl}cucs/carreras/carreritas`}
              txtBoton="Eliminar carrera"
              clave={"clave_carrera"}
              mostrar={"nombre"}
              metodo={desasociar}
            />
          ) : null}
        </div>
        <div className="tablaC">
          <TablaCarreras carreras={CarrerasEspecificasCuc} isLoading={isLoading}/>
        </div>
      </div>
    </div>
  );
};
