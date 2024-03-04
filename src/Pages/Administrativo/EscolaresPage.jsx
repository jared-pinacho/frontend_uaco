import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Administrativo/ConsejerosPage.css";
import { FormularioEscolares } from "../../Components/FormularioEscolares/FormularioEscolares";
import { TablaConsejeros } from "../../Components/TablaConsejeros/TablaConsejeros";
import { BarraBusquedaC } from "../../Components/BarraBusquedaC/BarraBusquedaC";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";

export const EscolaresPage = (props) => {
    const [escolares, serEscolares] = useState([]);
    const [escolaresCuc, setEscolaresCuc] = useState([]);
    const [modo, setModo] = useState("tabla");
    const [escolarAEditar, setEscolarAEditar] = useState("");
    const apiUrl = URL_API;
    const token = Cookies.get('tok');
    const [isLoading, setIsLoading] = useState(true);

    const obtenerEscolares = () => {
        axios
            .get(`${apiUrl}escolares/`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
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

    useEffect(() => {
        obtenerEscolares();
    }, []);

    const actualizarTabla = () => {
        obtenerEscolares(); // Volvemos a obtener los datos de los escolares
        setModo("tabla");
    };

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
        setEscolarAEditar("");
        // setCucAEliminar("");
    };

    const handleBuscarEscolar = (clave) => {
        if (clave === "") {
            toast.info('El campo esta vacio, ingrese una matricula');
            return
        }
        setIsLoading(true);
        axios
            .get(`${apiUrl}escolares/${clave}`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                setEscolarAEditar(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                //Para limpiar el formulario cuando no se encuentre la clave ingresada
                setIsLoading(false);
                setEscolarAEditar("");
                toast.error('Verifique los datos ingresados');
            });
    };

    const escolarDeCuc = (clave_cuc) => {
        if (clave_cuc === "") {
            setEscolaresCuc([]);
            toast.info('Seleccione una opcion');
            return
          }
        axios
            .get(`${apiUrl}cucs/${clave_cuc}/escolares`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                // console.log(response);
                setEscolaresCuc(response.data.data);
                //setOpciones(response.data.data);
            })
            .catch((error) => {
                setEscolaresCuc([]);
                toast.error("Error al obtener los datos");
            });
    }
    return (
        <div className="consejerosPage">
            <div className="contenidoDinamico">
                <div className="tituloConsejeros">
                    <h1>Escolares</h1>
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
                        modo="escolaresPorCuc"
                        texto="escolares Por Cuc"
                        cambiarModo={cambiarModo}
                    />
                </div>
                <div className="barraBusqueda">
                    {modo === "editar" || modo === "eliminar" ? (
                        <BarraBusquedaC placeholdero='Ingrese clave ' onBuscar={handleBuscarEscolar} />
                    ) : null}
                    {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
                    {modo === "escolaresPorCuc" ? (
                        <BarraSelect
                            urlOpciones={`${apiUrl}cucs/`}
                            txtBoton="Obtener "
                            clave={"clave_cuc"}
                            mostrar={"nombre"}
                            metodo={escolarDeCuc}
                        />
                    ) : null}
                </div>
                {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
                    <FormularioEscolares
                        modo={modo}
                        escolarAEditar={escolarAEditar}
                        actualizarTabla={actualizarTabla}
                    />
                )}
 
                {modo === "tabla" &&
                    <div className="tablaConsejero">
                        <TablaConsejeros consejeros={escolares} isLoading={isLoading}/>
                    </div>
                }
                {modo === "escolaresPorCuc" &&
                    <div className="tablaConsejero">
                        <TablaConsejeros consejeros={escolaresCuc} />
                    </div>
                }

            </div>
        </div>
    );
}