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
    edad: 0,
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
    responsable:"",
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
        edad: estudianteAEditar.edad || 0,
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
        edad: 0,
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
        responsable:"",
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
  const obtenerCodigoEstado = (codigo) => {
    const estadosPorCodigo = {
      1: { codigo: "AG", nombre: "Aguascalientes" },
      2: { codigo: "BC", nombre: "Baja California" },
      3: { codigo: "BS", nombre: "Baja California Sur" },
      4: { codigo: "CM", nombre: "Campeche" },
      5: { codigo: "CO", nombre: "Coahuila" },
      6: { codigo: "CL", nombre: "Colima" },
      7: { codigo: "CS", nombre: "Chiapas" },
      8: { codigo: "CH", nombre: "Chihuahua" },
      9: { codigo: "DF", nombre: "Ciudad de México" },
      10: { codigo: "DG", nombre: "Durango" },
      11: { codigo: "GT", nombre: "Guanajuato" },
      12: { codigo: "GR", nombre: "Guerrero" },
      13: { codigo: "HG", nombre: "Hidalgo" },
      14: { codigo: "JC", nombre: "Jalisco" },
      15: { codigo: "MC", nombre: "México" },
      16: { codigo: "MN", nombre: "Michoacán" },
      17: { codigo: "MS", nombre: "Morelos" },
      18: { codigo: "NT", nombre: "Nayarit" },
      19: { codigo: "NL", nombre: "Nuevo León" },
      20: { codigo: "OC", nombre: "Oaxaca" },
      21: { codigo: "PL", nombre: "Puebla" },
      22: { codigo: "QT", nombre: "Querétaro" },
      23: { codigo: "QR", nombre: "Quintana Roo" },
      24: { codigo: "SP", nombre: "San Luis Potosí" },
      25: { codigo: "SL", nombre: "Sinaloa" },
      26: { codigo: "SR", nombre: "Sonora" },
      27: { codigo: "TB", nombre: "Tabasco" },
      28: { codigo: "TM", nombre: "Tamaulipas" },
      29: { codigo: "TL", nombre: "Tlaxcala" },
      30: { codigo: "VZ", nombre: "Veracruz" },
      31: { codigo: "YN", nombre: "Yucatán" },
      32: { codigo: "ZS", nombre: "Zacatecas" },
    };
  
    const estado = estadosPorCodigo[codigo];
    return estado ? estado.codigo : "Código de estado no encontrado";
  };
  const quitarAcentos=(cadena)=> {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  

  return (
    <div className="Festudiantes">
      <form onSubmit={handleSubmit}>
       
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
          <label>Apellido Paterno:</label>
          <input
            type="text"
            name="apellido_paterno"
            value={formData.apellido_paterno}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          
        </div>
        <div>
          <label>Apellido Materno:</label>
          <input
            type="text"
            name="apellido_materno"
            value={formData.apellido_materno}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
     
        </div>

        <div>
          <label>Edad:</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={false}
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
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
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
          />
         
        </div>
      

        <div>
          <label>Semestre:</label>
          <input
            type="number"
            name="semestre"
            value={formData.semestre}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
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
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
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
            maxLength="60"
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={modo === "eliminar" ? true : false}
          />
        </div>

        <div>
          <label>Programa o proyecto:</label>
          <input
            type="text"
            name="programa"
            value={formData.programa}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            maxLength="60"
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
