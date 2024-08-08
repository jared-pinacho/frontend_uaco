import React, { useState, useEffect } from "react";
import axios from "axios";
import "../EstudiantesPorClaseData/EstudiantesPorClase.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../SelecInput/SelectInput";
import { TablaClases } from "../TablaClases/TablaClases";
import { TablaEstudiantes } from "../TablaEstudiantes/TablaEstudiantes";
import { TablaEstudiantesBasica } from "../TablaEstudiantesBasica/TablaEstudiantesBasica";

export const EstudiantesPorClase = () => {
  const [carreras, setCarreras] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [clases, setClases] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState([]);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clave_carrera: "",
    clave_materia: "",
    clave_clase: "",
    id_periodo: "",
  });

  useEffect(() => {
    obtenerCarreras();
    
    setFormData({
      ...formData,
      clave_materia: "",
      clave_clase: "",
      id_periodo: "",
    });
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      clave_materia: "",
      clave_clase: "",
      id_periodo: "",
    });
    obtenerMaterias();
  }, [formData.clave_carrera]);

  useEffect(() => {
    setFormData({
      ...formData,
      clave_clase: "",
      id_periodo: "",
    });
    obtenerPeriodos();
  }, [formData.clave_materia]);

  useEffect(() => {
    setFormData({
      ...formData,
      clave_clase: "",
    });
    obtenerClases();
  }, [formData.id_periodo]);

  useEffect(() => {
    obtenerEstudiantes();
  }, [formData.clave_clase]);

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
      setClases([]);
      setPeriodos([]);
      setFormData({
        ...formData,
        clave_materia: "",
        clave_clase: "",
        id_periodo:""
      });
      // console.log("Vacio");
      return;
    }
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

  const obtenerPeriodos = () => {
    if (!formData.clave_carrera||!formData.clave_materia ) {
      setPeriodos([]);
      setClases([]);
      setFormData({
        ...formData,
        clave_clase: "",
        id_periodo:""
      })
      // console.log("Vacio");
      return;
    }
    // console.log("Ejecute consulta");
    // .get(`${apiUrl}periodos/`, {
    axios
      .get(`${apiUrl}carrera/${formData.clave_carrera}/periodos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setPeriodos(response.data.data);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerClases = () => {
    if (
      !formData.clave_materia ||
      !formData.clave_carrera ||
      !formData.id_periodo
    ) {
      setClases([]);
      setEstudiantes([]);
      setClaseSeleccionada([]);

      // console.log("Vacio");
      return;
    }
    // console.log("Ejecute consulta");
    axios
      .get(
        `${apiUrl}carrera/${formData.clave_carrera}/materia/${formData.clave_materia}/periodo/${formData.id_periodo}/clases`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setClases(response.data.data);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerEstudiantes = () => {
    if (
      !formData.clave_clase ||
      !formData.clave_carrera ||
      !formData.id_periodo ||
      !formData.clave_materia
    ) {
      setEstudiantes([]);
      setClaseSeleccionada([]);
      // console.log("Vacio");
      return;
    }
    setIsLoading(true);
    const clase = [
      clases.find((clase) => clase.clave_clase === formData.clave_clase),
    ];
    // console.log(clase);
    setClaseSeleccionada(clase);
    // console.log("Ejecute consulta");
    axios
      .get(
        `${apiUrl}clase/${formData.clave_clase}/estudiantes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setEstudiantes(response.data.data);
        setIsLoading(false);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.error(error);
        setEstudiantes([]);
        setIsLoading(false);
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const quitarEstudianteDeClase=(matricula)=>{
    if(!matricula || !formData.clave_clase){
      return
    } 
    const data={
      matricula:matricula,
      clave_clase:formData.clave_clase
    }
    // console.log(data);
    axios
      .post(`${apiUrl}clases/desasociar-estudiantes/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        obtenerEstudiantes();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setFormData({
          clave_carrera: "",
          clave_materia: "",
          clave_clase: "",
          estudiantes: [],
        });
      });
  }

  return (
    <div className="EstudianteClase">
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
          />
          {formData.clave_carrera === "" ? (
            <div className="orden">Primero: Seleccione un programa</div>
          ) : null}
        </div>

        <div
          className={`opcion ${formData.clave_materia === "" ? "vacio" : "valido"
            }`}
        >
          <label>Materia:</label>
          <SelectInput
            clave={"clave_materia"}
            name={"clave_materia"}
            value={formData.clave_materia}
            datos={materias}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={false}
          />
          {formData.clave_carrera !== "" && formData.clave_materia === "" ? (
            <div className="orden">Segundo: Seleccione una materia</div>
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
          {formData.clave_materia !== "" && formData.id_periodo === "" ? (
            <div className="orden">Tercero: Seleccione un periodo</div>
          ) : null}
        </div>

        <div
          className={`opcion ${formData.clave_clase === "" ? "vacio" : "valido"
            }`}
        >
          <label>Asignatura:</label>
          <SelectInput
            clave={"clave_clase"}
            name={"clave_clase"}
            value={formData.clave_clase}
            datos={clases}
            mostrar={"nombre"}
            onChange={handleChange}
            disabled={false}
          />
          {formData.id_periodo !== "" && formData.clave_clase === "" ? (
            <div className="orden">Cuarto: Seleccione una asignatura</div>
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
      <div className="tablaClaseSeleccion">
        <TablaClases clases={claseSeleccionada} isLoading={isLoading} />
      </div>
      <div className="tablaEstudiantes">
        <TablaEstudiantesBasica estudiantes={estudiantes} isLoading={isLoading} metodoDesociar={quitarEstudianteDeClase}/>
      </div>
    </div>
  );
};
