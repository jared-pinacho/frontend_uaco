import React, { useEffect, useState } from "react";
import "../Coordinador/DatosGeneralesPage.css";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { TablaConsejeros } from "../../Components/TablaConsejeros/TablaConsejeros";
import { TablaFacilitadores } from "../../Components/TablaFacilitadores/TablaFacilitadores";
import { SelectInput } from "../../Components/SelecInput/SelectInput";
import { TablaEstudiantes } from "../../Components/TablaEstudiantes/TablaEstudiantes";
import { VentanaEstadoDocumentacion } from "../../Components/VentanaEstadoDocumentacion/VentanaEstadoDocumentacion";
import { VentanaModalKardex } from "../../Components/VentanaModalKardex/VentanaModalKardex";

export const DatosGeneralesPage = () => {
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [modo, setModo] = useState("consejero");
  const [cucs, setCucs] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [escolares, serEscolares] = useState([]);
  const [consejeros, serConsejeros] = useState([]);
  const [facilitadores, setFacilitadores] = useState([]);
  const [facilitadoresCuc, setFacilitadoresCuc] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesCuc, setEstudiantesCuc] = useState([]);
  const [estudianteDocumentacion, setEstudianteDocumentacion] = useState("");
  const [estudianteKardex, setEstudianteKardex] = useState("");
  const [abiertaDocumentacion, setAbiertaDocumentacion] = useState(false);
  const [abiertoKardex, setAbiertoKardex] = useState(false);
  const [formData, setFormData] = useState({
    clave_cuc: "",
    clave_carrera: "",
    clave_grupo: "",
  });
  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setFacilitadoresCuc([]);
    setEstudiantesCuc([]);
    cerrarDocumentacion();
    cerrarKardex();
    setFormData({
      ...formData,
      clave_cuc: "",
      clave_carrera: "",
      clave_grupo: "",
    });
  };
  useEffect(() => {
    obtenerCucs();
    obtenerConsejeros();
    obtenerEscolares();
    obtenerFacilitadores();
    obtenerEstudiantes();
  }, []);

  useEffect(() => {
    obtenerFacilitadoresCuc();
    obtenerCarreras();
    setCarreras([]);
    setGrupos([]);
    setFormData({
      ...formData,
      clave_carrera: "",
      clave_grupo: "",
    });
  }, [formData.clave_cuc]);

  useEffect(() => {
    obtenerGrupos();
    setGrupos([]);
    setFormData({
      ...formData,
      clave_grupo: "",
    });
  }, [formData.clave_carrera]);

  useEffect(() => {
    setEstudiantesCuc([]);
    obtenerEstudiantesCuc();
  }, [formData.clave_grupo]);

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
  const obtenerCarreras = () => {
    if (formData.clave_cuc === "" || modo !== "estudianteCuc") {
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
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
      });
  };

  const obtenerGrupos = () => {
    if (
      formData.clave_cuc === "" ||
      formData.clave_carrera === "" ||
      modo !== "estudianteCuc"
    ) {
      return;
    }
    axios
      .get(
        `${apiUrl}carreras/${formData.clave_carrera}/cucs/${formData.clave_cuc}/grupos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        setGrupos(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de los programas");
        setIsLoading(false);
      });
  };
  const obtenerConsejeros = () => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}consejeros/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        serConsejeros(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  };

  const obtenerEscolares = () => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}escolares/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        serEscolares(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  };

  const obtenerFacilitadores = () => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}facilitadores/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFacilitadores(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de los Facilitadores");
        setIsLoading(false);
      });
  };

  const obtenerFacilitadoresCuc = () => {
    if (formData.clave_cuc === "" || modo !== "facilitadorCuc") {
      return;
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}cucs/${formData.clave_cuc}/facilitadores`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFacilitadoresCuc(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de los Facilitadores");
        setIsLoading(false);
      });
  };

  const obtenerEstudiantes = () => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}estudiantes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEstudiantes(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.error("Error al obtener los datos:", error);
        setIsLoading(false);
      });
  };
  const obtenerEstudiantesCuc = () => {
    if (
      formData.clave_cuc === "" ||
      formData.clave_carrera === "" ||
      formData.clave_grupo === "" ||
      modo !== "estudianteCuc"
    ) {
      return;
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}grupos/${formData.clave_grupo}/estudiantes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setEstudiantesCuc(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        // console.error("Error al obtener los datos:", error);
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
  const handlBlur = (event) => {};
  const abrirDocumentacion = (estudiante) => {
    if (!estudiante) {
      return;
    }

    setEstudianteDocumentacion(estudiante);
    // setDocumentos(estudiante.documentacion);
    setAbiertaDocumentacion(true);
  };

  const abrirKardex = (estudiante) => {
    if (!estudiante) {
      return;
    }
    setEstudianteKardex(estudiante);

    setAbiertoKardex(true);
  };

  const cerrarDocumentacion = () => {
    setEstudianteDocumentacion("");

    // setDocumentos([]);
    setAbiertaDocumentacion(false);
  };

  const cerrarKardex = () => {
    setEstudianteKardex("");
    setAbiertoKardex(false);
  };
  const enviarEstadoDocumentacion = (data) => {
    if (!data) {
      toast.info(
        "No hay un estudiante seleccionado para enviar su documentacion"
      );
    }
  };
  return (
    <div className="generalPage">
      <div className="contenidoDinamico">
        <div className="titulogeneral">
          <h1>Datos Generales</h1>
        </div>
        <div className="BtnOpciones">
          <BotonCRUD
            modoActual={modo}
            modo="consejero"
            texto="Consejeria academica"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="escolar"
            texto="Servicios escolares"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="facilitadorUaco"
            texto="Facilitadores UACO"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="facilitadorCuc"
            texto="Facilitadores CUC"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="estudianteUaco"
            texto="Estudiantes UACO"
            cambiarModo={cambiarModo}
          />
          <BotonCRUD
            modoActual={modo}
            modo="estudianteCuc"
            texto="Estudiantes CUC"
            cambiarModo={cambiarModo}
          />
        </div>

        {modo === "consejero" && (
          <div className="tabla">
            <TablaConsejeros consejeros={consejeros} isLoading={isLoading} />
          </div>
        )}

        {modo === "escolar" && (
          <div className="tabla">
            <TablaConsejeros consejeros={escolares} isLoading={isLoading}/>
          </div>
        )}

        {modo === "facilitadorUaco" && (
          <div className="tabla">
            <TablaFacilitadores facilitadores={facilitadores} isLoading={isLoading}/>
          </div>
        )}

        {modo === "facilitadorCuc" && (
          <>
            <div className="filtro">
              <label>Seleccione CUC:</label>
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
            </div>
            <div className="tabla">
              <TablaFacilitadores facilitadores={facilitadoresCuc} isLoading={isLoading}/>
            </div>
          </>
        )}

        {modo === "estudianteUaco" && (
            <>
          <div className="tabla">
            <TablaEstudiantes
              estudiantes={estudiantes}
              isLoading={isLoading}
              abrirDocumentacion={abrirDocumentacion}
              abrirKardex={abrirKardex}
            />
          </div>
          {estudianteDocumentacion ? (
              <VentanaEstadoDocumentacion
                abierto={abiertaDocumentacion}
                estudiante={estudianteDocumentacion}
                enviar={enviarEstadoDocumentacion}
                onCancel={() => cerrarDocumentacion()}
                editable={false}
                grado={
                  estudianteDocumentacion &&
                  estudianteDocumentacion.grupo &&
                  estudianteDocumentacion.grupo.carrera
                    ? estudianteDocumentacion.grupo.carrera.grado
                    : ""
                }
              />
            ) : null}

            {estudianteKardex ? (
              <VentanaModalKardex
                abierto={abiertoKardex}
                estudiante={estudianteKardex}
                onCancel={() => cerrarKardex()}
              />
            ) : null}
            </>
          
        )}

        {modo === "estudianteCuc" && (
          <>
            <div className="filtroMultiple">
              <div className="opcion">
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
              </div>
              <div className="opcion">
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
              </div>
              <div className="opcion">
                <label>Grupo:</label>
                <SelectInput
                  clave={"clave_grupo"}
                  name={"clave_grupo"}
                  value={formData.clave_grupo}
                  datos={grupos}
                  mostrar={"nombre"}
                  onChange={handleChange}
                  disabled={false}
                  handlBlur={handlBlur}
                />
              </div>
            </div>
            <div className="tabla">
              <TablaEstudiantes
                estudiantes={estudiantesCuc}
                isLoading={isLoading}
                abrirDocumentacion={abrirDocumentacion}
                abrirKardex={abrirKardex}
              />
            </div>
            {estudianteDocumentacion ? (
              <VentanaEstadoDocumentacion
                abierto={abiertaDocumentacion}
                estudiante={estudianteDocumentacion}
                enviar={enviarEstadoDocumentacion}
                onCancel={() => cerrarDocumentacion()}
                editable={false}
                grado={
                  estudianteDocumentacion &&
                  estudianteDocumentacion.grupo &&
                  estudianteDocumentacion.grupo.carrera
                    ? estudianteDocumentacion.grupo.carrera.grado
                    : ""
                }
              />
            ) : null}

            {estudianteKardex ? (
              <VentanaModalKardex
                abierto={abiertoKardex}
                estudiante={estudianteKardex}
                onCancel={() => cerrarKardex()}
              />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
