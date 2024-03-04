import React, { useState, useEffect } from "react";
import axios from "axios";
import "../BarraSelect/BarraSelect.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
export default function BarraSelect({ urlOpciones, clave, mostrar, txtBoton,metodo }) {
  const [options, setOpciones] = useState([]);
  const [formData, setFormData] = useState({ [clave]: "" });
  const token = Cookies.get('tok');
  useEffect(() => {
    cargarOpcionesDesdeAPI();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    //setCCuc(event.target.value);
    // console.log(formData);
  };

  const cargarOpcionesDesdeAPI = () => {
    // Realiza una solicitud a la API para obtener las opciones
    axios
      .get(urlOpciones, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      })
      .then((response) => {
        setOpciones(response.data.data);
      })
      .catch((error) => {
        toast.error('Error al obtener los datos');
      });
  };

  const handleClick=()=>{
    // console.log(formData[clave])
    const c=formData[clave];
    metodo(c);
  }
  return (
    <div className="barraSelect">
      <select
        name={[clave]}
        value={formData[clave]}
        onChange={handleChange}
      >
        <option value="">Seleccione  </option>
        {options.map((option) => (
          <option key={option[clave]} value={option[clave]}>
            {option[mostrar]}
          </option>
        ))}
      </select>
      <button onClick={handleClick}> {txtBoton}</button>
    </div>
  );
}
