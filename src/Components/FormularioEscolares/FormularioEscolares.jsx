import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FormularioConsejeros/FormularioConsejeros.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../SelecInput/SelectInput";
export const FormularioEscolares = ({
  actualizarTabla,
  modo,
  escolarAEditar,
}) => {
  const [formIsValid, setFormIsValid] = useState(false); // Variable para validar el formulario
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [tipoSangre, setTipoSangre] = useState([]);
  const [nacionalidades, setNacionalidades] = useState([]);
  //const [claveCuc, setClaveCuc] = useState("20USU0028R");
  const [cucs, setCucs] = useState([]);
  const [formData, setFormData] = useState({
    matricula: "",
    nombre: "",
    apellidopaterno: "",
    apellidomaterno: "",
    curp: "",
    sexo: "",
    fecha_nacimiento: "",
    rfc: "",
    niveleducativo: "",
    clavecuc: "",
    email: "",
    password: "",
    telefono: "",
    calle: "",
    num_exterior: "",
    colonia: "",
    municipio: "",
    cp: "",
    estado: "",
    id_tiposangre: "",
    telefono_emergencia: "",
    padecimiento: "",
    nacionalidad: "",
    otra_nacionalidad: "",
    estado_nacimiento: "",
    perfil_academico: ""
  });

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto cucAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && escolarAEditar) {
      obtenerColonias(escolarAEditar.direccion.colonia.cp.id_cp);
      setFormData({
        matricula: escolarAEditar.matricula || "",
        nombre: escolarAEditar.nombre || "",
        apellidopaterno: escolarAEditar.apellido_paterno || "",
        apellidomaterno: escolarAEditar.apellido_materno || "",
        curp: escolarAEditar.curp || "",
        sexo: escolarAEditar.sexo || "",
        fecha_nacimiento: escolarAEditar.fecha_nacimiento || "",
        rfc: escolarAEditar.rfc || "",
        niveleducativo: escolarAEditar.nivel_educativo || "",
        clavecuc: escolarAEditar.clave_cuc || "",
        email: escolarAEditar.usuario.email || "",
        telefono: escolarAEditar.telefono || "",
        calle: escolarAEditar.direccion.calle || "",
        num_exterior: escolarAEditar.direccion.num_exterior || "",
        colonia: escolarAEditar.direccion.colonia.id_colonia || "",
        municipio:
          escolarAEditar.direccion.colonia.municipio.nombre || "",
        cp: escolarAEditar.direccion.colonia.cp.id_cp || "",
        estado:
          escolarAEditar.direccion.colonia.municipio.estado.nombre || "",
        id_tiposangre: escolarAEditar.id_tiposangre || "",
        telefono_emergencia: escolarAEditar.telefono_emergencia || "",
        padecimiento: escolarAEditar.padecimiento || "",
        nacionalidad: escolarAEditar.id_nacionalidad || "",
        estado_nacimiento: escolarAEditar.estado_nacimiento || "",
        perfil_academico: escolarAEditar.perfil_academico || "",
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto cucAEditar, restablecer el formulario.
      setFormData({
        matricula: "",
        nombre: "",
        apellidopaterno: "",
        apellidomaterno: "",
        curp: "",
        sexo: "",
        fecha_nacimiento: "",
        rfc: "",
        niveleducativo: "",
        clavecuc: "",
        email: "",
        password: "",
        telefono: "",
        calle: "",
        num_exterior: "",
        colonia: "",
        municipio: "",
        cp: "",
        estado: "",
        id_tiposangre: "",
        telefono_emergencia: "",
        padecimiento: "",
        nacionalidad: "",
        otra_nacionalidad: "",
        estado_nacimiento: "",
        perfil_academico: ""
      });
      setColonias([]);
    }
  }, [modo, escolarAEditar]);

  useEffect(() => {
    obtenerCucs();
    obtenerNacionalidades();
    obtenerEstados();
    obtenerTipoSangre();
    //Si estás seguro de que obtenerGrupos no cambia durante la vida útil del componente y
    //no deseas observarlo como una dependencia, puedes deshabilitar la advertencia utilizando
    //un comentario especial:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const obtenerNacionalidades = () => {
    axios
      .get(`${apiUrl}nacionalidades`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setNacionalidades(response.data.data);
      })
      .catch((error) => {
        //alert(error.message);
        // console.error("Error al obtener los datos", error);
        toast.error("Error al obtener los datos");
      });
  };

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

  const obtenerCucs = () => {
    axios
      .get(`${apiUrl}cucs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response.data.data);
        setCucs(response.data.data);
      })
      .catch((error) => {
        //alert(error.message);
        // console.error("Error al obtener los datos", error);
        toast.error("Error al obtener los datos");
      });
  };


  const obtenerTipoSangre = () => {
    axios
      .get(`${apiUrl}tiposangre`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTipoSangre(response.data.data);
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

  const obtenerColonias = (id_colonia) => {
    if (!id_colonia) {
      setColonias([]);
      return
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
  }
  const obtenerDatosCp = () => {
    let regexNumeros = /^[0-9]+$/;
    let regexNumeroCP = /^[0-9]{5}$/;
    if (!formData.cp) {
      toast.info("Ingrese primero un codigo postal");
      return;
    }
    if (!regexNumeroCP.test(formData.cp.trim())) {
      toast.info("El codigo postal debe contener solo numeros y deben ser 5 digitos");
      return
    }
    //console.log(formData.cp);
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

    if (!formData.email.trim()) {
      errors.email = "El 'correo del consejero' es requerida";
    } else if (!regexEmail.test(formData.email.trim())) {
      errors.email = "Por favor ingrese un correo valido";
    }
    if (modo === "agregar") {
      if (!formData.password.trim()) {
        errors.password = "La 'Contraseña ' es requerido";
      } else if (!regexPasswordSize.test(formData.password.trim())) {
        errors.password = "La 'Contraseña' debe contener de 8 a 12 caracteres";
      } else if (!regexPassword.test(formData.password.trim())) {
        errors.password =
          "La 'Contraseña' debe contener almenos un número y una letra";
      }
    }
    if (!formData.matricula.trim()) {
      errors.matricula = "La 'matricula' es requerida";
    } else if (!regexMatricula.test(formData.matricula.trim())) {
      errors.matricula = "La 'matricula ' debe contener 11 caracteres";
    }

    if (!formData.nombre.trim()) {
      errors.nombre = "El 'Nombre' es requerido";
    } else if (!regexName.test(formData.nombre.trim())) {
      errors.nombre = "El 'Nombre' debe contener solo letras";
    }

    if (!formData.apellidopaterno.trim()) {
      errors.apellidopaterno = "El 'apellido paterno' es requerido";
    } else if (!regexName.test(formData.apellidopaterno.trim())) {
      errors.apellidopaterno =
        "El 'apellido paterno' debe contener solo letras";
    }

    if (!formData.apellidomaterno.trim()) {
      errors.apellidomaterno = "El 'apellido materno' es requerido";
    } else if (!regexName.test(formData.apellidomaterno.trim())) {
      errors.apellidomaterno =
        "El 'apellido materno' debe contener solo letras";
    }

    if (!formData.perfil_academico.trim()) {
      errors.perfil_academico = "El 'perfil academico' es requerido";
    } else if (!regexName.test(formData.perfil_academico.trim())) {
      errors.perfil_academico =
        "El 'perfil academico' debe contener solo letras";
    } else if (formData.perfil_academico.length > 120) {
      errors.perfil_academico =
        "El 'perfil academico' debe contener menos de 120 caracteres";
    }

    if (!formData.rfc.trim()) {
      errors.rfc = "La 'RFC' es requerido";
    } else if (!regexRfcPersonaFisica.test(formData.rfc.trim())) {
      errors.rfc = "La 'RFC' no es válida";
    }

    if (!formData.niveleducativo.trim()) {
      errors.niveleducativo = "La 'RFC' es requerido";
    } else if (!regexName.test(formData.niveleducativo.trim())) {
      errors.niveleducativo = "El 'nivel educativo' debe contener solo letras";
    }

    // Modificacion
    if (!formData.telefono.trim()) {
      errors.telefono = "El telefono es requerido";
    } else if (!regexTelefono.test(formData.telefono.trim())) {
      errors.telefono = "El telefono debe ser de 10 digitos";
    }

    if (!formData.telefono_emergencia.trim()) {
      errors.telefono_emergencia = "El telefono de emergencia es requerido";
    } else if (!regexTelefono.test(formData.telefono_emergencia.trim())) {
      errors.telefono_emergencia =
        "El telefono de emergencia debe ser de 10 digitos";
    }

    //validacion del telefono
    // if(formData.telefono_emergencia===formData.telefono){
    //   errors.telefono = "El telefono no puede ser igual al de emergencia";
    //   errors.telefono_emergencia =
    //     "El telefono de emergencia debe ser digual al telefono";
    // }

    // if (!formData.id_tiposangre.trim()) {
    //   errors.id_tiposangre = "El tipo de sangre es requerido";
    // }

    if (!formData.padecimiento.trim()) {
      errors.padecimiento = "El padecimiento es requerido";
    }

    if (!formData.calle.trim()) {
      errors.calle = "La calle es requerida";
    } else if (!regexName.test(formData.calle.trim())) {
      errors.calle = "El nombre de la calle debe contener solo letras";
    } else if (!regexNameDir.test(formData.calle.trim())) {
      errors.calle =
        "El nombre de la calle debe contener solo menos de 40 caracteres";
    }

    if (!formData.num_exterior.trim()) {
      errors.num_exterior = "El numero de calle es requerido";
    } else if (!regexNumeros.test(formData.num_exterior.trim())) {
      errors.num_exterior = "El numero de calle debe contener solo numeros";
    }

    // if (!formData.colonia.trim()) {
    //   errors.colonia = "La colonia o barrio es requerida";
    // } else if (!regexName.test(formData.colonia.trim())) {
    //   errors.colonia = "Solo debe contener solo letras";
    // } else if (!regexNameDir.test(formData.colonia.trim())) {
    //   errors.colonia = "Debe contener menos de 40 caracteres";
    // }

    if (!formData.cp.trim()) {
      errors.cp = "El codigo postal es requerido";
    } else if (!regexNumeroCP.test(formData.cp.trim())) {
      errors.cp =
        "El codigo postal debe contener solo numeros y deben ser 5 digitos";
    }
    if (!formData.estado.trim()) {
      errors.estado = "El estado es requerido";
    }
    if (!formData.municipio.trim()) {
      errors.municipio = "El municipio es requerido";
    }
    if (!formData.fecha_nacimiento) {
      errors.fecha_nacimiento = "La fecha de nacimiento es requerida";
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(formData.fecha_nacimiento)) {
        errors.fecha_nacimiento =
          "La 'fecha de nacimiento' debe estar en el formato 'dia-mes-año'";
      }
    }

    if (String(formData.nacionalidad) === "1") {
      if (!formData.otra_nacionalidad.trim()) {
        errors.otra_nacionalidad =
          "El 'nombre de la otra nacionalidad' es requerida";
      } else if (!regexName.test(formData.otra_nacionalidad.trim())) {
        errors.otra_nacionalidad =
          "El 'nombre de la otra nacionalidad' debe contener solo letras";
      }
    }

    if (String(formData.nacionalidad) === "2") {
      if (!formData.curp.trim()) {
        errors.curp = "La 'CURP' es requerida";
      } else if (!regexCurp.test(formData.curp.trim())) {
        errors.curp = "La 'CURP' no es válida";
      } else if (formData.curp.length === 18) {
        if (formData.nombre && formData.apellidopaterno && formData.apellidomaterno && formData.fecha_nacimiento && formData.estado_nacimiento) {
          const nombre = quitarAcentos(formData.nombre);
          const apellido_paterno = quitarAcentos(formData.apellidopaterno);
          const apellido_materno = quitarAcentos(formData.apellidomaterno);
          const inicialyconsonanteApellidoP = `${apellido_paterno.charAt(
            0
          )}${apellido_paterno.match(/[aeiou]/i)?.[0] || ""}`.toUpperCase();
        //  console.log(inicialyconsonanteApellidoP);
         // console.log(formData.fecha_nacimiento);

          const inicialApellidoMaterno = apellido_materno.charAt(
            0
          ).toUpperCase();

          const incialNombre = nombre.charAt(
            0
          ).toUpperCase();

          const fechaNacimiento = formData.fecha_nacimiento;
          const fechaObjeto = new Date(`${fechaNacimiento}T12:00:00Z`);

          // Obtener los dos últimos dígitos del año
          const dosUltimosDigitosAño = (fechaObjeto.getFullYear() % 100)
            .toString()
            .padStart(2, "0");

          // Obtener los dos últimos dígitos del mes
          const dosUltimosDigitosMes = ("0" + (fechaObjeto.getMonth() + 1)).slice(
            -2
          );

          // Obtener los dos últimos dígitos del día
          const dosUltimosDigitosDia = ("0" + fechaObjeto.getDate()).slice(-2);

          // Concatenar los dígitos en una variable
          const curpParteFecha =
            dosUltimosDigitosAño + dosUltimosDigitosMes + dosUltimosDigitosDia;

        //  console.log(curpParteFecha);

          const letraSexo = formData.sexo;
          //console.log(letraSexo);
          const codigoEstado = obtenerCodigoEstado(formData.estado_nacimiento)
          //console.log(codigoEstado);

          const consonanteApellidoPaterno = obtenerPrimeraConsonanteInterna(apellido_paterno).toUpperCase();
          const consonanteApellidoMaterno = obtenerPrimeraConsonanteInterna(apellido_materno).toUpperCase();
          const consonanteNombre = obtenerPrimeraConsonanteInterna(nombre).toUpperCase();
          const unionConsonates = consonanteApellidoPaterno + consonanteApellidoMaterno + consonanteNombre;
          const primerosdieciseiscurpOriginal = formData.curp.substring(0, 16);
          // console.log("original" + primerosdieciseiscurpOriginal)

          const primerosdieciseisCurp = inicialyconsonanteApellidoP + inicialApellidoMaterno + incialNombre + curpParteFecha + letraSexo + codigoEstado + unionConsonates;
          if (primerosdieciseisCurp !== primerosdieciseiscurpOriginal) {
            errors.curp = "La curp introducida no coincide con los datos ingresados"
          }
        } else {
          errors.curp = "Verifique que no esten vacios los campos de nombre, apellido paterno, materno, fecha de nacimiento o estado de nacimiento"
        }

      }
    }
    // fin de modificacion

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
        .post(`${apiUrl}escolares`, formData, {
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
      // console.log(formData);
      axios
        .put(`${apiUrl}escolares/${escolarAEditar.matricula}`, formData, {
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
        .delete(`${apiUrl}escolares/${escolarAEditar.matricula}`, {
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
  const quitarAcentos = (cadena) => {
    return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  return (
    <div className="Fconsejeros">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Matrícula:</label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            value={formData.matricula}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "editar" || modo === "eliminar" ? true : false}
          />
          {errors.matricula && <p>{errors.matricula}</p>}
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
          <label>Apellido Paterno:</label>
          <input
            type="text"
            name="apellidopaterno"
            value={formData.apellidopaterno}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.apellidopaterno && <p>{errors.apellidopaterno}</p>}
        </div>
        <div>
          <label>Apellido Materno:</label>
          <input
            type="text"
            name="apellidomaterno"
            value={formData.apellidomaterno}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.apellidomaterno && <p>{errors.apellidomaterno}</p>}
        </div>

        <div>
          <label>Fecha Nacimiento:</label>
          <input
            min="1953-01-01"
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.fecha_nacimiento && <p>{errors.fecha_nacimiento}</p>}
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
          <label>Nivel Educativo:</label>
          <select
            name="niveleducativo"
            value={formData.niveleducativo}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione</option>
            <option value="Bachillerato">Bachillerato</option>
            <option value="Licenciatura">Licenciatura</option>
            <option value="Ingenieria">Ingenieria</option>
            <option value="Maestria">Maestria</option>
            <option value="Doctorado">Doctorado</option>
          </select>
        </div>

        <div>
          <label>Perfil académico:</label>
          <input
            type="text"
            name="perfil_academico"
            value={formData.perfil_academico}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.perfil_academico && <p>{errors.perfil_academico}</p>}
        </div>

        <div>
          <label>CUC:</label>
          <SelectInput
            clave={"clave_cuc"}
            name={"clavecuc"}
            value={formData.clavecuc}
            datos={cucs}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={modo === "eliminar"}
            handlBlur={handlBlur}
          />
          {/* <select
            name="clavecuc"
            value={formData.clavecuc}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione </option>
            {cucs.map((option) => (
              <option key={option.clave_cuc} value={option.clave_cuc}>
                {option.nombre}
              </option>
            ))}
          </select> */}
        </div>

        {/* Modificacion */}


        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.telefono && <p>{errors.telefono}</p>}
        </div>

        <div>
          <label>Tel. emergencia:</label>
          <input
            type="text"
            name="telefono_emergencia"
            value={formData.telefono_emergencia}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.telefono_emergencia && <p>{errors.telefono_emergencia}</p>}
        </div>

        <div>
          <label>Tipo de sangre:</label>
          <SelectInput
            clave={"id_tiposangre"}
            name={"id_tiposangre"}
            value={formData.id_tiposangre}
            datos={tipoSangre}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={modo === "eliminar"}
            handlBlur={handlBlur}
          />
          {/* <select
            name="tipo_sangre"
            value={formData.tipo_sangre}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione un tipo de sangre</option>
            {tipoSangre.map((option) => (
              <option key={option.id_tiposangre} value={option.id_tiposangre}>
                {option.nombre}
              </option>
            ))}
          </select> */}
        </div>

        <div>
          <label>Padecimiento:</label>
          <input
            type="text"
            name="padecimiento"
            value={formData.padecimiento}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
            placeholder="Escribir 'Ninguno' en caso de no tener"
          />
          {errors.padecimiento && <p>{errors.padecimiento}</p>}
        </div>

        <div>
          <label>Código Postal:</label>
          <input
            className="inputCp"
            type="number"
            name="cp"
            value={formData.cp}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />

        </div>
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
        </div>


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
            disabled={modo === "eliminar" ? true : false}
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
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.calle && <p>{errors.calle}</p>}
        </div>
        <div>
          <label>Número Exterior:</label>
          <input
            type="number"
            name="num_exterior"
            value={formData.num_exterior}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.num_exterior && <p>{errors.num_exterior}</p>}
        </div>

        <div>
          <label>Nacionalidad:</label>
          <SelectInput
            clave={"id_nacionalidad"}
            name={"nacionalidad"}
            value={formData.nacionalidad}
            datos={nacionalidades}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={modo === "eliminar"}
            handlBlur={handlBlur}
          />
        </div>

        {formData.nacionalidad === "1" ? (
          <div>
            <label>Otra nacionalidad:</label>
            <input
              type="text"
              name="otra_nacionalidad"
              value={formData.otra_nacionalidad}
              onChange={handleChange}
              onBlur={handlBlur}
              disabled={modo === "eliminar" ? true : false}
            />
            {errors.otra_nacionalidad && <p>{errors.otra_nacionalidad}</p>}
          </div>
        ) : null}

        {String(formData.nacionalidad) === "2" ? (
          <div>
            <label>Estado de nacimiento:</label>
            <SelectInput
              clave={"id_estado"}
              name={"estado_nacimiento"}
              value={formData.estado_nacimiento}
              datos={estados}
              mostrar={"nombre"}
              onChange={handleChange}
              disabled={modo === "eliminar"}
              handlBlur={handlBlur}
            />
          </div>
        ) : null}

        {String(formData.nacionalidad) === "2" ? (
          <div>
            <label>CURP:</label>
            <input
              type="text"
              name="curp"
              value={formData.curp}
              onChange={handleChange}
              onBlur={handlBlur}
              disabled={modo === "eliminar" ? true : false}
            />
            {errors.curp && <p>{errors.curp}</p>}
          </div>
        ) : null}

        <div>
          <label>RFC:</label>
          <input
            type="text"
            name="rfc"
            value={formData.rfc}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.rfc && <p>{errors.rfc}</p>}
        </div>


        {/* fin de Modificacion */}

        <div>
          <label>Correo:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          {modo === "agregar" ? (
            <>
              <label>Contraseña:</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                required
                onChange={handleChange}
                onBlur={handlBlur}
                disabled={modo === "eliminar" ? true : false}
              />
              {errors.password && <p>{errors.password}</p>}
            </>
          ) : null}
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
