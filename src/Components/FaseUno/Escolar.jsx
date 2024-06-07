import React, { useEffect, useState } from "react";
import "../FaseUno/Escolar.css";
import Modal from 'react-modal';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from "../../assets/img/logoUACO.png";
import { saveAs } from 'file-saver';
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { VentanaRevisar } from "../VentanaRevisar/VentanaRevisar";
import { VentanaPresentacion } from "../VentanaRevisar/VentanaPresentacion";
import { VentanaAceptacion } from "../VentanaRevisar/VentanaAceptacion";


// Configuración de las fuentes necesarias para pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Escolar = ({informacion, actualizar, setActualizar}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [dateTime, setDateTime] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visible, setVisible] = useState(0);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [mostrarBoton, setMostrarBoton] = useState(true);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [mostrarBoton2, setMostrarBoton2] = useState(true);
  const [mostrarComponente2, setMostrarComponente2] = useState(false);
  const [matricula, setMatricula] = useState(true);
  const [visible2, setVisible2] = useState(0);





  const [formData, setFormData] = useState({
   nombre_dep: "",
   cuc_calle:"",
   cuc_numEx:"",
   cuc_colonia:"",
   cuc_municipio:"",
   cuc_cp:"",
   cargo_tit:"",
   titular:"",
   grado_tit:"",
   consejero:"",
   cuc_nombre:"",
   estudiante:"",
   sexo_consejero:"",
   proyecto:"",
   responsable:"",
   actividad:"",
   fecha_inicio:"",
   fecha_final:"",
   horas:"",
   estado_pres:"",
   estado_acep:"",
   carta_pres:"",
   carta_acep:"",
   comentario_pres:"",
  });


 


  useEffect(() => {
    if (informacion) {
      setFormData({
        nombre_dep: informacion.servicio?.nombre_dep || "",
        cuc_calle: informacion.cuc?.direccion?.calle || "", 
        cuc_numEx: informacion.cuc?.direccion?.num_exterior || "", 
        cuc_colonia: informacion.cuc?.direccion?.colonia?.nombre || "",
        cuc_municipio: informacion.cuc?.direccion?.colonia?.municipio?.nombre || "",
        cuc_estado: informacion.cuc?.direccion?.colonia?.municipio?.estado?.nombre || "",
        grado_tit: informacion.servicio?.grado_tit || "",
        titular: informacion.servicio?.titular_dep || "",
        cargo_tit: informacion.servicio?.cargo_tit || "",
        consejero: obtenerNombreCompleto(informacion) || "",
        sexo_con: informacion.consejero?.sexo || "",
        sexo_est: informacion.estudiante?.sexo || "",
        cuc_nombre: informacion.cuc?.nombre?.substring(6) || "",
        estudiante: nombreCompleto(informacion)?.toUpperCase() || "",
        matricula: informacion.estudiante?.matricula || "",
        carrera: informacion.carrera || "",
        proyecto: informacion.servicio?.programa || "",
        responsable: informacion.servicio?.responsable || "",
        actividad: informacion.servicio?.actividad || "",
        fecha_inicio: informacion.servicio?.fecha_ini || "",
        fecha_final: informacion.servicio?.fecha_fin || "",
        horas: informacion.servicio?.horas || "",
        cuc_cp: informacion.cuc?.direccion?.colonia?.id_cp || "",
        estado_pres: informacion.faseUno?.pres_estado || "",
        carta_pres: informacion.faseUno?.carta_presentacion || "",
        carta_acep: informacion.faseUno?.carta_aceptacion || "",
        comentario_pres: informacion.faseUno?.com_pres || "",
        estado_acep: informacion.faseUno?.acep_estado || "",
      });

      if(informacion.faseUno ===null){
        setVisible(0);
        setVisible2(0);
      }else{

        setVisible(informacion.faseUno?.pres_estado);
       
        setVisible2(informacion.faseUno?.acep_estado);
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
   

 const obtenerNombreCompleto = (informacion) => {
   
      return `${informacion.consejero.nombre} ${informacion.consejero.apellido_paterno} ${informacion.consejero.apellido_materno}`;
   };

   const nombreCompleto = (informacion) => {
   
    return `${informacion.estudiante.nombre} ${informacion.estudiante.apellido_paterno} ${informacion.estudiante.apellido_materno}`;
 };


 const handleMostrarBoton = () => {
  setMostrarBoton(false); // Establece el estado para mostrar el componente
};

const handleMostrarComponente = () => {
  setMostrarComponente(true); // Establece el estado para mostrar el componente
};



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


const cambiarEstado = (estado) => {
  axios
    .patch(
      `${apiUrl}cambio/estado/presentacion/${informacion.estudiante.matricula}/${estado}`,
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




const cambiarEstadoAceptacion = (estado) => {
  axios
    .patch(
      `${apiUrl}cambio/estado/aceptacion/${informacion.estudiante.matricula}/${estado}`,
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





 const loadImageAsBase64 = (imageUrl, callback) => {
  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const base64Data = canvas.toDataURL('image/png');
    callback(base64Data);
  };
  img.src = imageUrl;
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



  const generarSolicitud = () => {

    loadImageAsBase64(logo, (imageData) => {

    
   var articulo_consejero = "";
   var articulo = "";
   var consejer = "";
   var articulo_estudiante="";
   var articulo_may="";

   if(formData.sexo_con === "H"){
     articulo_consejero="El";
     consejer="Consejero académico";
     articulo="el";
   }else{
    articulo_consejero="La";
    consejer="Consejera académica";
    articulo="la";
   }


   if(formData.sexo_est === "H"){
    articulo_estudiante="el";
    articulo_may="El";
    
  }else{
   articulo_may="La";
   articulo_estudiante="la";
  }

  
    let formattedDate = dateTime.toLocaleDateString(undefined, options);
    let fechainicio = new Date(formData.fecha_inicio).toLocaleDateString('es-MX');
    let fechafinal = new Date(formData.fecha_final).toLocaleDateString('es-MX');

  
const documentDefinition = {
  content: [
// Agregar la imagen como encabezado
{ image: imageData, height:70, width: 70, alignment: 'left', margin: [0,-30, 0, 5] // Margen [left, top, right, bottom]
},
 // Asunto en negrita
 { text: '|', margin: [70,-76, 0, 0],bold:false,color:"#135585" ,fontSize:33},

 { text: '|', margin: [70,-10, 0, 0],bold:false,color:"#135585" ,fontSize:33},


 { text: 'Universidad Autonóma Comunal de Oaxaca', margin: [80,-60, 350, 0],bold:true,color:"#135585" ,fontSize:12},

 { text: '|', margin: [151,-62, 0, 0],bold:false,color:"#135585" ,fontSize:33},

 { text: '|', margin: [151,-11, 0, 0],bold:false,color:"#135585" ,fontSize:33},

 
 { text: `${formData.cuc_nombre}`, margin: [162,-60, 200, 0],bold:true,color:"#135585" ,fontSize:11},

    // Encabezado con dirección y fecha
    { text: `${formData.cuc_colonia}, ${formData.cuc_municipio}, ${formData.cuc_estado} a ${formattedDate}`, style: 'header' },

    // Asunto en negrita
    { text: 'Asunto: Carta de solicitud', style: 'asunto' },

    // Datos del titular en negrita
    { text: `${formData.grado_tit}. ${formData.titular}`, style: 'datos' },
 // Saludo inicial
 { text:`${formData.cargo_tit}`, style: 'datos' },
    // Saludo inicial
    { text: 'P R E S E N T E', style: 'datos' },

    // Párrafo principal con texto combinado y estilos específicos
    {
      text: [
        { text: `${articulo_consejero} que suscribe ${articulo}`, style: 'parrafo' },
        { text: `${consejer} `, style: 'parrafo' }, // Consejero en negrita
        { text: `${formData.consejero} del `, style: 'parrafo' },
        { text: `${formData.cuc_nombre}`, style: 'parrafoBold' }, // CUC Nombre en negrita
        { text: ' por este conducto me permito comunicar a usted que ', style: 'parrafo' },
        { text: `${articulo_estudiante} estudiante  `, style: 'parrafo' },
        { text: `${formData.estudiante}`, style: 'parrafoBold' },
        { text: 'con número de matrícula ', style: 'parrafo' },
        { text: ` ${formData.matricula}`, style: 'parrafoBold' },
        { text: ' del programa en educación en ', style: 'parrafo' },
        { text: `${formData.carrera}`, style: 'parrafoBold' },
        { text: ' desea realizar su servicio social dentro de su noble institución.\n', style: 'parrafo' },
        { text: `${articulo_may} estudiante tiene la intención de colaborar en el programa denominado `, style: 'parrafo' },
        { text: `"${formData.proyecto}".`, style: 'parrafoBold' },
        { text: `La supervisión directa estará a cargo de ${formData.responsable}`, style: 'parrafo' },
        { text: ` realizando las siguientes actividades: ${formData.actividad}.\n`, style: 'parrafo' },
        { text: `Asimismo, le informo que las fechas de Servicio Social comprenden desde`, style: 'parrafo' },
        { text: ` ${fechainicio}`, style: 'parrafoBold' },
        { text: ` al `, style: 'parrafo' },
        { text: ` ${fechafinal}`, style: 'parrafoBold' },
        { text: ` cubriendo un total de `, style: 'parrafo' },
        { text: ` ${formData.horas}`, style: 'parrafoBold' },
        { text: ` horas.\n\n\n `, style: 'parrafo' },
        { text: `Sin otro asunto en particular, reciba un cordial saludo.\n\n\n\n `, style: 'parrafo' },


      ],
      alignment: 'justify',
      margin: [0, 50, 0, 10] // Márgenes
    },
    { text: 'ATENTAMENTE \n\n\n ', style: 'aten' },
    { text: '____________________________________', style: 'aten' },
    { text:  `${formData.consejero} `, style: 'con' },
    { text:  `${consejer} `, style: 'con' },

    {
      
    },
    {
      text: 'UACO',
      bold: true,
      color: '#135585',
      fontSize: 28,
      absolutePosition: { x: 81, y: 734 }, // Posición absoluta del texto dentro del rectángulo
      backgroundColor: 'red'
    },
    {
      text: `UACO-${formData.cuc_nombre}`,
      bold: true,
      color: '#135585',
      fontSize: 8,
      absolutePosition: { x: 80, y: 770 } // Posición absoluta del texto
    },
    {
      text: `${formData.cuc_calle} ${formData.cuc_numEx}, ${formData.cuc_colonia},`,
      bold: true,
      color: '#135585',
      fontSize: 9,
      absolutePosition: { x: 80, y: 780 } // Posición absoluta del texto
    },
    {
      text: `${formData.cuc_municipio}, Oaxaca C.P. ${formData.cuc_cp}`,
      bold: true,
      color: '#135585',
      fontSize: 9,
      absolutePosition: { x: 80, y: 790 } // Posición absoluta del texto
    },

  ],
  styles: {
    header: {
      fontSize: 12,
      bold: false,
      alignment: 'right',
      margin: [0, 45, 0, 0] // Margen inferior
    },
    asunto: {
      fontSize: 12,
      bold: true,
      alignment: 'right',
      margin: [0, 0, 0, 40] // Margen inferior
    },
    datos: {
      fontSize: 12,
      bold: true,
      alignment: 'left',
      margin: [0, 0, 300, 0] // Márgenes
    },
    parrafo: {
      fontSize: 12,
      bold: false,
      alignment: 'justify',
      margin: [0, 30, 0, 20] // Márgenes
    },
    parrafoBold: {
      fontSize: 12,
      bold: true,
      margin: [0, 0, 0, 10] // Margen inferior
    },
    aten: {
      fontSize: 12,
      bold: true,
      alignment: 'center',
      margin: [0, 0, 0, 0] // Márgenes
    },
    con: {
      fontSize: 12,
      bold: false,
      alignment: 'center',
      margin: [0, 0, 0, 0] // Márgenes
    },

  },
 

};

    // Generar el PDF y obtener la URL del PDF
   
    const pdfDoc = pdfMake.createPdf(documentDefinition, { compression: true });



    if (windowWidth < 769) { 
       pdfDoc.getBlob((blob) => {
      saveAs(blob, `solicitud_${formData.matricula}.pdf`); // Reemplaza 'nombre_del_archivo.pdf' c
    });
    } else {
      pdfDoc.getBlob((blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfUrl);
        setModalIsOpen(true); // Mostrar el PDF en una ventana modal
      });
    }


  }); };

  const closeModal = () => {
    // Cerrar el modal y liberar la URL del PDF
    setModalIsOpen(false);
    setPdfUrl(null);
  };


  return (
    <div className="Festudian">
      <label className="titul">Inicio de Servicio Social Comunitario</label>
      
      <div className="contenedor">
        <label className="titulo-contenedor">Carta de solicitud</label>
        <button className="botonf" onClick={generarSolicitud}>
          Generar Carta
        </button>
        
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

        {visible===0  && (
        <div className="ggx">
          
          <label className="estado-0">Estado: Archivo no enviado </label>

      </div> )}


      {visible===1  && (

        <div className="gg">
          <label className="archivo">Archivo subido: </label>
          <input type="text"
          value={formData.carta_pres}
          disabled
          />
          <button className="ver" onClick={() => descargarArchivo(formData.carta_pres)} >Ver</button>
        
          {!mostrarComponente && mostrarBoton && (

          <div className="acciones">
            <button 
             onClick={() => {
              cambiarEstado(2);
              handleMostrarBoton();
             }}

            className="cal">Aceptar</button>
            <button 
            
            onClick={()=> {
              handleMostrarComponente();
              cambiarEstado(3);          
             }}
            
            className="calificar-no">Rechazar</button>
          </div>
          )}


{!mostrarComponente && !mostrarBoton && (
  <label className="estado-2-revisado">Archivo aprobado</label>
)}


{mostrarComponente && <VentanaPresentacion
             actualizar={actualizar}
             setActualizar={setActualizar}
             matricula={matricula}
             
             />}

        </div> )}



        {visible===2  && (
        <div className="gg-2">
        <label className="archivo-2">Archivo subido: </label>
        <input type="text"
        value={formData.carta_pres}
        disabled
        />
        <button className="ver-2" onClick={() => descargarArchivo(formData.carta_pres)} >Ver</button>
        <div> 
        <label className="estado-2">Archivo revisado y aprobado </label>

        </div>
       
        </div> )}
      


        {visible===3  && (
        <div className="gg-2">
        <label className="archivo-2">Archivo subido: </label>
        <input type="text"
        value={formData.carta_pres}
        disabled
        />
        <button className="ver-2" onClick={() => descargarArchivo(formData.carta_pres)} >Ver</button>
        <div> 
        <label className="estado-3">Archivo revisado no aprobado </label>

        </div>
       
        </div> )}


        


      </div>
   
      <div className="contenedor">
        <label className="titulo-contenedor2">Carta de aceptación</label>

        {visible2===0  && (
        <div className="ggx">
          
          <label className="estado-0">Estado: Archivo no enviado </label>

      </div> )}
        

     
      {visible2===1  && (

<div className="gg">
  <label className="archivo">Archivo subido: </label>
  <input type="text"
  value={formData.carta_acep}
  disabled
  />
  <button className="ver" onClick={() => descargarArchivo(formData.carta_acep)} >Ver</button>

  {!mostrarComponente2 && mostrarBoton2 && (

  <div className="acciones">
    <button 
     onClick={() => {
      cambiarEstadoAceptacion(2);
      handleMostrarBoton2();
     }}

    className="cal">Aceptar</button>
    <button 
    
    onClick={()=> {
      handleMostrarComponente2();
      cambiarEstadoAceptacion(3);          
     }}
    
    className="calificar-no">Rechazar</button>
  </div>
  )}


{!mostrarComponente2 && !mostrarBoton2 && (
<label className="estado-2-revisado">Archivo aprobado</label>
)}


{mostrarComponente2 && <VentanaAceptacion
     actualizar={actualizar}
     setActualizar={setActualizar}
     matricula={matricula}
     />}

</div> )}




{visible2===2  && (
        <div className="gg-2">
        <label className="archivo-2">Archivo subido: </label>
        <input type="text"
        value={formData.carta_acep}
        disabled
        />
        <button className="ver-2" onClick={() => descargarArchivo(formData.carta_acep)} >Ver</button>
        <div> 
        <label className="estado-2">Archivo revisado y aprobado </label>

        </div>
       
        </div> )}


        {visible2===3  && (
        <div className="gg-2">
        <label className="archivo-2">Archivo subido: </label>
        <input type="text"
        value={formData.carta_acep}
        disabled
        />
        <button className="ver-2" onClick={() => descargarArchivo(formData.carta_acep)} >Ver</button>
        <div> 
        <label className="estado-3">Archivo revisado no aprobado </label>

        </div>
       
        </div> )}




      </div>
    </div>
  );
};
