import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FormularioPeriodos/FormularioPeriodos.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const FormularioPeriodos = ({
  actualizarTabla,
  modo,
  periodoAEditar,
}) => {
  const [formData, setFormData] = useState({
    clave: "",
    nombre: "",
    fecha_inicio: "",
    fecha_final: "",
    periodicidad: "",
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto cucAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && periodoAEditar) {
      setFormData({
        clave: periodoAEditar.id_periodo || "",
        nombre: periodoAEditar.nombre || "",
        fecha_inicio: periodoAEditar.fecha_inicio || "",
        fecha_final: periodoAEditar.fecha_final || "",
        periodicidad: periodoAEditar.periodicidad || "",
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto cucAEditar, restablecer el formulario.
      setFormData({
        clave: "",
        nombre: "",
        fecha_inicio: "",
        fecha_final: "",
        periodicidad: "",
      });
    }
  }, [modo, periodoAEditar]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "fecha_inicio" || name === "fecha_final") {
      actualizarNombrePeriodo(formData.fecha_inicio, formData.fecha_final);
    }
  };
  const actualizarNombrePeriodo = (fechaInicial, fechaFinal) => {
    const options = { month: "long" };
    const mesInicio = new Date(fechaInicial.replace(/-/g, "/")).toLocaleString(
      "es-ES",
      options
    );
    const mesFinal = new Date(fechaFinal.replace(/-/g, "/")).toLocaleString(
      "es-ES",
      options
    );
    const yeari = new Date(fechaInicial).getFullYear();
    const yearf = new Date(fechaFinal).getFullYear();
    const formattedMesInicio =
      mesInicio.charAt(0).toUpperCase() + mesInicio.slice(1);
    const formattedMesFinal =
      mesFinal.charAt(0).toUpperCase() + mesFinal.slice(1);
    const periodName = `${formattedMesInicio} ${yeari} - ${formattedMesFinal} ${yearf}`;

    setFormData((prevFormData) => ({
      ...prevFormData,
      nombre: periodName,
    }));
  };
  const validateForm = (formData) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s&.,-]+$/;
    let regexClave = /^.{10}$/;
    let regexNumero = /^[0-9]{2}$/; //expresion regular para verificar longitud de numero de cuc y tipo de dato
    let regexNameDir = /^.{1,100}$/;
    let regexNumeros = /^[0-9]+$/;
    let regexNumeroCP = /^[0-9]{5}$/;

    if (!formData.nombre.trim()) {
      errors.nombre = "El 'nombre del periodo' es requerido";
    } else if (!regexNameDir.test(formData.nombre.trim())) {
      errors.nombre =
        "El 'Nombre del periodo' debe contener solo menos de 100 caracteres";
    }

    if (!formData.fecha_inicio) {
      errors.fecha_inicio = "La 'fecha de inicio' es requerida";
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.fecha_inicio)) {
        errors.fecha_inicio =
          "La 'fecha de inicio' debe estar en el formato 'dia-mes-año'";
      } else {
        const startDate = new Date(formData.fecha_inicio);
        const endDate = formData.fecha_final
          ? new Date(formData.fecha_final)
          : null;

        if (endDate && startDate > endDate) {
          errors.fecha_inicio =
            "La 'fecha de inicio' no puede ser mayor que la 'fecha final'";
        }
        if (endDate && startDate.getTime() === endDate.getTime()) {
          errors.fecha_inicio =
            "La 'fecha de inicio' no puede ser igual a la 'fecha final'";
          errors.fecha_final =
            "La 'fecha final' no puede ser igual a la 'fecha de inicio'";
        }
        const mesesMinDiferencia = 3;
        const minEndDate = new Date(startDate);
        minEndDate.setMonth(minEndDate.getMonth() + mesesMinDiferencia);

        const mesesMaxDiferencia = 6;
        const maxEndDate = new Date(startDate);
        maxEndDate.setMonth(maxEndDate.getMonth() + mesesMaxDiferencia);

        if (endDate && (endDate < minEndDate || endDate > maxEndDate)) {
          errors.fecha_final = `La 'fecha final' debe estar entre ${mesesMinDiferencia} y ${mesesMaxDiferencia} meses después de la 'fecha de inicio'`;
        }
      }
    }

    if (!formData.fecha_final) {
      errors.fecha_final = "La 'fecha final' es requerida";
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.fecha_final)) {
        errors.fecha_final =
          "La 'fecha final' debe estar en el formato 'dia-mes-año'";
      }
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
        .post(`${apiUrl}periodos/`, formData, {
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
        .put(`${apiUrl}periodos/${periodoAEditar.id_periodo}`, formData, {
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
        .delete(`${apiUrl}periodos/${periodoAEditar.id_periodo}`, {
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
    <div className="Fperiodo">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={true}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>Fecha_inicio:</label>
          <input
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.fecha_inicio && <p>{errors.fecha_inicio}</p>}
        </div>
        <div>
          <label>Fecha_final:</label>
          <input
            type="date"
            name="fecha_final"
            value={formData.fecha_final}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.fecha_final && <p>{errors.fecha_final}</p>}
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
