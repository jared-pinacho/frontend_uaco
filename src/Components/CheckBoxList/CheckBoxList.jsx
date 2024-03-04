import React, { useEffect, useState } from "react";
import axios from "axios";
import "../CheckBoxList/CheckBoxList.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
export const CheckBoxList = ({
  datoform,
  urlOpciones,
  form,
  clave,
  mostrar,
  texto,
  onCheckboxChange,
  disabled,
  handleBlur
}) => {
  const [data, setData] = useState([]);
  const token = Cookies.get("tok");
  useEffect(() => {
    cargarOpcionesDesdeAPI();
  }, []);

  const cargarOpcionesDesdeAPI = () => {
    // Realiza una solicitud a la API para obtener las opciones
    axios
      .get(urlOpciones, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
        // console.log(response);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
      });
  };

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    // console.log(value);
    const updatedCarreras = [...form[datoform]];
    // console.log(updatedCarreras);
    if (updatedCarreras.includes(value)) {
      // console.log('si');
      updatedCarreras.splice(updatedCarreras.indexOf(value), 1);
    } else {
      // console.log('no');
      updatedCarreras.push(value);
    }
    onCheckboxChange(updatedCarreras);
  };

  return (
    <div className="Contenedor">
      <p>{texto}</p>
      <div className="opcionesCheckBox">
        {data.map((dato) => (
          <div key={dato[clave]} className="opcionItem">
            <input
              type="checkbox"
              disabled={disabled}
              name={[clave]}
              value={dato[clave]}
              // checked={form.carreras.includes(dato[clave])}
              checked={form[datoform].includes(dato[clave].toString())}
              onChange={handleCheckboxChange}
              onBlur={handleBlur}
            />
            <label className="nombreCarrera">{dato[mostrar]}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
