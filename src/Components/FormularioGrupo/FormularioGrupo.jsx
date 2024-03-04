import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FormularioGrupo/FormularioGrupo.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const FormularioGrupo = ({ actualizarTabla, modo, grupoAEditar }) => {
  const [formIsValid, setFormIsValid] = useState(false); // Variable para validar el formulario
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [claveCuc, setClaveCuc] = useState("20USU0040M");
  const [carreras, setCarreras] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    clave_carrera: "",
    clave_grupo: "",
  });

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto cucAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && grupoAEditar) {
      setFormData({
        nombre: grupoAEditar.nombre || "",
        clave_carrera: grupoAEditar.clave_carrera || "",
        clave_grupo: grupoAEditar.clave_grupo || "",
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto cucAEditar, restablecer el formulario.
      setFormData({
        nombre: "",
        clave_carrera: "",
        clave_grupo: "",
      });
    }
  }, [modo, grupoAEditar]);

  useEffect(() => {
    obtenerCarrerasDeCuc();
    //Si estás seguro de que obtenerGrupos no cambia durante la vida útil del componente y
    //no deseas observarlo como una dependencia, puedes deshabilitar la advertencia utilizando
    //un comentario especial:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const obtenerCarrerasDeCuc = () => {
    axios
      .get(`${apiUrl}cucs/carreras/carreritas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setCarreras(response.data.data);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
      });
  };

  const validateForm = (formData) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]$/;
    let regexClave = /^.{11}$/;

    if (!formData.nombre.trim()) {
      errors.nombre = "El 'Nombre del grupo' es requerido";
    }

    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    //CONDICION PARA VER SI HAY ALGUN ERROR DE ALGUNA VALIDACION  (FEPSA)
    if (modo === "agregar") {
      if (!formIsValid) {
        toast.info(
          "Por favor, corrija los errores antes de enviar el formulario."
        );
        return;
      }
      axios
        .post(`${apiUrl}grupos`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success(response.data.message);
          actualizarTabla();
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
        .put(`${apiUrl}grupos/${grupoAEditar.clave_grupo}`, formData, {
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
        .delete(`${apiUrl}grupos/${grupoAEditar.clave_grupo}`, {
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
    <div className="Fgrupos">
      <form onSubmit={handleSubmit}>
        {modo === "editar" || modo === "eliminar" ? (
          <div>
            <label>Clave del grupo:</label>
            <input
              type="text"
              id="clave_grupo"
              name="clave_grupo"
              value={formData.clave_grupo}
              required
              onChange={handleChange}
              disabled={true}
            />
          </div>
        ) : null}

        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>Programa:</label>
          <select
            name="clave_carrera"
            value={formData.clave_carrera}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione </option>
            {carreras.map((option) => (
              <option key={option.clave_carrera} value={option.clave_carrera}>
                {option.nombre}
              </option>
            ))}
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
