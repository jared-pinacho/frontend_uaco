import React, { useEffect, useState } from "react";
import "../Coordinador/ReportesRecibidos.css";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { toast } from "react-toastify";
import { SelectInput } from "../../Components/SelecInput/SelectInput";
import { GeneradorReporteGrupo } from "../../Utils/GeneradorReporteGrupo";
import { TablaReporteRecibidoGrupo } from "../../Components/TablaReporteRecibidoGrupo/TablaReporteRecibidoGrupo";
export const ReportesRecibidos = () => {
  const [cucs, setCucs] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState("");
  const [infoReporte, setInfoReporte] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clave_cuc: "",
    clave_carrera: "",
    id_periodo: "",
    clave_grupo: "",
    estudiantes: [],
  });

  useEffect(() => {
    obtenerCuc();
    setGrupoSeleccionado("");
    
    setFormData({
      ...formData,
      clave_cuc: "",
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
      clave_carrera: "",
      clave_grupo: "",
      estudiantes: [],
    });
    setGrupoSeleccionado("");
    obtenerCarreras();
  }, [formData.clave_cuc]);

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

  const obtenerCuc = () => {
    axios
      .get(`${apiUrl}cucs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCucs(response.data.data);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
      });
  };
  const obtenerCarreras = () => {
    if (!formData.clave_cuc) {
      setCarreras([]);
      setPeriodos([]);
      setGrupoSeleccionado("");
      setFormData({
        ...formData,
        id_periodo: "",
        clave_carrera: "",
      });

      return;
    }
    axios
      .get(`${apiUrl}cucs/${formData.clave_cuc}/carreras`, {
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
    if (!formData.clave_carrera || !formData.clave_cuc) {
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
        // console.log(response.data.data);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerGrupos = () => {
    if (
      !formData.clave_cuc ||
      !formData.clave_carrera ||
      !formData.id_periodo
    ) {
      setGrupos([]);

      setGrupoSeleccionado("");

      return;
    }
setIsLoading(true);
    axios
      .get(`${apiUrl}cuc/${formData.clave_cuc}/carrera/${formData.clave_carrera}/periodo/${formData.id_periodo}/grupos/aprobados`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setGrupos(response.data.data.grupos);
        // console.log(response.data)
      })
      .catch((error) => {
        setIsLoading(false);
        // console.log(error.response.data.message);
      });
  };

  const obtenerinformacionReporte = (grupo,tipo) => {
    if (
      !formData.clave_cuc ||
      !formData.clave_carrera ||
      !formData.id_periodo ||
      !grupo
    ) {
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
        // console.log(response.data.data);
        setInfoReporte(response.data.data);
        let per = periodos.find((x) => (x.id_periodo = formData.id_periodo));
        let cs = cucs.find((x) => {
          return x.clave_cuc === formData.clave_cuc;
        });
        
        GeneradorReporteGrupo(grupo, cs, response.data.data, per,tipo);
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

  
  
  const descargarReporte = (grupo,tipo) => {
    
    obtenerinformacionReporte(grupo,tipo);
    // setGrupoSeleccionado(grupo);
    // generarExcel(grupo);
    // generarExcelParteTrasera(grupo);
  };

  return (
    <div className="ReporteRecibidoGrupoPage">
      <div className="tituloReporteRecibidoGrupo">
        <h1>Reportes de CUC recibidos</h1>
      </div>
      <div className="opcionesIniciales">
        <div
          className={`opcion ${formData.clave_cuc === "" ? "vacio" : "valido"}`}
        >
          <label>CUC:</label>
          <SelectInput
            clave={"clave_cuc"}
            name={"clave_cuc"}
            value={formData.clave_cuc}
            datos={cucs}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={false}
            handlBlur={handlBlur}
          />
          {formData.clave_cuc === "" ? (
            <div className="orden">Primero: Seleccione CUC</div>
          ) : null}
        </div>

        <div
          className={`opcion ${
            formData.clave_carrera === "" ? "vacio" : "valido"
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
          {formData.clave_cuc !== "" && formData.clave_carrera === "" ? (
            <div className="orden">Segundo: Seleccione un programa</div>
          ) : null}
        </div>

        <div
          className={`opcion ${
            formData.id_periodo === "" ? "vacio" : "valido"
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
            <div className="orden">Tercero: Seleccione un periodo</div>
          ) : null}
        </div>
      </div>
      <div className="tablaGrupos">
        <TablaReporteRecibidoGrupo
          grupos={grupos}
          isLoading={isLoading}
          descargarReporte={descargarReporte}
        />
      </div>
    </div>
  );
};
