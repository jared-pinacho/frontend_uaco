import React, { useEffect, useState } from "react";
import "../FaseTres/EscolarTres.css";
import Modal from 'react-modal';
import { saveAs } from 'file-saver';
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { VentanaInforme2 } from "../VentanaRevisar/VentanaInforme2";



export const FaseTresEscolar = ({informacion,actualizar,setActualizar}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [mostrarBoton2, setMostrarBoton2] = useState(true);
  const [mostrarComponente2, setMostrarComponente2] = useState(false);
  const [matricula, setMatricula] = useState(true);
  const [visible2, setVisible2] = useState(0);





  const [formData, setFormData] = useState({
   reporte: "",
   estado:"",
   comentario:"",
   
  });


 


  useEffect(() => {
    if (informacion) {
      setFormData({
        reporte: informacion.faseTres?.reporte_dos || "",
        estado: informacion.faseTres?.estatus_envio || "",
        comentario: informacion.faseTres?. comentario || "",
      });

      if(informacion.faseTres ===null){
     
        setVisible2(0);
      }else{

       
       
        setVisible2(informacion.faseTres?.estatus_envio);
      }
      setMatricula(informacion.estudiante?.matricula);
    }
  }, [informacion]);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
   





const handleMostrarBoton2 = () => {
  setMostrarBoton2(false); // Establece el estado para mostrar el componente
};

const handleMostrarComponente2 = () => {
  setMostrarComponente2(true); // Establece el estado para mostrar el componente
};


const actualizarDesdeHijo = () => {
  const nuevoValor = !actualizar; // Cambiar el valor de 'actualizar' (alternar entre true y false)
  setActualizar(nuevoValor); // Cambiar 'actualizar' desde el componente hijo
};


const cambiarEstadoInforme = (estado) => {
  axios
    .patch(
      `${apiUrl}cambio/estado/informe2/${informacion.estudiante.matricula}/${estado}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      
      if(estado===2){
        actualizarDesdeHijo();
      }
    })
    .catch((error) => {
     
      console.error('Error al activar el enviado:', error);
    });
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



  const closeModal = () => {
    // Cerrar el modal y liberar la URL del PDF
    setModalIsOpen(false);
    setPdfUrl(null);
  };


  return (
    <div className="Festudian">
      <label className="titul">Segundo Reporte Bimestral</label>
      
      <div className="contenedor">
        <label className="titulo-contenedor">Reporte bimestral 2</label>
      
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
          <button className="cale" onClick={closeModal}>
            Cerrar
          </button>
        </Modal>



      
        {visible2===1  && (

<div className="gg">
  <label className="archivo">Archivo subido: </label>
  <input type="text"
  value={formData.reporte}
  disabled
  />
  <button className="ver" onClick={() => descargarArchivo(formData.reporte)} >Ver</button>

  {!mostrarComponente2 && mostrarBoton2 && (

  <div className="acciones">
    <button 
     onClick={() => {
      cambiarEstadoInforme(2);
      handleMostrarBoton2();
     }}

    className="cal">Aceptar</button>
    <button 
    
    onClick={()=> {
      handleMostrarComponente2();
      cambiarEstadoInforme(3);          
     }}
    
    className="calificar-no">Rechazar</button>
  </div>
  )}


{!mostrarComponente2 && !mostrarBoton2 && (
<label className="estado-2-revisado">Archivo aprobado</label>
)}


{mostrarComponente2 && <VentanaInforme2
actualizar={actualizar}
setActualizar={setActualizar}
     
     matricula={matricula}
     
     />}

</div> )}


{visible2===0  && (
        <div className="ggx">
          
          <label className="estado-0">Estado: Archivo no enviado </label>

      </div> )}

{visible2===2  && (
        <div className="gg-2">
        <label className="archivo-2">Archivo subido: </label>
        <input type="text"
        value={formData.reporte}
        disabled
        />
        <button className="ver-2" onClick={() => descargarArchivo(formData.reporte)} >Ver</button>
        <div> 
        <label className="estado-2">Archivo revisado y aprobado </label>

        </div>
       
        </div> )}


        {visible2===3  && (
        <div className="gg-2">
        <label className="archivo-2">Archivo subido: </label>
        <input type="text"
        value={formData.reporte

        }
        disabled
        />
        <button className="ver-2" onClick={() => descargarArchivo(formData.reporte)} >Ver</button>
        <div> 
        <label className="estado-3">Archivo revisado no aprobado </label>

        </div>
       
        </div> )}
        
        

      
      



        


      </div>
   
      
    </div>
  );
};
