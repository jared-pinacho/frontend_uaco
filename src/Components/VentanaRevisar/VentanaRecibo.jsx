
import '../VentanaRevisar/VentanaPresentacion.css'
import React, { useState } from 'react';
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { toast } from 'react-toastify';


export const VentanaRecibo = ( {matricula,actualizar,setActualizar}) => {
  const [texto, setTexto] = useState('');
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [mostrarComponente, setMostrarComponente] = useState(true);

  const enviaComentario = ( ) => {

    const actualizarDesdeHijo = () => {
      const nuevoValor = !actualizar; // Cambiar el valor de 'actualizar' (alternar entre true y false)
      setActualizar(nuevoValor); // Cambiar 'actualizar' desde el componente hijo
    };
    


    if (texto.trim()==='') {
      // Si el campo de texto está vacío o solo contiene espacios en blanco
      toast.error('Por favor, ingresa las observaciones antes de enviar.');
      return; // Evita continuar si no hay texto válido
    }

    axios
      .patch(
        `${apiUrl}envia/comentario/recibo/${matricula}/${texto}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
      
        setMostrarComponente(false);
actualizarDesdeHijo();
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
    <div className='Ventana'>
    {/* Renderizar diferentes contenidos según mostrarComponente */}
    {mostrarComponente ? (
      <div  >
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
        <label  className='labe' >Archivo revisado</label>
        {/* Puedes agregar más contenido aquí según tus necesidades */}
      </div>
    )}
  </div>
  )
}
