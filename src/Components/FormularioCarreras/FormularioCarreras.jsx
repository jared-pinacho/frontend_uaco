import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FormularioCarreras/FormularioCarreras.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const FormularioCarreras = ({
  actualizarTabla,
  modo,
  carreraAEditar,
}) => {
  const [formData, setFormData] = useState({
    clave: "",
    nombre: "",
    creditos: "",
    duracion: "",
    periodicidad: "",
    grado: "",
    modalidad: "",
  });

  const [formIsValid, setFormIsValid] = useState(false); // Variable para validar el formulario (FEPSA)
  const [errors, setErrors] = useState({}); //LO AGREGUE PARA LAS VALIDACIONES CUANDO SALGA UN ERROR(FEPSA)
  const apiUrl = URL_API;
  const token = Cookies.get('tok');
  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto cucAEditar, llenar el formulario con esos datos.
    if (modo === "editar" || (modo === "eliminar" && carreraAEditar)) {
      setFormData({
        clave: carreraAEditar.clave_carrera || "",
        nombre: carreraAEditar.nombre || "",
        creditos: carreraAEditar.creditos || "",
        duracion: carreraAEditar.duracion || "",
        periodicidad: carreraAEditar.periodicidad || "",
        grado: carreraAEditar.grado || "",
        modalidad: carreraAEditar.modalidad || "",
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto cucAEditar, restablecer el formulario.
      setFormData({
        clave: "",
        nombre: "",
        creditos: "",
        duracion: "",
        periodicidad: "",
        grado: "",
        modalidad: "",
      });
    }
  }, [modo, carreraAEditar]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //VALIDA EL FORMULARIO (FEPSA)
  const validateForm = (formData) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s&.,\-'"’!?:]+$/;
    let regexClave = /^.{10}$/;
    let regexNameDir = /^.{1,60}$/;

    if (!formData.clave.trim()) {
      errors.clave = "La 'clave del programa' es requerida";
    } else if (!regexClave.test(formData.clave.trim())) {
      errors.clave = "La 'clave del programa' debe contener 10 caracteres";
    }

    if (!formData.nombre.trim()) {
      errors.nombre = "El 'nombre del programa' es requerido";
    } else if (!regexName.test(formData.nombre.trim())) {
      errors.nombre = "El 'nombre del programa' debe contener solo letras";
    } else if (!regexNameDir.test(formData.nombre.trim())) {
      errors.nombre =
        "El 'nombre del programa' debe contener solo menos de 60 caracteres";
    }

    if (!formData.creditos.trim()) {
      errors.creditos = "Los 'creditos del programa' son requeridos";
    } else if (parseInt(formData.creditos, 10) < 48 || parseInt(formData.creditos, 10) > 437) {
      errors.creditos = "Los 'créditos del programa' deben ser mayores a 47 y menores a 438";
    }

    if (!formData.duracion.trim()) {
      errors.duracion = "Los ciclos escolares son requeridos";
    } else if (parseInt(formData.duracion, 10) < 4 || parseInt(formData.duracion, 10) > 10) {
      errors.duracion = "Los ciclos escolares deben ser mayores a 3 y menores a 11";
    }


    if (!formData.modalidad.trim()) {
      errors.modalidad = "La 'modalidad del programa' es requerida";
    }

    if (!formData.grado.trim()) {
      errors.grado = "El 'grado de programa' es requerido";
    }
    return errors;
  };

  //HANDLBLUR PARA OBTENER LOS ERRORES DE LAS VALIDACIONES (FEPSA)
  const handlBlur = (event) => {
    handleChange(event);
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    setFormIsValid(Object.keys(newErrors).length === 0); // Comprobar si no hay errores
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modo === "agregar") {
      //CONDICION PARA VER SI HAY ALGUN ERROR DE ALGUNA VALIDACION  (FEPSA)
      if (!formIsValid) {
        toast.info(
          "Por favor, corrija los errores antes de enviar el formulario."
        );
        return;
      }
      axios
        .post(`${apiUrl}carreras/`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
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
      //CONDICION PARA VER SI HAY ALGUN ERROR DE ALGUNA VALIDACION  (FEPSA)
      if (!formIsValid) {
        toast.info(
          "Por favor, corrija los errores antes de enviar el formulario."
        );
        return;
      }
      axios
        .put(`${apiUrl}carreras/${carreraAEditar.clave_carrera}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
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
        .delete(`${apiUrl}carreras/${carreraAEditar.clave_carrera}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
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
    <div className="Fcarrera">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Clave del Programa:</label>
          <input
            type="number"
            id="clave"
            name="clave"
            value={formData.clave}
            required
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={modo === "editar" || modo === "eliminar" ? true : false}
          />
          {errors.clave && <p>{errors.clave}</p>}
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            required
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
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
            required
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.creditos && <p>{errors.creditos}</p>}
        </div>
        <div>
          <label>Ciclos Escolares:</label>
          <input
            type="number"
            name="duracion"
            value={formData.duracion}
            required
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.duracion && <p>{errors.duracion}</p>}
        </div>
        <div>
          <label>Periodicidad:</label>
          <select
            name="periodicidad"
            value={formData.periodicidad}
            required
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione un periodo</option>
            <option value="Trimestre">Trimestres</option>
            <option value="Cuatrimestre">Cuatrimestres</option>
            <option value="Semestre">Semestres</option>
          </select>
        </div>
        <div>
          <label>Modalidad:</label>
          <select
            name="modalidad"
            value={formData.modalidad}
            required
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione una modalidad</option>
            <option value="Escolarizada">Escolarizada</option>
            <option value="No Escolarizada">No Escolarizada</option>
            <option value="Mixta">Mixta</option>
          </select>
        </div>
        <div>
          <label>Grado:</label>
          <select
            name="grado"
            value={formData.grado}
            required
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione el grado</option>
            <option value="Licenciatura">Licenciatura</option>
            <option value="Ingenieria">Ingeniería</option>
            <option value="Maestria">Maestría</option>
            <option value="Especialidad">Especialidad</option>
            <option value="Doctorado">Doctorado</option>
            <option value="Tecnico Superior Universitario o Profesional Asociado">
              Tecnico Superior Universitario o Profesional Asociado
            </option>
          </select>
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
