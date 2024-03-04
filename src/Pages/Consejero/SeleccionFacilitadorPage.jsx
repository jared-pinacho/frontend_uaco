import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Consejero/SeleccionFacilitadorPage.css";
import { TablaCucs } from "../../Components/TablaCucs/TablaCucs";
import BarraSelect from "../../Components/BarraSelect/BarraSelect";
import { TablaFacilitadores } from "../../Components/TablaFacilitadores/TablaFacilitadores";
import { BotonCRUD } from "../../Components/BotonCRUD/BotonCRUD";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
export const SeleccionFacilitadorPage = () => {
    const [Cuc, setCuc] = useState([]);
    //const [claveCarrera, setClaveCarrera] = useState("");
    const [FacilitadoresEspecificasCuc, setFacilitadoresEspecificasCuc] = useState([]);
    const [modo, setModo] = useState("agregar");
    //const [carreraADesasociar, setCarreraADesasociar] = useState("");
    // const [claveCuc, setClaveCuc] = useState("20USU0040M");
    const apiUrl = URL_API;
    const token = Cookies.get('tok');
    const [isLoading, setIsLoading] = useState(true);
    const obtenerCuc = () => {
        axios
            .get(`${apiUrl}consejeros/cuc/especifico`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                setCuc([response.data.data]);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error("Error al obtener los datos");
                setIsLoading(false);
            });
    };

    const obtenerFacilitadoresDeCuc = () => { 
        axios
            .get(`${apiUrl}cuc/consejero/facilitadores`, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                // console.log(response)
                setFacilitadoresEspecificasCuc(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error("Error al obtener los datos");
                setIsLoading(false);
            });
    };

    const obtenerDatosIniciales = () => {
        obtenerCuc();
        obtenerFacilitadoresDeCuc();
    };

    useEffect(() => {
        obtenerDatosIniciales();
        //El comentario de abajo lo pones para quitar esa advertencia
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const asociarFacilitadoresConCuc = (datosEnviar) => {
        axios
            .post(`${apiUrl}facilitadores/asociar-cuc/`, datosEnviar, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                toast.success(response.data.message);
                obtenerFacilitadoresDeCuc();
                //obtenerDatosIniciales();
            })
            .catch((error) => {
                toast.error("Error al obtener los datos:");
            });
    };
    const desasociarFacilitadorConCuc = (datosEnviar) => {
        axios
            .post(`${apiUrl}facilitadores/desasociar-cuc/`, datosEnviar, {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
              })
            .then((response) => {
                toast.success(response.data.message);
                obtenerFacilitadoresDeCuc();
                //obtenerDatosIniciales();
            })
            .catch((error) => {
                
                toast.error(error.response.data.message);
            });
    };
    const asociar = (claveFacilitador) => {
        if(!claveFacilitador){
            toast.info("Primero seleccione un facilitador");
            return
          }
        const datosEnviar = {
            facilitadorId: claveFacilitador,
            
        };
        // console.log(datosEnviar);
        asociarFacilitadoresConCuc(datosEnviar);
    };

    const desasociar = (claveFacilitador) => {
        if(!claveFacilitador){
            toast.info("Primero seleccione un facilitador");
            return
          }
        const datosEnviar = {
            facilitadorId: claveFacilitador,
            
        };
        // console.log(datosEnviar);
        desasociarFacilitadorConCuc(datosEnviar);
        setModo("agregar");
    };

    const cambiarModo = (nuevoModo) => {
        setModo(nuevoModo);
    };

    return (
        <div className="seleccionFacilitadores">
            <div className="contenidoD">
                <div className="tituloC">
                    <h1>Seleccionar Facilitadores para Cuc</h1>
                </div>

                <div className="tablaCuc">
                    <TablaCucs cucs={Cuc} isLoading={isLoading}/>
                </div>
                <div className="BtnOpciones">
                    <BotonCRUD
                        modoActual={modo}
                        modo="agregar"
                        texto="Agregar"
                        cambiarModo={cambiarModo}
                    />
                    <BotonCRUD
                        modoActual={modo}
                        modo="eliminar"
                        texto="Eliminar"
                        cambiarModo={cambiarModo}
                    />
                </div>
                <div className="botonSeleccionarFacilitadores">
                    {modo === "agregar" ? (
                        <BarraSelect
                            urlOpciones={`${apiUrl}facilitadores/`}
                            txtBoton="Agregar facilitador"
                            clave={"matricula"}
                            mostrar={"nombreC"}
                            metodo={asociar}
                        />
                    ) : null}
                    {modo === "eliminar" ? (
                        <BarraSelect
                            urlOpciones={`${apiUrl}cuc/consejero/facilitadores`}
                            txtBoton="Eliminar facilitador"
                            clave={"matricula"}
                            mostrar={"nombreC"}
                            metodo={desasociar}
                        />
                    ) : null}
                </div>
                <div className="tablaC">
                    <TablaFacilitadores facilitadores={FacilitadoresEspecificasCuc} isLoading={isLoading}/>
                </div>
            </div>
        </div>
    );
};