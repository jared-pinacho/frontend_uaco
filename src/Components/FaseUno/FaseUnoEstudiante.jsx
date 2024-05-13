import React, { useEffect, useState } from "react";
import "../FaseUno/Estudiantx.css";
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

export const FaseUnoEstudiante = ({informacion}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [visible, setVisible] = useState(0);
  const [visible2, setVisible2] = useState(0);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [dateTime, setDateTime] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const apiUrl = URL_API;
  const token = Cookies.get("tok");

  const [formData, setFormData] = useState({
   
   estado_pres:"",
   estado_acep:"",
   carta_pres:"",
   carta_acep:"",
   comentario_pres:"",
   comentario_acep:"",

  });


  useEffect(() => {
    setFormData({
     estado_pres:informacion.faseUno.pres_estado || "",
     estado_acep:informacion.faseUno.acep_estado || "",
     carta_pres:informacion.faseUno.carta_presentacion || "",
     carta_acep:informacion.faseUno.carta_aceptacion || "",
     comentario_pres:informacion.faseUno.com_pres || "",
     comentario_acep:informacion.faseUno.come_acep || ""
    
    });
    setVisible(informacion.faseUno.pres_estado);
    setVisible2(informacion.faseUno.acep_estado);
}, []);


const cambiarPresentacion = (dato) => {
  axios
    .patch(
      `${apiUrl}estado/cambio/presentacion/carta/${dato}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("estado cambiado");
    })
    .catch((error) => {
      
      console.error("Error al activar el enviado:", error);
    });
};


const cambiarAceptacion = (dato) => {
  axios
    .patch(
      `${apiUrl}estado/cambio/aceptacion/carta/${dato}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      console.log("estado cambiado");
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
        toast.info('Por favor selecciona un archivo PDF.');
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



  const handleSubmit = async () => {
    // Verificar si se ha seleccionado un archivo
    if (selectedFile) {
        // Crear un objeto FormData para enviar el archivo al servidor
        const formData = new FormData();
        formData.append('archivo', selectedFile);
     
        axios
        .post(`${apiUrl}subir`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        })
        .then((response) => {
          toast.success(response.data.message);    
          setVisible(1);
          cambiarPresentacion(1);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });   
        
    } else {
      // No se ha seleccionado ningún archivo, mostrar mensaje de error
      toast.info('Por favor selecciona un archivo antes de enviar.');
    }
  };



  const handleSubmitAceptacion = async () => {
    // Verificar si se ha seleccionado un archivo
    if (selectedFile) {
        // Crear un objeto FormData para enviar el archivo al servidor
        const formData = new FormData();
        formData.append('archivo', selectedFile);
     
        axios
        .post(`${apiUrl}subir/aceptacion`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        })
        .then((response) => {
          toast.success(response.data.message);    
          setVisible2(1);
          cambiarAceptacion(1);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });   
        
    } else {
      // No se ha seleccionado ningún archivo, mostrar mensaje de error
      toast.info('Por favor selecciona un archivo antes de enviar.');
    }
  };





  return (
    <div className="Festudianx">
      <label className="titulx">Inicio de Servicio Social Comunitario</label>
       
      <div className="contenedorx">
        <label className="titulo-contenedorx">Carta de solicitud</label>
       
        
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
          <button className="calificarx" onClick={closeModal}>
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

<button className="subir-3" onClick={handleSubmit}>Subir</button>
<div>
<label className="estado-0">Estado: No enviado </label>
</div>


      </div> )}

      

{visible === 2  && (
<div className="accionesx">
          
<button className="verx-2" onClick={() => descargarArchivo(formData.carta_pres)} >Ver</button>
          <label className="estado-0">Estado: Revisado aceptado </label>
          </div>    
)}


{visible === 1  && (
<div className="accionesx-1">
       
       <button className="verx-1" onClick={() => descargarArchivo(formData.carta_pres)} >Ver</button>
<p className="arc-1" >Archivo subido: {formData.carta_pres}</p>
       

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

<button className="subir-3" onClick={handleSubmit}>Subir</button>
<button className="verx-3" onClick={() => descargarArchivo(formData.carta_pres)} >Ver</button>
<p className="arc-3" >Archivo subido: {formData.carta_pres}</p>
               

<label className="esx-3">Estado: Revisado no aprobado </label>
           <label className="coment">Comentarios: </label> 
           <div className="comentario">
           <span >{formData.comentario_pres}</span>

           </div>
          

          </div>    


  </div>

)}

</div>




      <div className="contenedorx">
        <label className="titulo-contenedor2x">Carta de aceptación</label>
       

        {visible2===0  && (
        <div className="ggx">
          
          <input
        type="file"
        id="fileUpload"
        accept="application/pdf"
        onChange={handleFileChange}
      />

<button className="subir-3" onClick={handleSubmitAceptacion}>Subir</button>
<div>
<label className="estado-0">Estado: No enviado </label>
</div>


      </div> )}



      {visible2 === 1  && (
<div className="accionesx-1">
       
       <button className="verx-1" onClick={() => descargarArchivo(formData.carta_acep)} >Ver</button>
<p className="arc-1" >Archivo subido: {formData.carta_acep}</p>
       

          <label className="esx-1">Estado: Enviado no revisado </label>
         
          </div>    
)}

{visible2 === 2  && (
<div className="accionesx">
          
<button className="verx-2" onClick={() => descargarArchivo(formData.carta_pres)} >Ver</button>
          <label className="estado-0">Estado: Revisado aceptado </label>
          </div>    
)}

         
      
{ visible2 === 3   && (

<div className="contener-3">

<div className="accionesx-3">
        
<input
      
      
      type="file"
      id="fileUpload"
      accept="application/pdf"
      onChange={handleFileChange}
      defaultValue={selectedFile ? selectedFile.name : textInputValue}
    />

<button className="subir-3" onClick={handleSubmitAceptacion}>Subir</button>
<button className="verx-3" onClick={() => descargarArchivo(formData.carta_acep)} >Ver</button>
<p className="arc-3" >Archivo subido: {formData.carta_acep}</p>
             

<label className="esx-3">Estado: Revisado no aprobado </label>
         <label className="coment">Comentarios: </label> 
         <div className="comentario">
         <span >{formData.comentario_acep}</span>

         </div>
        

        </div>    


</div>

)}

      </div>
    </div>
  );
};
