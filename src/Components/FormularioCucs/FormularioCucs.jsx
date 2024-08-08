import React, { useState, useEffect } from "react";
import axios from "axios";
import "../FormularioCucs/FormularioCucs.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const FormularioCucs = ({ actualizarTabla, modo, cucAEditar }) => {
  const [formData, setFormData] = useState({
    clave: "",
    nombre: "",
    numero: "",
    calle: "",
    num_exterior: "",
    colonia: "",
    municipio: "",
    cp: "",
    estado: ""
  });
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [colonias, setColonias] = useState([]);
  const [estado_id, setEstadoId] = useState("");

  const [formIsValid, setFormIsValid] = useState(false); // Variable para validar el formulario (FEPSA)
  const [errors, setErrors] = useState({}); //LO AGREGUE PARA LAS VALIDACIONES CUANDO SALGA UN ERROR(FEPSA)
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto cucAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && cucAEditar) {
      obtenerColonias(cucAEditar.direccion.colonia.cp.id_cp);
      setFormData({
        clave: cucAEditar.clave_cuc || "",
        nombre: cucAEditar.nombre || "",
        numero: cucAEditar.numero || "",
        calle: cucAEditar.direccion.calle || "",
        num_exterior: cucAEditar.direccion.num_exterior || "",
        colonia: cucAEditar.direccion.colonia.id_colonia || "",
        municipio: cucAEditar.direccion.colonia.municipio.nombre || "",
        cp: cucAEditar.direccion.colonia.cp.id_cp || "",
        estado: cucAEditar.direccion.colonia.municipio.estado.nombre || "",
      });

    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto cucAEditar, restablecer el formulario.
      setFormData({
        clave: "",
        nombre: "",
        numero: "",
        calle: "",
        num_exterior: "",
        colonia: "",
        municipio: "",
        cp: "",
        estado: "",
      });
    }
    setColonias([]);
  }, [modo, cucAEditar]);

  // useEffect(() => {
  //   obtenerEstados();
  // }, []);

  // useEffect(() => {
  //   obtenerMunicipios();
  // }, [formData.estado]);

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
    // console.log(formData.cp);
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

  // const obtenerEstados = () => {
  //   axios
  //     .get(`${apiUrl}estados/`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setEstados(response.data.data);
  //       //setCarreraRegistrada(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //     });
  // };
  // const obtenerMunicipios = () => {
  //   if (!formData.estado) {
  //     console.log("Vacio");
  //     return;
  //   }
  //   console.log("Ejecute consulta");
  //   axios
  //     .get(`${apiUrl}estados/${formData.estado}/municipios`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       setMunicipios(response.data.data);
  //       //setCarreraRegistrada(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data.message);
  //     });
  // };

  //VALIDA EL FORMULARIO (FEPSA)
  const validateForm = (formData) => {
    let errors = {};
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s&.,-]+$/;
    let regexClave = /^.{10}$/;
    let regexNumero = /^[0-9]{2}$/; //expresion regular para verificar longitud de numero de cuc y tipo de dato
    let regexNameDir = /^.{1,100}$/;
    let regexNumeros = /^[0-9]+$/;
    let regexNumeroCP = /^[0-9]{5}$/;

    if (!formData.clave.trim()) {
      errors.clave = "La 'clave del CUC' es requerida";
    } else if (!regexClave.test(formData.clave.trim())) {
      errors.clave = "La 'clave de cuc' debe contener 10 caracteres";
    }

    if (!formData.nombre.trim()) {
      errors.nombre = "El 'nombre del CUC' es requerido";
    } else if (!regexName.test(formData.nombre.trim())) {
      errors.nombre = "El 'Nombre del CUC' debe contener solo letras";
    } else if (!regexNameDir.test(formData.nombre.trim())) {
      errors.nombre =
        "El 'Nombre del CUC' debe contener solo menos de 100 caracteres";
    }

    if (!formData.numero.trim()) {
      errors.numero = "El numero de cuc es requerido";
    } else if (!regexNumero.test(formData.numero.trim())) {
      errors.numero =
        "El 'Numero de cuc' debe contener solo numeros y de dos cifras";
    }

    if (!formData.calle.trim()) {
      errors.calle = "La calle es requerida";
    } else if (!regexName.test(formData.calle.trim())) {
      errors.calle = "El nombre de la calle debe contener solo letras";
    } else if (!regexNameDir.test(formData.calle.trim())) {
      errors.calle =
        "El 'Nombre del CUC' debe contener solo menos de 40 caracteres";
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
    //   errors.colonia = "Solo debe contener solo menos de 40 caracteres";
    // }

    // if (!formData.municipio.trim()) {
    //   errors.municipio = "La colonia o barrio es requerida";
    // }
    // else if (!regexName.test(formData.municipio.trim())) {
    //   errors.municipio = "Solo debe contener solo letras";
    // } else if (!regexNameDir.test(formData.municipio.trim())) {
    //   errors.municipio = "Solo debe contener solo menos de 40 caracteres";
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
    // if (!formData.estado.trim()) {
    //   errors.estado = "El estado es requerido";
    // }

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

    //CONDICION PARA VER SI HAY ALGUN ERROR DE ALGUNA VALIDACION  (FEPSA)

    if (modo === "agregar") {
      if (!formIsValid) {
        toast.info(
          "Por favor, corrija los errores antes de enviar el formulario."
        );
        return;
      }
      // console.log(formData);
      axios
        .post(`${apiUrl}cucs/`, formData, {
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
      // console.log(formData);
      axios
        .put(`${apiUrl}cucs/${cucAEditar.clave_cuc}`, formData, {
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
      console.log(`${apiUrl}cucs/${cucAEditar.clave_cuc}`);
      axios
        .delete(`${apiUrl}cucs/${cucAEditar.clave_cuc}`, {
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
    <div className="Fcuc">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Clave de CUC:</label>
          <input
            type="text"
            id="clave"
            name="clave"
            value={formData.clave}
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
            onChange={handleChange}
            onBlur={handlBlur} //AGREGADO POR (FEPSA)
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>Número de CUC:</label>
          <input
            type="number"
            name="numero"
            value={formData.numero}
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          />
          {errors.numero && <p>{errors.numero}</p>}
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

        {/* <div>
          <label>Estado:</label>
          <select
            name="estado"
            value={formData.estado}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione </option>
            {estados.map((option) => (
              <option key={option.id_estado} value={option.id_estado}>
                {option.nombre}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Municipio:</label>
          <select
            name="municipio"
            value={formData.municipio}
            required
            onChange={handleChange}
            onBlur={handlBlur}
            disabled={modo === "eliminar" ? true : false}
          >
            <option value="">Seleccione </option>
            {municipios.map((option) => (
              <option key={option.id_municipio} value={option.id_municipio}>
                {option.nombre}
              </option>
            ))}
          </select>
        </div> */}

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
