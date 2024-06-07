import React, { useEffect, useState } from "react";
import "../TablaAnuncios/TablaAnuncios.css";
import Loader from "../Loader/Loader";
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTrashAlt
 
} from "@fortawesome/free-solid-svg-icons";



export const TablaAnuncios = ({ anuncios, isLoading,actualizarTabla}) => {
  const [filtro, setFiltro] = useState("");
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [informacion, setInformacion] = useState(null);
  const [informacion2, setInformacion2] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const options = { year: 'numeric', month: 'long', day: 'numeric' };




  const eliminarAnuncios = (id) => {
    axios
      .delete(`${apiUrl}anuncios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response); // Imprime la respuesta completa en la consola
        if (response.data && response.data.message) {
          toast.success(response.data.message);
        } else {
          toast.success("Anuncio eliminado correctamente.");
        }
        actualizarTabla();
      })
      .catch((error) => {
        console.error(error); // Imprime el error completo en la consola
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            toast.error(error.response.data.message);
          } else {
            toast.error("Error inesperado en la respuesta del servidor.");
          }
        } else {
          toast.error("Error en la solicitud. No se pudo conectar con el servidor.");
        }
      });
  };


 

  const filasFiltradas = anuncios.filter((anuncio) => {
    const termino = filtro.toLowerCase();
   
   
    return (
      anuncio.id_anuncio.toString().toLowerCase().includes(termino) ||
      anuncio.titulo.toLowerCase().includes(termino)
    );
  });
  const filas = filasFiltradas.map((anuncio, index) => (
    <tr key={index} >
      <td>{anuncio.id_anuncio}</td>  
      <td>{anuncio.titulo}</td>
      <td>{anuncio.descripcion}</td>
      <td>{anuncio.fecha}</td>
      <td>
      <button
        className="btnElim"
        onClick={() => eliminarAnuncios(anuncio.id_anuncio)}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      </td>
     
    </tr>
  ));
  return (
    <div className="table-responsive contenedorTablaEstudiantes">
      <input
        className="campoBusqueda"
        type="text"
        placeholder="Buscar..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <table className="table-responsive table tablita">

        <thead>
          <tr>
          <th>Identificador</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Fecha  de publicación</th>
            <th>Eliminar</th>                  
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="25">
                <Loader />
              </td>
            </tr>
          ) : (
            filas
          )}
        </tbody>
      </table>
    </div>
  );
};
