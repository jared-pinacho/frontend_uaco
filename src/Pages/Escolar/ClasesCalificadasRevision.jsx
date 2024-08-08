import React, { useEffect, useState } from 'react'
import '../Escolar/ClasesCalificadasRevision.css'
import { URL_API } from '../../Services/Const';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from "react-toastify";
import { SelectInput } from '../../Components/SelecInput/SelectInput';
import { VentanaConfirmacion } from '../../Components/VentanaConfirmacion/VentanaConfirmacion';
import { TablaCalificarClaseEscolar } from '../../Components/TablaCalificarClaseEscolar/TablaCalificarClaseEscolar';

export const ClasesCalificadasRevision = () => {
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [abiertaConfirmacion, setAbiertaConfirmacion] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [clases, setClases] = useState([]);
  const [claseSeleccionada, setClaseSeleccionda] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [tablaEditable, setTablaEditable] = useState(false);
  const [formData, setFormData] = useState({
    clave_carrera: "",
    id_periodo: "",
    clave_materia: "",
    clave_clase: "",
    estudiantes: [],
  });
  const [asistencias, setAsistencias] = useState([]);
  const [calificacionesNumericas, setCalificacionesNumericas] = useState([]);
  const [calificacionesTexto, setCalificacionesTexto] = useState([]);
  const [retroalimentaciones, setRetroalimentaciones] = useState([]);

  useEffect(() => {
    obtenerCarreras();
    setFormData({
      ...formData,
      clave_materia: "",
      id_periodo: "",
      clave_clase: "",
    });
  }, []);

  useEffect(() => {
    setClaseSeleccionda(""); //movi esto
    setEstudiantes([]);
    setFormData({
      ...formData,
      clave_materia: "",
      id_periodo: "",
      clave_clase: "",
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
    setClaseSeleccionda(""); //movi esto
    setEstudiantes([]);
    setFormData({
      ...formData,
      clave_clase: "",
    });
    obtenerClases();
  }, [formData.id_periodo]);

  useEffect(() => {
    setEstudiantes([]);
    seleccionarClase();
    obtenerEstudiantesDeClase();
    limpiarDatos();
    setTablaEditable(false);
  }, [formData.clave_clase]);

  const limpiarDatos = () => {
    setAsistencias([]);
    setCalificacionesNumericas([]);
    setCalificacionesTexto([]);
    setRetroalimentaciones([]);
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
      setClases([]);
      setPeriodos([]);
      setFormData({
        ...formData,
        clave_materia: "",
        clave_clase: "",
        id_periodo:""
      })
      //console.log("Vacio");
      return;
    }
    // console.log("Ejecute consulta");
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
    if (!formData.clave_carrera) {
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
    if (!formData.id_periodo || !formData.clave_materia || !formData.clave_carrera) {
      setClases([]);
      // console.log("vacio");
      return;
    }
    axios
      .get(
        `${apiUrl}carreras/${formData.clave_carrera}/materias/${formData.clave_materia}/periodos/${formData.id_periodo}/clases/facilitador-calificado`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setClases(response.data.data);
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const obtenerEstudiantesDeClase = () => {
    if (!formData.id_periodo || !formData.clave_clase || !formData.clave_carrera) {
      // console.log("vacio");
      // toast.info(
      //   "Primero verifique si ha seleccionado un programa, un periodo y una clase antes de presionar el boton de Obtener estudiantes"
      // );
      return;
    }
    axios
      .get(
        `${apiUrl}escolares/clases/${formData.clave_clase}/estudiantes`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setEstudiantes(response.data.data);
       
      })
      .catch((error) => {
        // console.log(error.response.data.message);
      });
  };

  const cargarDatos = () => {
    if (estudiantes.length > 0) {
      const cali = [];
      const calitext = [];
      const retroalim = [];
      const asis = [];
      estudiantes.map((estudiante, index) => {
        cali[index] = estudiante.calificacion;
        calitext[index] = estudiante.calificacion_letra;
        retroalim[index] = estudiante.retroalimentacion;
        asis[index] = estudiante.asistencia;
      
      });
      setCalificacionesNumericas(cali);
      setCalificacionesTexto(calitext);
      setRetroalimentaciones(retroalim);
      setAsistencias(asis);
    } else {
      // console.log("No hay estudiantes en esta clase");
    }
  };
  
  const editarDatos = () => {
    if (claseSeleccionada.status_escolar) {
      toast.info("Esta clase ya fue calificada asi que no puede ser editada");
      return;
    }
    cargarDatos();
    setTablaEditable(true);
  };
  const seleccionarClase = () => {
    if (!formData.clave_clase || !formData.id_periodo) {
      // console.log("No hay clase seleccioanda");
      setClaseSeleccionda("");
      return;
    }
    const clase = clases.find(
      (clas) => clas.clave_clase === formData.clave_clase
    );
    setClaseSeleccionda(clase);
    // console.log(clase)
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
  const numerosEnLetra = [
    'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
    'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve',
    'veinte', 'veintiuno', 'veintidos', 'veintitres', 'veinticuatro', 'veinticinco', 'veintiseis', 'veintisiete', 'veintiocho', 'veintinueve',
    'treinta', 'treinta y uno', 'treinta y dos', 'treinta y tres', 'treinta y cuatro', 'treinta y cinco', 'treinta y seis', 'treinta y siete', 'treinta y ocho', 'treinta y nueve',
    'cuarenta', 'cuarenta y uno', 'cuarenta y dos', 'cuarenta y tres', 'cuarenta y cuatro', 'cuarenta y cinco', 'cuarenta y seis', 'cuarenta y siete', 'cuarenta y ocho', 'cuarenta y nueve',
    'cincuenta', 'cincuenta y uno', 'cincuenta y dos', 'cincuenta y tres', 'cincuenta y cuatro', 'cincuenta y cinco', 'cincuenta y seis', 'cincuenta y siete', 'cincuenta y ocho', 'cincuenta y nueve',
    'sesenta', 'sesenta y uno', 'sesenta y dos', 'sesenta y tres', 'sesenta y cuatro', 'sesenta y cinco', 'sesenta y seis', 'sesenta y siete', 'sesenta y ocho', 'sesenta y nueve',
    'setenta', 'setenta y uno', 'setenta y dos', 'setenta y tres', 'setenta y cuatro', 'setenta y cinco', 'setenta y seis', 'setenta y siete', 'setenta y ocho', 'setenta y nueve',
    'ochenta', 'ochenta y uno', 'ochenta y dos', 'ochenta y tres', 'ochenta y cuatro', 'ochenta y cinco', 'ochenta y seis', 'ochenta y siete', 'ochenta y ocho', 'ochenta y nueve',
    'noventa', 'noventa y uno', 'noventa y dos', 'noventa y tres', 'noventa y cuatro', 'noventa y cinco', 'noventa y seis', 'noventa y siete', 'noventa y ocho', 'noventa y nueve',
    'cien'
  ];

  

  const validarDatos = () => {
    if (estudiantes.length === 0) {
      return false;
    }
    if(!tablaEditable){
      cargarDatos();
      toast.info("La tabla no se edito"); return true;
    }
    const errores = [];

    estudiantes.map((estudiante, index) => {
      const asistencia = asistencias[index];
      const calificacionNumerica = calificacionesNumericas[index];
      const calificacionTexto = calificacionesTexto[index];

      let error = false;
      let merror = "";
      merror += `Estudiante ${estudiante.nombre} ${estudiante.apellido_paterno} : `;
      if (asistencia) {
        if (isNaN(asistencia)) {
          merror += "La asistencia deber contener solo numeros. "
          error = true;

        }
        if (asistencia < 0 || asistencia > 100) {
          merror += "La asistencia debe estar entre 0 y 100. "
          error = true;
        }

      } else {
        merror += "El campo asistencia no debe estar vacio. "
        error = true;
      }
      if (calificacionNumerica) {
        if (isNaN(calificacionNumerica)) {
          merror += "La calificacion deber contener solo numeros. "
          error = true;

        }
        if (calificacionNumerica < 0 || calificacionNumerica > 100) {
          merror += "La calificacion debe estar entre 0 y 100. "
          error = true;
        }


      } else {
        merror += "El campo de calificacion numerica no debe estar vacio. "
        error = true;
      }
      if (calificacionTexto) {
        if (!/^[a-zA-Z\s]+$/.test(calificacionTexto)) {
          merror += "La calificacion en texto solo deben ser letras. "
          error = true;
        } else {
          if (calificacionNumerica) {
            if (numerosEnLetra[calificacionNumerica] !== calificacionTexto.toLowerCase()) {
              merror += "La calificacion en texto esta mal escrita. "
              error = true;
            }
          }

        }

      } else {
        merror += "El campo de calificacion en texto no debe estar vacio. "
        error = true;
      }

      if (error) {
        errores.push(merror);
      }

    });
    if (errores.length !== 0) {
      const mensajeErrores = errores.join('\n');
      toast.info(mensajeErrores);
    }
    return errores.length === 0;
  };

  const prepararDatosAEnviar = () => {
    if (claseSeleccionada.status_escolar) {
      toast.error(
        "Esta clase ya fue calificada, por lo tanto ya no puede modificar los datos"
      );
      return;
    }
    
    if (validarDatos()) {
      // toast.info("Paso validacion");
      setAbiertaConfirmacion(true);
    }
    // else {
    //   toast.info(
    //     "Verifique que los datos ingresados en los campos de la tabla estudiante sean correctos, los campos con * son obligatorios"
    //   );
    // }
  };

  const enviarCalificaciones = () => {
    setAbiertaConfirmacion(false);
    const calificacionesData = estudiantes.map((estudiante, index) => ({
      matricula: estudiante.matricula,
      asistencia: asistencias[index] || "",
      calificacion: calificacionesNumericas[index] || "",
      calificacion_letra: calificacionesTexto[index] || "",
      retroalimentacion: retroalimentaciones[index] || "",
    }));

   
    // console.log(calificacionesData);

    const dataEnviar = {
      estudiantes: calificacionesData,
      clave_clase: formData.clave_clase,
    };

    // console.log(dataEnviar);
    
    axios
      .post(
        `${apiUrl}escolar/clases/estudiantes/calificacion`,
        dataEnviar,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        setFormData({
          clave_carrera: "",
          id_periodo: "",
          clave_materia: "",
          clave_clase: "",
          estudiantes: [],
        });
        setTablaEditable(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setFormData({
          clave_carrera: "",
          id_periodo: "",
          clave_materia: "",
          clave_clase: "",
          estudiantes: [],
        });
      });
  };

  return (
    <div className="revisionClasePage">
      <div className="titulocalificarClase">
        <h1>Verificar clases calificadas</h1>
      </div>
      <div className="opcionesIniciales">
        <div
          className={`opcion ${formData.clave_carrera === "" ? "vacio" : "valido"}`}
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
          {formData.clave_materia !=="" && formData.id_periodo === "" ? (
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
          {formData.id_periodo !=="" && formData.clave_clase === "" ? (
            <div className="orden">Cuarto: Seleccione una asignatura</div>
          ) : null}
        </div>

        {/* <div className="opcion">
          <button
            className="btnObtenerEstudiantes"
            onClick={obtenerEstudiantesDeClase}
            disabled={!formData.clave_clase}
          >
            Obtener estudiantes de la clase
          </button>
        </div> */}

        <div className="calificado">
          {formData.clave_clase && claseSeleccionada ? (
            <label
              style={{
                backgroundColor: claseSeleccionada.status_escolar
                  ? "red"
                  : "green",
                width: "100%",
              }}
            >
              {claseSeleccionada.status_escolar
                ? "Asignatura calificada (No modificable)"
                : "Asignatura no calificada"}
            </label>
          ) : null}
        </div>
      </div>
      <div className="tablaCalificarEstudiantes">
      <TablaCalificarClaseEscolar
          clase={claseSeleccionada}
          estudiantes={estudiantes}
          asistencias={asistencias}
          calificacionesNumericas={calificacionesNumericas}
          calificacionesTexto={calificacionesTexto}
          retroalimentaciones={retroalimentaciones}
          isLoading={false}
          setAsistencias={setAsistencias}
          setCalificacionesNumericas={setCalificacionesNumericas}
          setCalificacionesTexto={setCalificacionesTexto}
          setRetroalimentaciones={setRetroalimentaciones}
          editarDatos={editarDatos}
          tablaEditable={tablaEditable}
        />
        
      </div>

      <div className="btnEnviar">
        <button
          onClick={prepararDatosAEnviar}
          disabled={
            !formData.clave_clase || !formData.clave_materia || !formData.id_periodo
          }
        >
          Calificar
        </button>
      </div>
      <VentanaConfirmacion
        isOpen={abiertaConfirmacion}
        message={
          "¿Una vez enviado los datos no se pueden volver a editar, esta seguro de que la informacion a enviar es correcta?"
        }
        onConfirm={enviarCalificaciones}
        onCancel={() => setAbiertaConfirmacion(false)}
      />
    </div>
  );
}
