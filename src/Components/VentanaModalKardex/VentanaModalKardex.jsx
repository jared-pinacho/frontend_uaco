import React, { useEffect, useState } from "react";
import "../VentanaModalKardex/VentanaModalKardex.css";
import axios from "axios";
import { toast } from "react-toastify";
import { URL_API } from "../../Services/Const";
import Cookies from "js-cookie";
import { TablaKardex } from "../TablaKardex/TablaKardex";
export const VentanaModalKardex = ({ abierto, estudiante, onCancel }) => {
    const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [kardexs, setKardex] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    obtenerKardex();
  }, []);

  const obtenerKardex = () => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}coordi-escolar/estudiantes/${estudiante.matricula}/clases/generales/total`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setKardex(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
        // console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <>
        <div className={`ventanaKardexPrincipal ${abierto ? "open" : ""}`}>
          <div className="tituloVentana">Kardex del estudiante</div>
          <div className="datosEstudiante">{`${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`}</div>
          <div className="opcionesKardex">
            <TablaKardex isLoading={isLoading} data={kardexs}/>
          </div>
          <div className="botonesKardex">
            <button onClick={onCancel} className="cancelar">
              Cerrar
            </button>
          </div>
        </div>
      </>
    </>
  );
};
