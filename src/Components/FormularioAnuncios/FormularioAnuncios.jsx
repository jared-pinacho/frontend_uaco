import React, { useEffect, useState } from "react";
import axios from "axios";
import "../FormularioAnuncios/FormularioAnuncios.css";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";

export const FormularioAnuncios = ({
  modo,
  estudianteAEditar,
  actualizarTabla,
}) => {
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
 

const dateTime = new Date(); // Asegúrate de que dateTime es una instancia de Date
  
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    
  });

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto estudianteAEditar, llenar el formulario con esos datos.
    if ((modo === "editar" || modo === "eliminar") && estudianteAEditar) {
      setFormData({
        titulo: estudianteAEditar.titulo || "",
        descripcion: estudianteAEditar.descripcion || "",
       fecha: estudianteAEditar.fecha || "",
       
       
      });
    } else {
      // Si no estamos en modo "edición" o no se proporciona un objeto estudianteAEditar, restablecer el formulario.
      setFormData({
        titulo: "",
        descripcion: "",
        fecha: new Date().toLocaleDateString(undefined, options), 
        
      });
    }
  }, [modo, estudianteAEditar]);




  const handleSubmit = (event) => {
    event.preventDefault();

    if (modo === "agregar") {
    
      // console.log(formData);
      axios
        .post(`${apiUrl}anuncios`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success('Anuncio publicado');
          actualizarTabla();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          
        });
    } else if (modo === "editar") {
      
      // console.log(formData);
      axios
        .put(`${apiUrl}anuncios/${estudianteAEditar.id_anuncio}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success('Anuncio editado correctamente');
          actualizarTabla();
          //setCarreraRegistrada(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          
        });
    } 
  };
 
  
  return (
    <div className="Festudiantesu">
      <form onSubmit={handleSubmit}>
       
        <div>
          <label>Titulo:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            required
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          />

        </div>
        <div>
    <label>Descripción:</label>
    <textarea
        name="descripcion"
        value={formData.descripcion}
        required
        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
        className="textarea-des"
    ></textarea>
</div>
        <div>
          <label>Fecha de publicación:</label>
          <input
            type="text"
            name="fecha"
            value={formData.fecha}
            require
            disabled={ true }
          
          />
     
        </div>

      
        <div>
          <button type="submit">
            {modo === "agregar" && "Publicar"}
            {modo === "editar" && "Actualizar"}
            {modo === "eliminar" && "Eliminar"}
          </button>
        </div>
      </form>
    </div>
  );
};
