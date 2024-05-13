import React, { useEffect, useState } from "react";
import axios from "axios";
import "../FormularioForaneos/FormularioForaneos.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../SelecInput/SelectInput";
export const FormularioForaneos = ({
  modo,
  estudianteAEditar,
  actualizarTabla,
}) => {
  const [formIsValid, setFormIsValid] = useState(false); // Variable para validar el formulario
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [colonias, setColonias] = useState([]);
  const [lenguas_indigenas, setLenguasIndigenas] = useState([]);
 

  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    edad: "",
    sexo:"",
    telefono: "",
    correo: "",
    semestre: "",
    discapacidad: "",
    lengua_indigena: "",
    institucion:"",
    matricula_escolar:"",
    licenciatura:"",
    programa:"",
    titular_dep:"",
    cargo_tit:"",
    grado_tit:"",
    resp_seg:"",
    fecha_inicio:"",
    fecha_final:"",
    horas:"",
  });

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto estudianteAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && estudianteAEditar) {
      setFormData({
        nombre: estudianteAEditar.nombre || "",
        apellido_paterno: estudianteAEditar.apellido_paterno || "",
        apellido_materno: estudianteAEditar.apellido_materno || "",
        edad: estudianteAEditar.edad || "",
        sexo: estudianteAEditar.sexo || "",
        telefono: estudianteAEditar.telefono || "",
        discapacidad: estudianteAEditar.discapacidad || "",
        semestre: estudianteAEditar.semestre || "",
        lengua_indigena: estudianteAEditar.id_lenguaindigena || "",
        correo: estudianteAEditar.correo || "",
        institucion: estudianteAEditar.institucion || "",
        matricula_escolar:estudianteAEditar.matricula_escolar || "",
        licenciatura: estudianteAEditar.licenciatura || "",
        programa: estudianteAEditar.programa || "",
        titular_dep:estudianteAEditar.titular_dep || "",
        cargo_tit:estudianteAEditar.cargo_titular || "",
        grado_tit: estudianteAEditar.grado_titular || "",
        resp_seg: estudianteAEditar.resp_seg,
        fecha_inicio: estudianteAEditar.fecha_inicio || "",
        fecha_final: estudianteAEditar.fecha_final || "",
        horas: estudianteAEditar.horas || "",
       
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto estudianteAEditar, restablecer el formulario.
      setFormData({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        edad: "",
        sexo:"",
        telefono: "",
        correo: "",
        semestre: "",
        discapacidad: "",
        lengua_indigena: "",
        institucion:"",
        matricula_escolar:"",
        licenciatura:"",
        programa:"",
        titular_dep:"",
        cargo_tit:"",
        grado_tit:"",
        resp_seg:"",
        fecha_inicio:"",
        fecha_final:"",
        horas:"",
      });
    }
  }, [modo, estudianteAEditar]);

  useEffect(() => {
   
    obtenerLenguasIndigenas();
    
  }, []);

  const obtenerLenguasIndigenas = () => {
    axios
      .get(`${apiUrl}lenguasindigenas/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLenguasIndigenas(response.data.data);
      })
      .catch((error) => {
        toast.error("Error al obtener las lenguas indigenas");
      });
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fecha_nacimiento") {
      const edad = calcularEdad(value);
      setFormData({
        ...formData,
        [name]: value,
        edad: edad, // Aquí establecemos la edad
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

 

  const validateForm = (formData) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexMatricula = /^.{11}$/;
    let regexCurp = /^[A-Z]{4}[0-9]{6}[HM][A-Z0-9]{6}[0-9]{1}$/;
    let regexRfcPersonaFisica = /^[A-Z&Ññ]{4}[0-9]{6}[A-Z0-9]{3}$/;
    let regexEmail = /^(\w+[/./-]?){1,}@(uaco\.edu\.mx|[a-z]+[/.]\w{2,})$/;
    let regexPasswordSize = /^.{8,12}$/;
    let regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let regexTelefono = /^[0-9]{10}$/;
    let regexNameDir = /^.{1,100}$/;
    let regexNumeros = /^[0-9]+$/;
    let regexNumeroCP = /^[0-9]{5}$/;
  


    // fin de modificacion
    // console.log(errors);
    return errors;
  };

  const handlBlur = (event) => {
    handleChange(event);
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    // console.log(errors);
    setFormIsValid(Object.keys(newErrors).length === 0); // Comprobar si no hay errores
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (modo === "agregar") {
    
      // console.log(formData);
      axios
        .post(`${apiUrl}foraneos`, formData, {
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
      
      // console.log(formData);
      axios
        .put(`${apiUrl}foraneos/${estudianteAEditar.id_foraneo}`, formData, {
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
        .delete(`${apiUrl}estudiantes/${estudianteAEditar.matricula}`, {
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
  const calcularEdad = (fechaNacimiento) => {
    const fechaNacimientoDate = new Date(fechaNacimiento);
    if (isNaN(fechaNacimientoDate.getTime())) {
      return 0; // Devuelve 0 si la fecha de nacimiento no es válida
    }
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimientoDate.getFullYear();

    // Verifica si el cumpleaños ya pasó este año
    if (
      fechaNacimientoDate.getMonth() > fechaActual.getMonth() ||
      (fechaNacimientoDate.getMonth() === fechaActual.getMonth() &&
        fechaNacimientoDate.getDate() > fechaActual.getDate())
    ) {
      edad--;
    }
    return edad;
  };
  const obtenerPrimeraConsonanteInterna = (palabra) => {
    const vocales = ['a', 'e', 'i', 'o', 'u'];
  
    for (let i = 1; i < palabra.length; i++) {
      if (!vocales.includes(palabra[i].toLowerCase())) {
        return palabra[i].toUpperCase();
      }
    }
  
    return ''; // Devuelve una cadena vacía si no hay consonantes internas
  };
  
  

  return (
    <div className="Festudiantesu">
      <form onSubmit={handleSubmit}>
       
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            required
           onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 39) {
                setFormData({ ...formData, nombre: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>Apellido Paterno:</label>
          <input
            type="text"
            name="apellido_paterno"
            value={formData.apellido_paterno}
            required
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 39) {
                setFormData({ ...formData, apellido_paterno: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}

          />
          
        </div>
        <div>
          <label>Apellido Materno:</label>
          <input
            type="text"
            name="apellido_materno"
            value={formData.apellido_materno}
            require
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 39) {
                setFormData({ ...formData, apellido_materno: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
          />
     
        </div>

        <div>
          <label>Edad:</label>
          <input
            type="text"
            name="edad"
            value={formData.edad}
            required
            onBlur={handlBlur}
            disabled={false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 3) {
                setFormData({ ...formData, edad: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
          />
        
        </div>

        <div>
          <label>Sexo:</label>
          <select
            name="sexo"
            value={formData.sexo}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione</option>
            <option value="H">Hombre</option>
            <option value="M">Mujer</option>
            
          </select>
        </div>


        <div>
          <label>Telefono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 10) {
                setFormData({ ...formData, telefono: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
          />
        </div>

  

        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="correo"
            value={formData.correo}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            maxLength="40"
            disabled={modo === "eliminar" ? true : false}
          />
        
        </div>



        <div>
          <label>Discapacidad:</label>
          <input
            type="text"
            name="discapacidad"
            value={formData.discapacidad}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            placeholder="Escribir 'Ninguno' en caso de no tener"
            maxLength="60"
          />
        </div>
      

        <div>
          <label>Semestre:</label>
          <input
            type="text"
            name="semestre"
            value={formData.semestre}
            required
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 2) {
                setFormData({ ...formData, semestre: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
          />
        </div>
       

        <div>
          <label>Lengua indigena:</label>
          <SelectInput
            clave={"id_lenguaindigena"}
            name={"lengua_indigena"}
            value={formData.lengua_indigena}
            datos={lenguas_indigenas}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={modo === "eliminar"}
            handlBlur={handlBlur}
          />
        </div>

        {formData.lengua_indigena === "2" ? (
          <div>
            <label>Otra lengua:</label>
            <input
              type="text"
              name="otra_lengua"
              value={formData.otra_lengua}
              onChange={handleChange}
              onBlur={handlBlur}
              disabled={modo === "eliminar" ? true : false}
            />
            {errors.otra_lengua && <p>{errors.otra_lengua}</p>}
          </div>
        ) : null}
        


        <div>
          <label>Institución:</label>
          <input
            type="text"
            name="institucion"
            value={formData.institucion}
            required
            onChange={handleChange}
            maxLength="60"
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          
        </div>

        <div>
          <label>Matricula escolar:</label>
          <input
            type="text"
            name="matricula_escolar"
            value={formData.matricula_escolar}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            maxLength="20"
            disabled={modo === "eliminar" ? true : false}
          />
        </div>


        <div>
          <label>Carrera:</label>
          <input
            type="text"
            name="licenciatura"
            value={formData.licenciatura}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            maxLength="60"
            disabled={modo === "eliminar" ? true : false}
          />
        </div>


        <div>
          <label>Titular de institución:</label>
          <input
            type="text"
            name="titular_dep"
            value={formData.titular_dep}
            required
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 69) {
                setFormData({ ...formData, titular_dep: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
          />
        </div>


        <div>
          <label>Cargo de titular:</label>
          <input
            type="text"
            name="cargo_tit"
            value={formData.cargo_tit}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            maxLength="70"
            disabled={modo === "eliminar" ? true : false}
          />
        </div>

     
        <div>
          <label>Grado del titular:</label>
          <select
            name="grado_tit"
            value={formData.grado_tit}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione</option>
            <option value="C">C</option>
            <option value="LIC">LIC</option>
            <option value="ING">ING</option>
            <option value="MTRO">MTR</option>
            <option value="DR">DR</option>
          </select>
        </div>

        <div>
          <label>Responsable de seguimiento:</label>
          <input
            type="text"
            name="resp_seg"
            value={formData.resp_seg}
            required
            onBlur={handlBlur}
            readOnly={modo === "eliminar" ? true : false}
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^a-zA-ZñÑáéíóúÁÉÍÓÚ\s]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 100) {
                setFormData({ ...formData, resp_seg: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
          />
        </div>

        <div>
          <label>Area de actividades:</label>
          <input
            type="text"
            name="programa"
            value={formData.programa}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            maxLengt="60"
            readOnly={modo === "eliminar" ? true : false}
          />
        </div>

       

        <div>
          <label>total de horas:</label>
          <input
            type="text"
            name="horas"
            value={formData.horas}
            required
            onChange={(e) => {
              const newValue = e.target.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
              if (newValue.length <= 3) {
                setFormData({ ...formData, horas: newValue });
                e.target.value = newValue; // Actualizar valor interno
              }
            }}
           
            readOnly={modo === "eliminar" ? true : false}
          />
        </div>

        <div>
          <label>Fecha Inicio:</label>
          <input
            min="2023-01-01"
            type="date"
            name="fecha_inicio"
            value={formData.fecha_inicio}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
        </div>

        <div>
          <label>Fecha de termino:</label>
          <input
            min="2023-01-01"
            type="date"
            name="fecha_final"
            value={formData.fecha_final}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
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
