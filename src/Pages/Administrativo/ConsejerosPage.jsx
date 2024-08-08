import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Administrativo/ConsejerosPage.css";
import { FormularioConsejeros } from "../../Components/FormularioConsejeros/FormularioConsejeros";
import { TablaConsejeros } from "../../Components/TablaConsejeros/TablaConsejeros";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const ConsejerosPage = (props) => {
    const [consejeros, serConsejeros] = useState([]);
    const [consejerosCuc, setConsejerosCuc] = useState([]);
    const [modo, setModo] = useState("tabla");
    const [consejeroAEditar, setConsejeroAEditar] = useState("");
    const apiUrl = URL_API;
    const token = Cookies.get('tok');
    const [isLoading, setIsLoading] = useState(true);

    const obtenerConsejeros = () => {
        axios
            .get(`${apiUrl}consejeros`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
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

    useEffect(() => {
        obtenerConsejeros();
    }, []);

    const actualizarTabla = () => {
        obtenerConsejeros(); // Volvemos a obtener los datos de los consejeros
        setModo("tabla");
    };

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setConsejeroAEditar("");
        // setCucAEliminar("");
    };

    const handleBuscarConsejero = (clave) => {
        if (clave === "") {
            toast.info('El campo esta vacio, ingrese una matricula');
            return
        }
        setIsLoading(true);
        axios
            .get(`${apiUrl}consejeros/${clave}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                setConsejeroAEditar(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //Para limpiar el formulario cuando no se encuentre la clave ingresada
                setIsLoading(false);
                setConsejeroAEditar("");
                toast.error('Verifique los datos ingresados');
            });
    };

    const consejerosDeCuc = (clave_cuc) => {
        if (clave_cuc === "") {
            setConsejerosCuc([]);
            toast.info('Seleccione una opcion');
            return
        }
        axios
            .get(`${apiUrl}cucs/${clave_cuc}/consejeros`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log(response);
                setConsejerosCuc(response.data.data);
                //setOpciones(response.data.data);
            })
            .catch((error) => {
                setConsejerosCuc([]);
                toast.error("Error al obtener los datos");
            });
    }
    return (
        <div className="consejerosPage">
            <div className="contenidoDinamico">
                <div className="tituloConsejeros">
                    <h1>Registro de Consejero</h1>
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
                        modo="consejeroPorCuc"
                        texto="Consejeros Por Cuc"
                        cambiarModo={cambiarModo}
                    />
                </div>
                <div className="barraBusqueda">
                    {modo === "editar" || modo === "eliminar" ? (
                        <BarraBusquedaC placeholdero='Ingrese clave Consejero' onBuscar={handleBuscarConsejero} />
                    ) : null}
                    {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
                    {modo === "consejeroPorCuc" ? (
                        <BarraSelect
                            urlOpciones={`${apiUrl}cucs`}
                            txtBoton="Obtener Consejeros"
                            clave={"clave_cuc"}
                            mostrar={"nombre"}
                            metodo={consejerosDeCuc}
                        />
                    ) : null}
                </div>
                {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
                    <FormularioConsejeros
                        modo={modo}
                        consejeroAEditar={consejeroAEditar}
                        actualizarTabla={actualizarTabla}
                    />
                )}

                {modo === "tabla" &&
                    <div className="tablaConsejero">
                        <TablaConsejeros consejeros={consejeros} isLoading={isLoading} />
                    </div>
                }
                {modo === "consejeroPorCuc" &&
                    <div className="tablaConsejero">
                        <TablaConsejeros consejeros={consejerosCuc} />
                    </div>
                }

            </div>
        </div>
    );
}