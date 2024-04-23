import React, { useEffect, useState } from "react";
import axios from "axios";
//import "../Servicio/FormInfoSocial.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../SelecInput/SelectInput";
import "../FormularioServicio/Social.css";
import { VentanaRevisarSocial } from "../VentanaRevisar/VentanaRevisarSocial";

export const EscolarSocial = ({
  modo,
  estudianteAEditar,
  actualizarTabla,
}) => {
  const [formIsValid, setFormIsValid] = useState(false); // Variable para validar el formulario
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [estatus_envio, setEstatus_envio] = useState(0);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(true);
  const [matricula, setMatricula] = useState(true);

  const [formData, setFormData] = useState({
    modalidad: "",
    tipo_dep: "",
    nombre_dep: "",
    titular_dep: "",
    cargo_tit: "",
    grado_tit: "",
    responsable: "",
    programa: "",
    actividad: "",
    calle: "",
    fecha_inicio: "",
    fecha_final: "",
    horas: "",
    colonia: "",
    municipio: "",
    cp: "",
    num_exterior: "",
    estado: "",
  });

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto estudianteAEditar, llenar el formulario con esos datos.
    if (estudianteAEditar) {
      obtenerColonias(estudianteAEditar.direccion.colonia.cp.id_cp);
      setFormData({
        modalidad: estudianteAEditar.modalidad || "",
        tipo_dep: estudianteAEditar.tipo_dep || "",
        nombre_dep: estudianteAEditar.nombre_dep || "",
        titular_dep: estudianteAEditar.titular_dep || "",
        cargo_tit: estudianteAEditar.cargo_tit || "",
        grado_tit: estudianteAEditar.grado_tit || "",
        responsable: estudianteAEditar.responsable || "",
        programa: estudianteAEditar.programa || "",
        actividad: estudianteAEditar.actividad || "",
        calle: estudianteAEditar.direccion.calle || "",
        fecha_inicio: estudianteAEditar.fecha_ini || "",
        fecha_final: estudianteAEditar.fecha_fin || "",
        horas: estudianteAEditar.horas || "",
        colonia: estudianteAEditar.direccion.colonia.id_colonia || "",
        municipio: estudianteAEditar.direccion.colonia.municipio.nombre || "",
        num_exterior: estudianteAEditar.direccion.num_exterior || "",
        cp: estudianteAEditar.direccion.colonia.cp.id_cp || "",
        estado:estudianteAEditar.direccion.colonia.municipio.estado.nombre || ""
      });

      setEstatus_envio(estudianteAEditar.estatus_envio);
      setMatricula(estudianteAEditar.matricula);
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto estudianteAEditar, restablecer el formulario.
      setFormData({
        modalidad: "",
    tipo_dep: "",
    nombre_dep: "cargando...",
    titular_dep: "cargando...",
    cargo_tit: "cargando...",
    grado_tit: "",
    responsable: "cargando...",
    programa: "cargando",
    actividad: "cargando",
    calle: "",
    fecha_inicio: "",
    fecha_final: "",
    horas: "cargando",
    colonia: "",
    municipio: "",
    num_exterior: "",
    cp: "cargando",
    estado: "",
      });
      setEstatus_envio(0);
      setColonias([]);
    }
   
  }, [modo, estudianteAEditar]);

  useEffect(() => {
 
    
    obtenerEstados();
  
  
  }, [estatus_envio]);



  const obtenerEstados = () => {
    axios
      .get(`${apiUrl}estados`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setEstados(response.data.data);
      })
      .catch((error) => {
        //alert(error.message);
        // console.error("Error al obtener los datos", error);
        toast.error("Error al obtener los datos");
      });
  };
  
  const handleMostrarComponente = () => {
    setMostrarComponente(true); // Establece el estado para mostrar el componente
  };


  const handleMostrarBoton = () => {
    setMostrarBoton(false); // Establece el estado para mostrar el componente
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

  const obtenerColonias = (id_colonia) => {
    if (!id_colonia) {
      setColonias([]);
      return;
    }
    axios
      .get(`${apiUrl}cp/${id_colonia}/colonias/municipio/estado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setColonias(response.data.data.colonias);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        setColonias([]);
      });
  };
  const obtenerDatosCp = () => {
    let regexNumeros = /^[0-9]+$/;
    let regexNumeroCP = /^[0-9]{5}$/;
    if (!formData.cp) {
      toast.info("Ingrese primero un codigo postal");
      return;
    }
    if (!regexNumeroCP.test(formData.cp.trim())) {
      toast.info(
        "El codigo postal debe contener solo numeros y deben ser 5 digitos"
      );
      return;
    }
    console.log(formData.cp);
    axios
      .get(`${apiUrl}cp/${formData.cp}/colonias/municipio/estado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setColonias(response.data.data.colonias);
        setFormData({
          ...formData,
          estado: response.data.data.estado.nombre,
          municipio: response.data.data.municipio.nombre,
        });
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        setColonias([]);
        setFormData({ ...formData, estado: "", municipio: "" });

        toast.info("Sin resultados");
        // console.log(error);
      });
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

  const enviarInfo = () => {
    axios
      .patch(
        `${apiUrl}enviado/estado/social`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('actualizado a enviado');
        actualizarTabla(); // Llamar a actualizarTabla después de activar el estado de enviado
      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Error al activar el enviado:', error);
      });
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    

    // Mostrar ventana modal de confirmación
    setShowConfirmDialog(true);
  };



  const cambiarEstado = (estado) => {
    axios
      .patch(
        `${apiUrl}estado/social/${estudianteAEditar.matricula}/${estado}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log('actualizado a enviado');

      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Error al activar el enviado:', error);
      });
  };




  const handleConfirmSubmit = () => {
    // Enviar formulario
    axios
      .post(`${apiUrl}servicio`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        enviarInfo(); // Llamar a enviarInfo después de completar el envío del formulario
      })
      .catch((error) => {
        // Manejo de errores
      });

    // Cerrar la ventana modal después de enviar el formulario
    setShowConfirmDialog(false);
  };

  const handleCancelSubmit = () => {
    // Cancelar el envío del formulario
    setShowConfirmDialog(false);
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
    <div className="Festudiante">
      <form onSubmit={handleSubmit}>
          <div>
          <label>Modalidad:</label>
          <select
            name="modalidad"
            value={formData.modalidad}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
                ? true
                : false
            }
             >
            <option value="">Seleccione</option>
            <option value="Interno">Interno</option>
            <option value="Externo">Externo</option>
          </select>
          </div>
     
        <div>
        <div>
          <label>Tipo dependencia:</label>
          <select
            name="tipo_dep"
            value={formData.tipo_dep}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
                ? true
                : false
            }
             >
            <option value="">Seleccione</option>
            <option value="Municipal">Municipal</option>
            <option value="Estatal">Estatal</option>
            <option value="Federal">Federal</option>
          </select>
          </div>

        </div>
        <div>
          <label>Nombre de la dependencia:</label>
          <input
            type="text"
            name="nombre_dep"
            value={formData.nombre_dep}
            required
            maxLength= "70"
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
   
        </div>

        <div>
          <label>Titular de la dependencia:</label>
          <input
            type="text"
            name="titular_dep"
            value={formData.titular_dep}
            required
            
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
        </div>
        
        <div>
          <label>Cargo del titular:</label>
          <input
            type="text"
            name="cargo_tit"
            value={formData.cargo_tit}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
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
            disabled={
               estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
                ? true
                : false
            }
             >
            <option value="">Seleccione</option>
            <option value="C">C</option>
            <option value="LIC">LIC</option>
            <option value="MTRO">MTRO</option>
            <option value="ING">ING</option>
            <option value="DR">DR</option>
          </select>
          </div>

          <div>
          <label>Responsable de seguimiento:</label>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
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
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
        </div>


        <div>
          <label>Actividades a realizar:</label>
          <input
            type="text"
            name="actividad"
            value={formData.actividad}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
        </div>

        <div>
          <label>total de horas:</label>
          <input
            type="number"
            name="horas"
            value={formData.horas}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
        </div>



        <div>
          <label>Fecha Inicio:</label>
          <input
            min="2010-01-01"
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
            min="2010-01-01"
            type="date"
            name="fecha_final"
            value={formData.fecha_final}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
        </div>

       

        <div>
          <label>Codigo Postal:</label>
          <input
            className="inputCp"
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
        </div>

        {estatus_envio === 0 && (
        <div>
          <button
            // onClick={prepararDatosAEnviar}
            type="button"
            className="btnCp"
            onClick={obtenerDatosCp}
            // disabled={!formData.cp}
          >
            Obtener datos
          </button>
          {errors.cp && <p>{errors.cp}</p>}
        </div> )}

        <div>
          <label>Estado:</label>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly
          />
          {errors.estado && <p>{errors.estado}</p>}
        </div>
        <div>
          <label>Municipio:</label>
          <input
            type="text"
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly
          />
          {errors.municipio && <p>{errors.municipio}</p>}
        </div>
        <div>
          <label>Colonia:</label>
          <select
            name="colonia"
            value={formData.colonia}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
                ? true
                : false
            }
          >
            <option value="">Seleccione </option>
            {colonias.map((option) => (
              <option key={option.id_colonia} value={option.id_colonia}>
                {option.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Calle:</label>
          <input
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
         
        </div>

        <div>
          <label>Numero Exterior:</label>
          <input
            type="number"
            name="num_exterior"
            value={formData.num_exterior}
            onChange={handleChange}
            onBlur={handlBlur}
            readOnly={
              estatus_envio === 1 || estatus_envio === 2 || estatus_envio === 3
            }
          />
         
        </div>
           
   {estatus_envio === 1 && (
     <div>
      {!mostrarComponente && mostrarBoton && ( // Mostrar botones solo si mostrarComponente es false
          <div className="botones">
            
           <button 
           onClick={()=> {
            handleMostrarComponente();
            cambiarEstado(3);
           
           }
          }
           
           className="button-cancelar">Rechazar</button>
            
      <button 
           onClick={() => {
            cambiarEstado(2);
            handleMostrarBoton();
           }}
           className="button-afirmar">Aceptar</button>
          </div>
)}

{!mostrarComponente && !mostrarBoton && (
<h2>Informacion aprobada</h2>
)}


             {mostrarComponente && <VentanaRevisarSocial
             
             matricula={matricula}
             
             />}
             </div>
         
        )}

        
     
        {estatus_envio.envio === 1 && (
          <div>
            <span className="estado">ESTADO: ENVIADO</span>
          </div>
        )}

        {estatus_envio === 2 && (
          <div>
            <span className="estado">ESTADO: REVISADO Y APROBADO</span>
          </div>
        )}

{estatus_envio === 3 && (
          <div>
            <span className="estado">ESTADO: REVISADO NO APROBADO</span>
          </div>
        )}
      </form>
   
     
   
    </div>
  );
};
