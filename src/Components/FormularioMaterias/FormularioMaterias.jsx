import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FormularioMaterias/FormularioMaterias.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { CheckBoxList } from "../CheckBoxList/CheckBoxList";
export const FormularioMaterias = ({
  actualizarTabla,
  modo,
  materiaAEditar,
}) => {
  const [formData, setFormData] = useState({
    clave_materia: "",
    nombre: "",
    creditos: "",
    carreras: [],
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto cucAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && materiaAEditar) {
      setFormData({
        clave_materia: materiaAEditar.clave_materia || "",
        nombre: materiaAEditar.nombre || "",
        creditos: materiaAEditar.creditos || "",
        carreras: materiaAEditar.carrerasR || [],
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto cucAEditar, restablecer el formulario.
      setFormData({
        clave_materia: "",
        nombre: "",
        creditos: "",
        carreras: [],
      });
    }
  }, [modo, materiaAEditar]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (updatedCarreras) => {
    setFormData({
      ...formData,
      carreras: updatedCarreras,
    });
    // console.log(formData);
  };

  const validateForm = (formData) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s&.,-]+$/;
    let regexClave = /^.{10}$/;
    let regexNumero = /^[0-9]{2}$/; //expresion regular para verificar longitud de numero de cuc y tipo de dato
    let regexNameDir = /^.{1,100}$/;
    let regexNumeros = /^[0-9]+$/;
    let regexNumeroCP = /^[0-9]{5}$/;

    if (!formData.clave_materia.trim()) {
      errors.clave_materia = "El 'nombre de la materia' es requerido";
    } if (!regexClave.test(formData.clave_materia.trim())) {
      errors.clave_materia = "La clave debe ser de 10 caracteres";
    }

    if (!formData.nombre.trim()) {
      errors.nombre = "El 'nombre de la materia' es requerido";
    } else if (!regexNameDir.test(formData.nombre.trim())) {
      errors.nombre =
        "El 'Nombre de la materia' debe contener solo menos de 100 caracteres";
    }

    if (!formData.creditos) {
      errors.creditos = "Los creditos son requeridos";
    } else if (formData.creditos < 4 || formData.creditos > 10) {
      errors.creditos = "Los creditos no pueden ser menor a 4 ni mayor a 10";
    }
    return errors;
  };

  const handlBlur = (event) => {
    handleChange(event);
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    setFormIsValid(Object.keys(newErrors).length === 0); // Comprobar si no hay errores
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modo === "agregar") {
      if (!formIsValid) {
        toast.info(
          "Por favor, corrija los errores antes de enviar el formulario."
        );
        return;
      }
      // console.log(formData);
      axios
        .post(`${apiUrl}materias/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          actualizarTabla();
          //setCarreraRegistrada(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else if (modo === "editar") {
      if (!formIsValid) {
        toast.info(
          "Por favor, corrija los errores antes de enviar el formulario."
        );
        return;
      }
      axios
        .put(`${apiUrl}materias/${materiaAEditar.clave_materia}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          actualizarTabla();
          //setCarreraRegistrada(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else if (modo === "eliminar") {
      axios
        .delete(`${apiUrl}materias/${materiaAEditar.clave_materia}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          actualizarTabla();
          //setCarreraRegistrada(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <div className="Fmateria">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Clave Materia:</label>
          <input
            type="text"
            name="clave_materia"
            value={formData.clave_materia}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "editar" || modo === "eliminar" ? true : false}
          />
          {errors.clave_materia && <p>{errors.clave_materia}</p>}
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>Créditos:</label>
          <input
            type="number"
            name="creditos"
            value={formData.creditos}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.creditos && <p>{errors.creditos}</p>}
        </div>

        <div className="opcionesCarreras">
          <CheckBoxList
            urlOpciones={`${apiUrl}carreras/`}
            clave={"clave_carrera"}
            mostrar={"nombre"}
            texto={"Seleccione los programas que imparten esta materia"}
            form={formData}
            onCheckboxChange={handleCheckboxChange}
            disabled={modo === 'eliminar'}
            handleBlur={handlBlur}
            datoform={'carreras'}
          />
        </div>

        <div>
          <button type="submit">
            {modo === "agregar" && "Agregar"}
            {modo === "editar" && "Actualizar"}
            {modo === "eliminar" && "Eliminar"}
          </button>
        </div>
      </form>
    </div>
  );
};
