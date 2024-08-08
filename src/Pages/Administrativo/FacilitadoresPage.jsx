import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Administrativo/FacilitadoresPage.css";
import { FormularioFacilitadores } from "../../Components/FormularioFacilitadores/FormularioFacilitadores";
import { TablaFacilitadores } from "../../Components/TablaFacilitadores/TablaFacilitadores";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const FacilitadoresPage = () => {
    const [facilitadores, setFacilitadores] = useState([]);
    const [facilitadoresCuc, setFacilitadoresCuc] = useState([]);
    const [modo, setModo] = useState("tabla");
    const [facilitadorAEditar, setFacilitadorAEditar] = useState("");
    const apiUrl = URL_API;
    const token = Cookies.get('tok');
    const [isLoading, setIsLoading] = useState(true);
    const obtenerFacilitadores = () => {
        axios
            .get(`${apiUrl}facilitadores`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
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

    useEffect(() => {
        obtenerFacilitadores();
    }, []);

    const actualizarTabla = () => {
        obtenerFacilitadores(); // Volvemos a obtener los datos de los facilitadores
        setModo("tabla");
    };

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setFacilitadorAEditar("");
        // setCucAEliminar("");
    };

    const handleBuscarFacilitador = (clave) => {
        if (clave === "") {
            toast.info('El campo esta vacio, ingrese una matricula');
            return
        }
        setIsLoading(true);
        axios
            .get(`${apiUrl}facilitadores/${clave}`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                // console.log(response);
                setFacilitadorAEditar(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //Para limpiar el formulario cuando no se encuentre la clave ingresada
                setIsLoading(false);
                setFacilitadorAEditar("");
                toast.error('Verifique los datos ingresados');
            });
    };

    const facilitadoresDeCuc = (clave_cuc) => {
        if (clave_cuc === "") {
            setFacilitadoresCuc([]);
            toast.info('Seleccione una opcion');
            return
          }
        axios
            .get(`${apiUrl}cucs/${clave_cuc}/facilitadores`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                // console.log(response);
                setFacilitadoresCuc(response.data.data);
                //setOpciones(response.data.data);
            })
            .catch((error) => {
                toast.error("Error al obtener los datos");
                setFacilitadoresCuc([]);
            });
    }

    return (
        <div className="facilitadoresPage">
            <div className="contenidoDinamico">
                <div className="tituloFacilitadores">
                    <h1>Registro de Facilitador</h1>
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
                    <BotonCRUD
                        modoActual={modo}
                        modo="eliminar"
                        texto="Eliminar"
                        cambiarModo={cambiarModo}
                    />
                    <BotonCRUD
                        modoActual={modo}
                        modo="facilitadorPorCuc"
                        texto="Facilitadores Por Cuc"
                        cambiarModo={cambiarModo}
                    />
                </div>
                <div className="barraBusqueda">
                    {modo === "editar" || modo === "eliminar" ? (
                        <BarraBusquedaC placeholdero='Ingrese clave Facilitador' onBuscar={handleBuscarFacilitador} />
                    ) : null}
                    {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
                    {modo === "facilitadorPorCuc" ? (
                        <BarraSelect
                            urlOpciones={`${apiUrl}cucs`}
                            txtBoton="Obtener Facilitadores"
                            clave={"clave_cuc"}
                            mostrar={"nombre"}
                            metodo={facilitadoresDeCuc}
                        />
                    ) : null}
                </div>
                {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
                    <FormularioFacilitadores
                        modo={modo}
                        facilitadorAEditar={facilitadorAEditar}
                        actualizarTabla={actualizarTabla}
                    />
                )}

                {modo === "tabla" &&
                    <div className="tablaFacilitador">
                        <TablaFacilitadores facilitadores={facilitadores} isLoading={isLoading}/>
                    </div>
                }
                {modo === "facilitadorPorCuc" &&
                    <div className="tablaFacilitador">
                        <TablaFacilitadores facilitadores={facilitadoresCuc} />
                    </div>
                }

            </div>
        </div>
    );
}