import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Escolar/GruposPage.css";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { TablaGrupos } from "../../Components/TablaGrupos/TablaGrupos";
import { FormularioGrupo } from "../../Components/FormularioGrupo/FormularioGrupo";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const GruposPage = () => {
    const [grupos, setGrupos] = useState([]);
    const [gruposCarrera, setGruposCarrera] = useState([]);
    const [modo, setModo] = useState("tabla");
    const [grupoAEditar, setGrupoAEditar] = useState("");
    // const [claveCuc, setClaveCuc] = useState("20USU0040M");
    const apiUrl = URL_API;
    const token = Cookies.get('tok');
    const [isLoading, setIsLoading] = useState(true);
    // const [carreraAEliminar, setCarreraAEliminar] = useState("");

    const obtenerGrupos = () => {
        axios
            .get(`${apiUrl}cucs/grupos/grupitos`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
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

    useEffect(() => {
        obtenerGrupos();
        //Si estás seguro de que obtenerGrupos no cambia durante la vida útil del componente y 
        //no deseas observarlo como una dependencia, puedes deshabilitar la advertencia utilizando 
        //un comentario especial:
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const actualizarTabla = () => {
        obtenerGrupos();
        setModo("tabla");
    };

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setGrupoAEditar("");
        // setCarreraAEliminar("");
    };

    const handleBuscarGrupo = (clave) => {
        if (clave === "") {
            toast.info('El campo esta vacio, ingrese una clave');
            return
        }
        setIsLoading(true);
        axios
            .get(`${apiUrl}grupos/${clave}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log(response);
                setGrupoAEditar(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //Para limpiar el formulario cuando no se encuentre la clave ingresada
                setIsLoading(false);
                setGrupoAEditar("");
                toast.error("Error al obtener los datos");
            });
        //if (modo === "editar") {
        //setGrupoAEditar(clave);
        //}
        // else if (modo === "eliminar") {
        //   setCarreraAEliminar(clave);
        // }
    };

    const gruposdeCarreras = (clave_carrera) => {
        if (clave_carrera === "") {
            setGruposCarrera([]);
            toast.info('Seleccione una opcion');
            return
        }
        axios  
            .get(`${apiUrl}carreras/${clave_carrera}/cucs/grupos`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log(response);
                setGruposCarrera(response.data.data.grupos);
                //setOpciones(response.data.data);
            })
            .catch((error) => {
                toast.error("Error al obtener los datos");
            });
    }

    return (
        <div className="carrerasPage">
            <div className="contenidoDinamico">
                <div className="tituloCarreras">
                    <h1>Registro de Grupos</h1>
                </div>
                <div className="BtnOpciones">
                    <BotonCRUD
                        modoActual={modo}
                        modo="tabla"
                        texto="Tabla"
                        cambiarModo={cambiarModo}
                    />
                    <BotonCRUD
                        modoActual={modo}
                        modo="agregar"
                        texto="Agregar"
                        cambiarModo={cambiarModo}
                    />
                    <BotonCRUD
                        modoActual={modo}
                        modo="editar"
                        texto="Editar"
                        cambiarModo={cambiarModo}
                    />
                    {/* <BotonCRUD
                        modoActual={modo}
                        modo="eliminar"
                        texto="Eliminar"
                        cambiarModo={cambiarModo}
                    /> */}
                    <BotonCRUD
                        modoActual={modo}
                        modo="grupoPorCarrera"
                        texto="Grupos Por Programa"
                        cambiarModo={cambiarModo}
                    />
                </div>
                <div className="barraBusqueda">
                    {modo === "editar" || modo === "eliminar" ? (
                        <BarraBusquedaC placeholdero='Ingrese clave del Grupo' onBuscar={handleBuscarGrupo} />
                    ) : null}
                    {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
                    {modo === "grupoPorCarrera" ? (
                        <BarraSelect
                            urlOpciones={`${apiUrl}cucs/carreras/carreritas`}
                            txtBoton="Obtener Grupos"
                            clave={"clave_carrera"}
                            mostrar={"nombre"}
                            metodo={gruposdeCarreras}
                        />
                        // <OpcionesGruposCarrera cargarGruposCarrera={setGruposCarrera} />

                    ) : null}

                </div>

                {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
                    <FormularioGrupo
                        modo={modo}
                        grupoAEditar={grupoAEditar}
                        actualizarTabla={actualizarTabla}
                    />
                )}
                {modo === "tabla" &&
                    <div className="tabla">
                        <TablaGrupos grupos={grupos} isLoading={isLoading} />
                    </div>
                }
                {modo === "grupoPorCarrera" &&
                    <div className="tabla">
                        <TablaGrupos grupos={gruposCarrera} />
                    </div>
                }
            </div>
        </div>
    );
};