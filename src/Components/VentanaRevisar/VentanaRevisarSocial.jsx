
import '../VentanaRevisar/VentanaRevisar.css'
import React, { useState } from 'react';
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { toast } from 'react-toastify';


export const VentanaRevisarSocial = ( {matricula}) => {
  const [texto, setTexto] = useState('');
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [mostrarComponente, setMostrarComponente] = useState(true);

  const enviaComentario = ( ) => {

    if (texto.trim()==='') {
      // Si el campo de texto está vacío o solo contiene espacios en blanco
      toast.error('Por favor, ingresa las observaciones antes de enviar.');
      return; // Evita continuar si no hay texto válido
    }

    axios
      .patch(
        `${apiUrl}envia/comentario/social/${matricula}/${texto}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
       
        setMostrarComponente(false);

      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Error al activar el enviado:', error);
      });
  };

  const handleButtonClick = () => {

   enviaComentario();

  };

  return (
    <div className='VentanaRevisar'>
    {/* Renderizar diferentes contenidos según mostrarComponente */}
    {mostrarComponente ? (
      <div >
        <label>Comentarios</label>
        <textarea
          value={texto}
          name='comen'
          id='comen'
          rows='2'
          onChange={(event) => setTexto(event.target.value)}
        ></textarea>
        <button className='button-enviar' onClick={handleButtonClick}>Enviar</button>
      </div>
    ) : (
      <div>
        {/* Etiqueta o mensaje que se muestra después de enviar el comentario */}
        <label  className='label' >Información revisada</label>
        {/* Puedes agregar más contenido aquí según tus necesidades */}
      </div>
    )}
  </div>
  )
}
