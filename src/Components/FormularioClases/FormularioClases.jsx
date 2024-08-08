import React, { useEffect, useState } from "react";
import "../FormularioClases/FormularioClases.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../SelecInput/SelectInput";
import { CheckBoxList } from "../CheckBoxList/CheckBoxList";
export const FormularioClases = ({ modo, claseAEditar, actualizarTabla }) => {
  const [formData, setFormData] = useState({
    clave_clase: "",
    nombre: "",
    clave_materia: "",
    matricula: "",
    clave_carrera: "",
    hora_inicio: "",
    hora_final: "",
    id_periodo: "",
    salon: "",
    dias: [],
  });

  const [carreras, setCarreras] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [facilitadores, setFacilitadores] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");

  useEffect(() => {
    // Si estamos en modo "edición" o "eliminar" y se proporciona un objeto claseAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && claseAEditar) {
      setFormData({
        clave_clase: claseAEditar.clave_clase || "",
        nombre: claseAEditar.nombre || "",
        clave_materia: claseAEditar.clave_materia || "",
        matricula: claseAEditar.matricula || "",
        clave_carrera: claseAEditar.clave_carrera || "",
        hora_inicio: claseAEditar.hora_inicio || "",
        hora_final: claseAEditar.hora_final || "",
        id_periodo: claseAEditar.id_periodo || "",
        salon: claseAEditar.salon || "",
        dias: claseAEditar.diasR || [],
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto claseAEditar, restablecer el formulario.
      setFormData({
        clave_clase: "",
        nombre: "",
        clave_materia: "",
        matricula: "",
        clave_carrera: "",
        hora_inicio: "",
        hora_final: "",
        id_periodo: "",
        salon: "",
        dias: [],
      });
    }
  }, [modo, claseAEditar]);

  useEffect(() => {
    
    obtenerFacilitadores();
    obtenerCarreras();
  }, []);

  useEffect(() => {
    obtenerMaterias();
    obtenerPeriodos();
  }, [formData.clave_carrera]);

  const obtenerPeriodos = () => {
  if (!formData.clave_carrera) {
    setPeriodos([]);
    //console.log("Vacio");
    return;
  }
    axios
      .get(`${apiUrl}carrera/${formData.clave_carrera}/periodos/mes/actual`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPeriodos(response.data.data);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerFacilitadores = () => {
    axios
      .get(`${apiUrl}cuc/escolar/facilitadores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFacilitadores(response.data.data);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerCarreras = () => {
    axios
      .get(`${apiUrl}cucs/carreras/carreritas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCarreras(response.data.data);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerMaterias = () => {
    if (!formData.clave_carrera) {
      setMaterias([]);
      console.log("Vacio");
      return;
    }
    // console.log("Ejecute consulta");
    // console.log(`${apiUrl}carreras/${formData.clave_carrera}/materias`);
    axios
      .get(`${apiUrl}carreras/${formData.clave_carrera}/materias`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setMaterias(response.data.data);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

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
      dias: updatedCarreras,
    });
    console.log(formData);
  };

  const validateForm = (formData) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s&.,-]+$/;
    let regexClave = /^.{10}$/;
    let regexNumero = /^[0-9]{2}$/; //expresion regular para verificar longitud de numero de cuc y tipo de dato
    let regexNameDir = /^.{1,40}$/;
    let regexNumeros = /^[0-9]+$/;
    let regexNumeroCP = /^[0-9]{5}$/;
    let horaRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

    if (!formData.clave_clase.trim()) {
      errors.clave_clase = "La 'clave de la asignatura' es requerida";
    } else if (!regexClave.test(formData.clave_clase.trim())) {
      errors.clave_clase = "La 'clave de la asignatura' debe contener 10 caracteres";
    }

    if (!formData.nombre.trim()) {
      errors.nombre = "El nombre de la asignatura es requerido";
    } else if (!regexNameDir.test(formData.nombre.trim())) {
      errors.nombre =
        "El nombre de la asignatura debe contener solo menos de 40 caracteres";
    }

    if (!formData.salon.trim()) {
      errors.salon = "El salon de la asignatura es requerido";
    } else if (!regexNameDir.test(formData.salon.trim())) {
      errors.salon =
        "El nombre del salon debe contener solo menos de 50 caracteres";
    }

    if (!formData.hora_inicio.trim()) {
      errors.hora_inicio = "La 'hora de inicio' es requerida";
    } else if (!horaRegex.test(formData.hora_inicio.trim())) {
      errors.hora_inicio = "Formato de hora incorrecto (hh:mm)";
    } else {
      const [startHour, startMinute] = formData.hora_inicio.trim().split(":");
      const startHourValue = parseInt(startHour, 10);
      const startMinuteValue = parseInt(startMinute, 10);

      if (
        startHourValue < 0 ||
        startHourValue > 23 ||
        startMinuteValue < 0 ||
        startMinuteValue > 59
      ) {
        errors.hora_inicio = "Hora inválida";
      } else {
        if (startHourValue < 7 || startHourValue > 20) {
          errors.hora_inicio = "La hora de inicio debe ser entre las 07:00 hrs y las 20:00 hrs.";
        } else {
          if (startHourValue === 20 && startMinuteValue > 0) {
            errors.hora_inicio = "El maximo es de hora de inicio es a las 20:00 hrs.";
          }
        }
      }
    }

    if (!formData.hora_final.trim()) {
      errors.hora_final = "La 'hora de fin' es requerida";
    } else if (!horaRegex.test(formData.hora_final.trim())) {
      errors.hora_final = "Formato de hora incorrecto (hh:mm)";
    } else {
      const [endHour, endMinute] = formData.hora_final.trim().split(":");
      const endHourValue = parseInt(endHour, 10);
      const endMinuteValue = parseInt(endMinute, 10);

      if (
        endHourValue < 0 ||
        endHourValue > 23 ||
        endMinuteValue < 0 ||
        endMinuteValue > 59
      ) {
        errors.hora_final = "Hora inválida";
      } else {
        if (endHourValue > 22) {
          errors.hora_final = "El maximo de hora final es a las 22:00 hrs.";
        } else {
          if (endHourValue === 22 && endMinuteValue > 0) {
            errors.hora_final = "El maximo de hora final es a las 22:00 hrs.";
          }
        }
      }

      // Validación adicional para comparar la hora inicial y final
      const [startHour, startMinute] = formData.hora_inicio.trim().split(":");
      const startHourValue = parseInt(startHour, 10);
      const startMinuteValue = parseInt(startMinute, 10);

      if (
        startHourValue > endHourValue ||
        (startHourValue === endHourValue && startMinuteValue >= endMinuteValue)
      ) {
        errors.hora_inicio =
          "La 'hora de inicio' debe ser antes de la 'hora de fin'";
        errors.hora_final =
          "La 'hora de fin' debe ser después de la 'hora de inicio'";
      }
    }
 if(!errors.hora_inicio && !errors.hora_final){
  const startTime = formData.hora_inicio.trim();
    const endTime = formData.hora_final.trim();

    if (startTime && endTime) {
      const [startHour, startMinute] = startTime.split(":");
      const [endHour, endMinute] = endTime.split(":");
      const startTotalMinutes =
        parseInt(startHour, 10) * 60 + parseInt(startMinute, 10);
      const endTotalMinutes =
        parseInt(endHour, 10) * 60 + parseInt(endMinute, 10);

      if (endTotalMinutes - startTotalMinutes < 45) {
        errors.hora_inicio = "Debe haber al menos 45 minutos de diferencia";
        errors.hora_final = "Debe haber al menos 45 minutos de diferencia";
      }
      const maxDurationMinutes = 2 * 60; // 2 hours in minutes

      if (endTotalMinutes - startTotalMinutes > maxDurationMinutes) {
        errors.hora_inicio = "La duración máxima es de 2 horas";
        errors.hora_final = "La duración máxima es de 2 horas";
      }
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
        .post(`${apiUrl}clases/`, formData, {
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
        .put(`${apiUrl}clases/${claseAEditar.clave_clase}`, formData, {
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
    } else if (modo === "eliminar") {
      axios
        .delete(`${apiUrl}clases/${cucAEditar.clave_cuc}`, {
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
    }
  };

  return (
    <div className="Fclases">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Clave:</label>
          <input
            type="text"
            id="clave_clase"
            name="clave_clase"
            value={formData.clave_clase}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "editar" || modo === "eliminar" ? true : false}
          />
          {errors.clave_clase && <p>{errors.clave_clase}</p>}
        </div>
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
          <SelectInput
            clave={"clave_carrera"}
            name={"clave_carrera"}
            value={formData.clave_carrera}
            datos={carreras}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={modo === "eliminar"}
            handlBlur={handlBlur}
          />
        </div>

        <div>
          <label>Materia:</label>
          <SelectInput
            clave={"clave_materia"}
            name={"clave_materia"}
            value={formData.clave_materia}
            datos={materias}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={modo === "eliminar"}
            handlBlur={handlBlur}
          />
        </div>

        <div>
          <label>Facilitador:</label>
          <SelectInput
            clave={"matricula"}
            name={"matricula"}
            value={formData.matricula}
            datos={facilitadores}
            mostrar={"nombreC"}
            onChange={handleChange}
            disabled={modo === "eliminar" || modo==="editar"}
            handlBlur={handlBlur}
          />
        </div>

        <div>
          <label>Hora_inicio:</label>
          <input
            type="text"
            name="hora_inicio"
            value={formData.hora_inicio}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            placeholder="La hora debe ser en formato de 24hrs, hh:mm"
          />
          {errors.hora_inicio && <p>{errors.hora_inicio}</p>}
        </div>

        <div>
          <label>Hora_final:</label>
          <input
            type="text"
            name="hora_final"
            value={formData.hora_final}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            placeholder="La hora debe ser en formato de 24hrs hh:mm"
          />
          {errors.hora_final && <p>{errors.hora_final}</p>}
        </div>

        <div>
          <label>Salon:</label>
          <input
            type="text"
            name="salon"
            value={formData.salon}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.salon && <p>{errors.salon}</p>}
        </div>

        <div>
          <label>Periodo:</label>
          <SelectInput
            clave={"id_periodo"}
            name={"id_periodo"}
            value={formData.id_periodo}
            datos={periodos}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={modo === "eliminar"}
            handlBlur={handlBlur}
          />
        </div>

        <div className="opcionesDias">
          <CheckBoxList
            urlOpciones={`${apiUrl}dias`}
            clave={"id_dia"}
            mostrar={"nombre"}
            texto={"Seleccione los dias que se impartira esta clase"}
            form={formData}
            onCheckboxChange={handleCheckboxChange}
            disabled={modo === "eliminar"}
            handleBlur={handlBlur}
            datoform={"dias"}
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
