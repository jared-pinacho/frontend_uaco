import React, { useState, useEffect } from "react";
import axios from "axios";
import "../OpcionesBoton/OpcionesBoton.css";
import { URL, URL_API } from "../../Services/Const";

export const OpcionesBoton = ({ cargarCarrerasCuc, urlOpciones }) => {
  const apiUrl = URL_API;
  const [options, setOpciones] = useState([]);
  const [formData, setFormData] = useState({ clave_cuc: "" });
  const [cCuc, setCCuc] = useState("");

  useEffect(() => {
    cargarOpcionesDesdeAPI();
  }, []); // Esto se ejecutará una vez al montar el componente

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    //setCCuc(event.target.value);
    // console.log(formData);
  };

  const cargarOpcionesDesdeAPI = () => {
    // Realiza una solicitud a la API para obtener las opciones
    axios
      .get(urlOpciones)
      .then((response) => {
        // console.log(response.data.data);
        setOpciones(response.data.data);
      })
      .catch((error) => {
        alert(error.message);
        // console.error("Error al obtener los datos de las CUCs:", error);
      });
  };

  const handleClick = () => {
    axios
      .get(`${apiUrl}cucs/${formData.clave_cuc}/carreras`)
      .then((response) => {
        // console.log(response);
        cargarCarrerasCuc(response.data.data);
        //setOpciones(response.data.data);
      })
      .catch((error) => {
        alert(error.message);
        // console.error("Error al obtener los datos de las CUCs:", error);
      });
  };

  return (
    <div className="OpcionesBoton">
      <select
        name="clave_cuc"
        value={formData.clave_cuc}
        onChange={handleChange}
      >
        <option value="">Seleccione Cuc</option>
        {options.map((option) => (
          <option key={option.clave_cuc} value={option.clave_cuc}>{option.nombre}</option>
        ))}
      </select>
      <button onClick={handleClick}>Obtener Programas</button>
    </div>
  );
};
