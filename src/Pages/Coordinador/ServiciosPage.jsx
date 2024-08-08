import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../Coordinador/ServiciosPage.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { TablaMaterias } from '../../Components/TablaMaterias/TablaMaterias';
import { BotonCRUD } from '../../Components/BotonCRUD/BotonCRUD';
import { BarraBusquedaC } from '../../Components/BarraBusquedaC/BarraBusquedaC';
import { FormularioMaterias } from '../../Components/FormularioMaterias/FormularioMaterias';
export const MateriasPage = () => {
  const [materias, setMaterias] = useState([]);
    const [modo, setModo] = useState("tabla");
    const [materiaAEditar, setMateriaAEditar] = useState("");
    const apiUrl = URL_API;
    const token = Cookies.get('tok');
  const [isLoading, setIsLoading] = useState(true);

  const obtenerMaterias=()=>{
    axios
            .get(`${apiUrl}materias`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log(response);
                setMaterias(response.data.data);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error("Error al obtener los datos de los materias");
                setIsLoading(false);
            });
  }

  useEffect(() => {
    obtenerMaterias();
  }, []);

  const actualizarTabla = () => {
    obtenerMaterias();
    setModo("tabla");
};

const cambiarModo = (nuevoModo) => {
  setModo(nuevoModo);
  setMateriaAEditar("");
  // setCucAEliminar("");
};

const handleBuscarMateria = (clave) => {
  if (clave === "") {
    toast.info('El campo esta vacio, ingrese una clave');
    return
  }
  setIsLoading(true);
  axios
    .get(`${apiUrl}materias/${clave}`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    })
    .then((response) => {
      // console.log(response.data.data);
      setMateriaAEditar(response.data.data);
      setIsLoading(false);
    })
    .catch((error) => {
      //Para limpiar el formulario cuando no se encuentre la clave ingresada
      setIsLoading(false);
      setMateriaAEditar("");
      toast.error('Verifique los datos ingresados');
    });
  
};
  return (
    <div className="materiasPage">
      <div className="contenidoDinamico">
        <div className="tituloMaterias">
          <h1>Materias</h1>
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
        </div>
        <div className="barraBusqueda">
          {modo === "editar" || modo === "eliminar" ? (
            <BarraBusquedaC placeholdero='Ingrese clave Materia' onBuscar={handleBuscarMateria} />
          ) : null}
          {isLoading && (modo === "editar" || modo === "eliminar") ? <div className="cargando">Obteniendo datos, por favor espere...</div> : null}
        </div>
        {(modo === "agregar" || modo === "editar" || modo === "eliminar") && (
          <FormularioMaterias
            modo={modo}
            materiaAEditar={materiaAEditar}
            actualizarTabla={actualizarTabla}
          />
        )}

        {modo === "tabla" &&
          <div className="tabla">
            <TablaMaterias materias={materias} isLoading={isLoading}/>
          </div>
        }

      </div>
    </div>
  )
}
