import React, { useEffect, useState } from "react";
import "../Escolar/ValidarGrupoParaReporte.css";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { toast } from "react-toastify";
import { SelectInput } from "../../Components/SelecInput/SelectInput";
import { TablaValidarGrupo } from "../../Components/TablaValidarGrupo/TablaValidarGrupo";
import { VentanaConfirmacion } from "../../Components/VentanaConfirmacion/VentanaConfirmacion";
import { GeneradorReporteGrupo } from "../../Utils/GeneradorReporteGrupo";

export const ValidarGrupoParaReporte = () => {
  const [cuc, setCuc] = useState("");
  const [carreras, setCarreras] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [vistoReporte, setVistoReporte] = useState(false);
  const [infoReporte, setInfoReporte] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [abiertaConfirmacion, setAbiertaConfirmacion] = useState(false);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(false);
  const [opcionEnvio, setOpcionEnvio] = useState("");
  const [arregloVistoReporte, setArregloVistoReporte] = useState([]);
  const [formData, setFormData] = useState({
    clave_carrera: "",
    id_periodo: "",
    clave_grupo: "",
    estudiantes: [],
  });

  useEffect(() => {
    obtenerCarreras();
    obtenerCuc();
    setGrupoSeleccionado("");
    setFormData({
      ...formData,
      clave_carrera: "",
      id_periodo: "",
      clave_grupo: "",
      estudiantes: [],
    });
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      id_periodo: "",
      clave_grupo: "",
      estudiantes: [],
    });
    setGrupoSeleccionado("");
    obtenerPeriodos();
  }, [formData.clave_carrera]);

  useEffect(() => {
    setFormData({
      ...formData,
      clave_grupo: "",
    });
    setGrupoSeleccionado("");
    obtenerGrupos();
  }, [formData.id_periodo]);

  // useEffect(() => {
  //   obtenerInfoReporte();
  // }, [formData.clave_grupo]);
  const obtenerCuc = () => {
    axios
      .get(`${apiUrl}escolares/cuc/especifico`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCuc(response.data.data);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
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

  const obtenerPeriodos = () => {
    if (!formData.clave_carrera) {
      setPeriodos([]);
      setGrupoSeleccionado("");
      setFormData({
        ...formData,
        id_periodo: "",
      });

      return;
    }

    // .get(`${apiUrl}periodos/mes/actual`, {
    axios
      .get(`${apiUrl}carrera/${formData.clave_carrera}/periodos`, {
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

  const obtenerGrupos = () => {
    if (!formData.clave_carrera || !formData.id_periodo) {
      setGrupos([]);

      setGrupoSeleccionado("");

      return;
    }

    axios
      .get(`${apiUrl}carreras/${formData.clave_carrera}/cucs/grupos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setGrupos(response.data.data.grupos);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerinformacionReporte = (grupo, tipo) => {
    if (!formData.clave_carrera || !formData.id_periodo || !grupo) {
      setGrupos([]);
      setInfoReporte("");
      setGrupoSeleccionado("");

      return;
    }

    axios
      .get(
        `${apiUrl}grupo/${grupo.clave_grupo}/periodo/${formData.id_periodo}/materias/estudiantes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setInfoReporte(response.data.data);
        let per = periodos.find((x) => (x.id_periodo = formData.id_periodo));
        GeneradorReporteGrupo(grupo, cuc, response.data.data, per, tipo);
        // generarExcel(grupo, cuc, response.data.data);
        let g = "";

        g = arregloVistoReporte.find((x) => {
          return (
            x.clave_grupo === grupo.clave_grupo &&
            x.id_periodo === formData.id_periodo
          );
        });

        if (g) {
          if (tipo === 1) {
            g.inicial = 1;
          } else {
            g.final = 1;
          }
          
          return;
        }
        let dataVisto = {};
        if (tipo === 1) {
          dataVisto = {
            clave_grupo: grupo.clave_grupo,
            id_periodo: formData.id_periodo,
            inicial: 1,
            final: 0,
          };
        } else {
          dataVisto = {
            clave_grupo: grupo.clave_grupo,
            id_periodo: formData.id_periodo,
            inicial: 0,
            final: 1,
          };
        }

        arregloVistoReporte.push(dataVisto);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const obtenerNombreMes = (fecha) => {
    const fechaObjeto = new Date(fecha);
    const nombresMeses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    return nombresMeses[fechaObjeto.getMonth()];
  };
  const modificarRevisionReporte = (grupo) => {
    if (!formData.clave_carrera || !formData.id_periodo || !grupo) {
      setGrupos([]);
      setInfoReporte("");
      setGrupoSeleccionado("");
      // console.log("Vacio");
      return;
    }

    const fechaActual = new Date();

    const nombreMesActual = obtenerNombreMes(fechaActual);

    let periodoValido = "";
    periodoValido = periodos.find((x) => {
      // console.log(x);
      return String(x.id_periodo) === formData.id_periodo;
    });

    const nombreMesFinal = obtenerNombreMes(periodoValido.fecha_final);
    const nombreMesInicio = obtenerNombreMes(periodoValido.fecha_inicio);
    let url = "";
    // console.log(periodoValido);
    // console.log(nombreMesInicio);
    // console.log(nombreMesFinal);
    // console.log(nombreMesActual);
    if (opcionEnvio === 1) {
      if (nombreMesActual !== nombreMesInicio) {
        toast.info("El mes para enviar este reporte es " + nombreMesInicio);
        return;
      } else {
        url = `${apiUrl}grupo/${grupo.clave_grupo}/periodo/${formData.id_periodo}/aprobado/inicio`;
        toast.info("Se envio reporte inicial");
      }
    } else if (opcionEnvio === 2) {
      if (nombreMesActual !== nombreMesFinal) {
        toast.info("El mes para enviar este reporte es " + nombreMesFinal);
        return;
      } else {
        url = `${apiUrl}grupo/${grupo.clave_grupo}/periodo/${formData.id_periodo}/aprobado/final`;
        toast.info("Se envio reporte final");
      }
    }
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlBlur = (event) => {
    handleChange(event);
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    setFormIsValid(Object.keys(newErrors).length === 0); // Comprobar si no hay errores
  };

  const validateForm = (formData) => {
    let errors = {};
    return errors;
  };

  const enviarReporteRevisado = () => {
    modificarRevisionReporte(grupoSeleccionado);
    setAbiertaConfirmacion(false);
  };
  const preguntaConfirmarEnvio = (grupo, opcion) => {
    let g = "";
    if (opcion === 1) {
      g = arregloVistoReporte.find((x) => {
        return (
          x.clave_grupo === grupo.clave_grupo &&
          x.id_periodo === formData.id_periodo &&
          x.inicial === 1
        );
      });
    } else {
      g = arregloVistoReporte.find((x) => {
        return (
          x.clave_grupo === grupo.clave_grupo &&
          x.id_periodo === formData.id_periodo &&
          x.final === 1
        );
      });
    }

    if (!g) {
      toast.info(
        `Primero descargue el reporte ${opcion === 1 ? "INICIAL " : "FINAL "
        }del grupo: ${grupo.nombre} para poder habilitar esta funcion`
      );
      return;
    }
    setOpcionEnvio(opcion);

    setAbiertaConfirmacion(true);
    setGrupoSeleccionado(grupo);
  };
  const cerrarVentanaConfirmarEnvio = () => {
    setGrupoSeleccionado("");
    setAbiertaConfirmacion(false);
  };
  const descargarReporte = (grupo, tipo) => {
    obtenerinformacionReporte(grupo, tipo);
    // setGrupoSeleccionado(grupo);
    // generarExcel(grupo);
    // generarExcelParteTrasera(grupo);
  };

  return (
    <div className="ValidarGrupoPage">
      <div className="tituloValidarGrupo">
        <h1>Validar grupo para enviar reporte</h1>
      </div>
      <div className="opcionesIniciales">
        <div
          className={`opcion ${formData.clave_carrera === "" ? "vacio" : "valido"
            }`}
        >
          <label>Programa:</label>
          <SelectInput
            clave={"clave_carrera"}
            name={"clave_carrera"}
            value={formData.clave_carrera}
            datos={carreras}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={false}
            handlBlur={handlBlur}
          />
          {formData.clave_carrera === "" ? (
            <div className="orden">Primero: Seleccione un programa</div>
          ) : null}
        </div>

        <div
          className={`opcion ${formData.id_periodo === "" ? "vacio" : "valido"
            }`}
        >
          <label>Periodo:</label>
          <SelectInput
            clave={"id_periodo"}
            name={"id_periodo"}
            value={formData.id_periodo}
            datos={periodos}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={false}
          />
          {formData.clave_carrera !== "" && formData.id_periodo === "" ? (
            <div className="orden">Segundo: Seleccione un periodo</div>
          ) : null}
        </div>
      </div>
      {/* <div className="barraBusqueda">
          <BarraBusquedaC
            placeholdero="Ingrese clave de clase"
            onBuscar={handleBuscarClase}
          />
          {isLoading ? (
            <div className="cargando">Obteniendo datos, por favor espere...</div>
          ) : null}
        </div> */}
      <div className="tablaGrupos">
        <TablaValidarGrupo
          grupos={grupos}
          isLoading={isLoading}
          descargarReporte={descargarReporte}
          confirmarEnvio={preguntaConfirmarEnvio}
        />
      </div>
      <VentanaConfirmacion
        isOpen={abiertaConfirmacion}
        message={
          "¿Una vez enviado el reporte ya no puede ser modificado, esta seguro de que la informacion a enviar es correcta?"
        }
        onConfirm={enviarReporteRevisado}
        onCancel={cerrarVentanaConfirmarEnvio}
      />
    </div>
  );
};
