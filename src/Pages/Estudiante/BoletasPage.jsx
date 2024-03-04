import React, { useEffect, useState } from "react";
import "../Estudiante/BoletasPage.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../../Components/SelecInput/SelectInput";
import { TablaBoleta } from "../../Components/TablaBoleta/TablaBoleta";
export const BoletasPage = () => {
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [periodos, setPeriodos] = useState([]);
  const [clases, setClases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id_periodo: "",
  });
  useEffect(() => {
    obtenerPeriodos();
  }, []);
  useEffect(() => {
    setClases([]);
  }, [formData.id_periodo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const obtenerPeriodos = () => {
    axios
      .get(`${apiUrl}estudiantes/pertenece/periodos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setPeriodos(response.data.data);
      })
      .catch((error) => {
        setPeriodos([]);
        // console.log(error);
        toast.error("Error al obtener los periodos");
      });
  };

  const obtenerBoleta = () => {
    if (!formData.id_periodo) {
      toast.info("Primero seleccione un periodo");
      return;
    }setIsLoading(true);
    axios
      .get(`${apiUrl}estudiantes/clases/periodo/${formData.id_periodo}`, {
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
        setIsLoading(false);
        setClases([]);
        // console.log(error);
        toast.error("Error al obtener los datos");
      });
  };
  return (
    <div className="boletasPage">
      <div className="tituloboletas">
        <h1>Boletas</h1>
      </div>
      <div className="opcionesIniciales">
        <div className="opcion">
          <label>Periodo:</label>
          <SelectInput
            clave={"id_periodo"}
            name={"id_periodo"}
            value={formData.id_periodo}
            datos={periodos}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={false}
          />
        </div>
      </div>
      <div className="btnEnviar">
        <button onClick={obtenerBoleta} disabled={!formData.id_periodo}>
          Obtener Boleta
        </button>
      </div>
      <div className="tablaBoleta">
        <TablaBoleta data={clases} isLoading={isLoading}/>
      </div>
      
    </div>
  );
};
