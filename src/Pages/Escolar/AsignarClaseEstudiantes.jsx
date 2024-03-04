import React, { useEffect, useState } from "react";
import "../Escolar/AsignarClaseEstudiantes.css";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../../Components/SelecInput/SelectInput";
import { TablaClases } from "../../Components/TablaClases/TablaClases";
import { TablaSeleccionEstudiantes } from "../../Components/TablaSeleccionEstudiantes/TablaSeleccionEstudiantes";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";

export const AsignarClaseEstudiantes = () => {
  const [carreras, setCarreras] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [clases, setClases] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState([]);
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    clave_carrera: "",
    clave_materia: "",
    clave_clase: "",
    id_periodo: "",
    estudiantes: [],
  });

  useEffect(() => {
    obtenerCarreras();
    setFormData({
      ...formData,
      clave_materia: "",
      clave_clase: "",
      id_periodo: "",
    })
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      clave_materia: "",
      clave_clase: "",
      id_periodo: "",
    })
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
    obtenerEstudiantesMatricula();
  }, [formData.clave_clase]);

  const obtenerCarreras = () => {
    axios
      .get(`${apiUrl}cucs/carreras/carreritas/`, {
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
      })
      // console.log("Vacio");
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
    
    // .get(`${apiUrl}periodos/mes/actual`, {
    axios
      .get(`${apiUrl}carrera/${formData.clave_carrera}/periodos/mes/actual`, {
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
    if (!formData.clave_materia || !formData.clave_carrera ||
      !formData.id_periodo) {
      setClases([]);
      setEstudiantes([]);
      setClaseSeleccionada([]);

      // console.log("Vacio");
      return;
    }
    // console.log("Ejecute consulta");
    // console.log(`${apiUrl}carreras/${formData.clave_carrera}/materias/${formData.clave_materia}/periodos/${formData.id_periodo}/clases/facilitador-nocalificado'`);
    axios
      .get(`${apiUrl}carreras/${formData.clave_carrera}/materias/${formData.clave_materia}/periodos/${formData.id_periodo}/clases/facilitador-nocalificado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
    if (!formData.clave_clase || !formData.clave_carrera || !formData.clave_materia || !formData.id_periodo) {
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
      .get(`${apiUrl}carrera/${formData.clave_carrera}/clases/${formData.clave_clase}/materia/${formData.clave_materia}/estudiantes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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

  const obtenerEstudiantesMatricula = () => {
    if (!formData.clave_clase) {
      // setEstudiantes([]);
      // setClaseSeleccionada([]);
      // console.log("Vacio");
      return;
    }
    //setIsLoading(true);
    // const clase = [
    //   clases.find((clase) => clase.clave_clase === formData.clave_clase),
    // ];
    // console.log(clase);
    // setClaseSeleccionada(clase);
    // console.log("Ejecute consulta");
    axios
      .get(`${apiUrl}carrera/clases/${formData.clave_clase}/estudiantes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setFormData({
          ...formData,
          'estudiantes': response.data.data
        });
        // setEstudiantes(response.data.data);
        // setIsLoading(false);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        // console.error(error);
        // setEstudiantes([]);
        // setIsLoading(false);
        setFormData({
          ...formData,
          'estudiantes': []
        });
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

  const handleCheckboxChange = (updatedEstudiantes) => {
    setFormData({
      ...formData,
      estudiantes: updatedEstudiantes,
    });
    // console.log(formData);
  };

  // const handleBuscarClase = (clave) => {
  //   if (clave === "") {
  //     toast.info("El campo esta vacio, ingrese una clave");
  //     return;
  //   }
  //   setIsLoading(true);
  //   axios
  //     .get(`${apiUrl}clases/${clave}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log(response);
  //       const clase=response.data.data;
  //       console.log([clase]);
  //       setClaseSeleccionada([clase]);
  //       setFormData({
  //         ...formData,
  //     "clave_carrera": clase.clave_carrera,
  //     "clave_materia": clase.clave_materia,
  //     "clave_clase": clase.clave_clase,

  //       });
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {

  //       //Para limpiar el formulario cuando no se encuentre la clave ingresada
  //       setIsLoading(false);
  //       setClaseSeleccionada([]);
  //       toast.error("Error al obtener los datos");
  //     });
  // };

  const enviarDatos = () => {
    // console.log(formData);
    if (formData.estudiantes.length === 0) {
      toast.info("Seleccione los estudiantes que desee asociar");
      return;
    }
    axios
      .post(`${apiUrl}clases/asociar-estudiantes/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        setFormData({
          clave_carrera: "",
          clave_materia: "",
          clave_clase: "",
          id_periodo:"",
          estudiantes: [],
        });
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setFormData({
          clave_carrera: "",
          clave_materia: "",
          clave_clase: "",
          id_periodo:"",
          estudiantes: [],
        });
      });
  };

  return (
    <div className="claseEstudiantePage">
      <div className="tituloClaseEstudiante">
        <h1>Asignar estudiantes a asignatura</h1>
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
            handlBlur={handlBlur}
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
            handlBlur={handlBlur}
          />
          {(formData.id_periodo !== "" && formData.clave_clase === "") ? (
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
      <div className="tablaClaseSeleccionada">
        <TablaClases clases={claseSeleccionada} isLoading={false} />
      </div>
      <div className="tablaSeleccionEstudiantes">
        <TablaSeleccionEstudiantes
          isLoading={isLoading}
          form={formData}
          estudiantes={estudiantes}
          onCheckboxChange={handleCheckboxChange}
          clave={"matricula"}
          datoform={"estudiantes"}
        />
      </div>
      <div className="btnEnviar">
        <button onClick={enviarDatos}>Agregar alumnos</button>
      </div>
    </div>
  );
};
