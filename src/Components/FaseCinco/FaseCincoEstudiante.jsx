import React, { useEffect, useState } from "react";
import "../FaseCinco/EstudianteCinco.css";
import Modal from 'react-modal';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from "../../assets/img/logoUACO.png";
import { saveAs } from 'file-saver';
import { Toast } from "bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";

// Configuración de las fuentes necesarias para pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const FaseCincoEstudiante = ({informacion, actualizar,setActualizar}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [visible, setVisible] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [matricula, setMatricula] = useState(null);



  const [formData, setFormData] = useState({
   carta:"",
   estatus_envio:"",
   comentario:"",
  });


  useEffect(() => {
    if (informacion?.faseCinco !==null) {
    setFormData({
      carta: informacion.faseCinco?.carta_terminacion || "",
      estado: informacion.faseCinco?.estatus_envio || "",
      comentario: informacion.faseCinco?. comentario || "",
    
    });
    setVisible(informacion.faseCinco.estatus_envio);
    setMatricula(informacion.estudiante?.matricula);
  }

  setMatricula(informacion.estudiante?.matricula);
}, []);


const cambiarPresentacion = (dato) => {
  axios
    .patch(
      `${apiUrl}estado/cambio/carta/terminacion/${dato}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
    //  console.log("estado cambiado");
    })
    .catch((error) => {
      
      console.error("Error al activar el enviado:", error);
    });
};



  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtener el primer archivo seleccionado
    // Verificar si se seleccionó un archivo
    if (file) {
      // Verificar el tipo de archivo (solo permitir archivos PDF)
      if (file.type === 'application/pdf') {
        // Verificar el tamaño del archivo (en bytes)
        const maxSizeBytes = 1024 * 1024; // 1 MB 
        
        if (file.size > maxSizeBytes) {
          // Archivo demasiado grande, mostrar mensaje de error
          toast.error('El archivo seleccionado es demasiado grande. Por favor selecciona un archivo más pequeño.');
        } else {
          // Archivo válido, actualizar el estado con el archivo seleccionado
          setSelectedFile(file);
        }
      } else {
        // Tipo de archivo no válido, mostrar mensaje de error
        toast.info('Por favor selecciona un archivo valido.');
      }
    }
  };




  const descargarArchivo = (nombreArchivo) => {
    axios.get(`${apiUrl}archivos/${nombreArchivo}`, {
      headers: {
        Authorization: `Bearer ${token}`   
      },
      responseType: 'arraybuffer'
    })
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      if (windowWidth < 769 || windowWidth === 1024 || windowWidth === 1440 ) { 

        saveAs(blob);

      }else{
        setPdfUrl(url);
        setModalIsOpen(true); 
      }

    })
    .catch(error => {
      console.error('Error al descargar el archivo:', error);
    });
  };


  useEffect(() => {


    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
   


  const closeModal = () => {
    // Cerrar el modal y liberar la URL del PDF
    setModalIsOpen(false);
    setPdfUrl(null);
  };


  const actualizarDesdeHijo = () => {
    const nuevoValor = !actualizar; // Cambiar el valor de 'actualizar' (alternar entre true y false)
    setActualizar(nuevoValor); // Cambiar 'actualizar' desde el componente hijo
  };

  const handleSubmitTerminacion = async () => {
    // Verificar si se ha seleccionado un archivo
    if (selectedFile) {
        // Crear un objeto FormData para enviar el archivo al servidor
        const formData = new FormData();
        formData.append('archivo', selectedFile);
     
        axios
        .post(`${apiUrl}subir/doc/terminacion`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        })
        .then((response) => {
          toast.success(response.data.message);    
          setVisible(4);
          cambiarPresentacion(1);
          actualizarDesdeHijo();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });   
        
    } else {
      // No se ha seleccionado ningún archivo, mostrar mensaje de error
      toast.info('Por favor selecciona un archivo valido antes de enviar.');
    }
  };



  return (
    <div className="Festudianx">
      <label className="titulx">Final de Servicio Social Comunitario</label>
       
      <div className="contenedorx">
        <label className="titulo-contenedorxj">Carta de terminación</label>
       
        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal para visualizar PDF"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '800px',
            },
          }}
        >
          {/* Renderizar el PDF dentro del modal usando un <iframe> */}
          {pdfUrl && (
            <iframe title="Visor de PDF" width="100%" height="600" src={pdfUrl} />
          )}
          <button className="calificarz" onClick={closeModal}>
            Cerrar
          </button>
        </Modal>


        {visible===0  && (
        <div className="ggx">
          
          <input
        type="file"
        id="fileUpload"
        accept="application/pdf"
        onChange={handleFileChange}
      />

<button className="subir-3" onClick={handleSubmitTerminacion}>Subir</button>
<div>
<label className="estado-0">Estado: No enviado </label>
</div>


      </div> )}

      

{visible === 2  && (
<div className="accionesx">
          
<button className="verx-2" onClick={() => descargarArchivo(formData.carta)} >Ver</button>
          <label className="estado-0">Estado: Revisado aceptado </label>
          </div>    
)}


{visible === 1  && (
<div className="accionesx-1">
       
       <button className="verx-1" onClick={() => descargarArchivo(formData.carta)} >Ver</button>
<p className="arc-1" >Archivo subido: {formData.carta}</p>
       

          <label className="esx-1">Estado: Enviado no revisado </label>
         
          </div>    
)}


{ visible === 3   && (

  <div className="contener-3">

<div className="accionesx-3">
          
<input
        
        
        type="file"
        id="fileUpload"
        accept="application/pdf"
        onChange={handleFileChange}
        defaultValue={selectedFile ? selectedFile.name : textInputValue}
      />

<button className="subir-3" onClick={handleSubmitTerminacion}>Subir</button>
<button className="verx-3" onClick={() => descargarArchivo(formData.carta)} >Ver</button>
<p className="arc-3" >Archivo subido: {formData.carta}</p>
               

<label className="esx-3">Estado: Revisado no aprobado </label>
           <label className="coment">Comentarios: </label> 
           <div className="comentario">
           <span >{formData.comentario}</span>

           </div>
          </div>    
  </div>

)}



{visible === 4  && (
<div className="accionesz-4i">
       
<p className="arc-1z-4" >Archivo subido:termino{matricula}</p>
       
          <label className="esz-1">Estado: Enviado no revisado </label>
         
          </div>    
)}



</div>

</div>

  );
};
