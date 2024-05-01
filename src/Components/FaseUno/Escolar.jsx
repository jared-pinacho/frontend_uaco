import React, { useEffect, useState } from "react";
import "../FaseUno/Escolar.css";
import Modal from 'react-modal';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from "../../assets/img/logoUACO.png";
import { saveAs } from 'file-saver';

// Configuración de las fuentes necesarias para pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Escolar = ({informacion}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [dateTime, setDateTime] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   

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
   horas:""


   
  });


 


  useEffect(() => {
      setFormData({
       nombre_dep: informacion.servicio.nombre_dep || "",
       cuc_calle: informacion.cuc.direccion.calle || "", 
       cuc_numEx: informacion.cuc.direccion.num_exterior || "", 
       cuc_colonia: informacion.cuc.direccion.colonia.nombre || "",
       cuc_municipio: informacion.cuc.direccion.colonia.municipio.nombre || "",
       cuc_estado: informacion.cuc.direccion.colonia.municipio.estado.nombre || "",
       grado_tit: informacion.servicio.grado_tit || "",
       titular: informacion.servicio.titular_dep || "",
       cargo_tit: informacion.servicio.cargo_tit || "",
       consejero:obtenerNombreCompleto(informacion) ||"",
       sexo_con:informacion.consejero.sexo || "",
       sexo_est:informacion.estudiante.sexo || "",
       cuc_nombre:informacion.cuc.nombre.substring(6) || "",
       estudiante:nombreCompleto(informacion).toUpperCase() ||"",
       matricula:informacion.estudiante.matricula || "",
       carrera:informacion.carrera || "",
       proyecto:informacion.servicio.programa || "",
       responsable:informacion.servicio.responsable || "",
       actividad:informacion.servicio.actividad || "",
       fecha_inicio:informacion.servicio.fecha_ini || "",
       fecha_final:informacion.servicio.fecha_fin || "",
       horas:informacion.servicio.horas || "",
       cuc_cp:informacion.cuc.direccion.colonia.id_cp || ""
      });
    
  }, []);


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

 
 { text: `${formData.cuc_nombre}`, margin: [162,-60, 250, 0],bold:false,color:"#135585" ,fontSize:11},

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
        { text: ` ${formData.fecha_inicio}`, style: 'parrafoBold' },
        { text: ` al `, style: 'parrafo' },
        { text: ` ${formData.fecha_final}`, style: 'parrafoBold' },
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

    {canvas: [ {
          type: 'rect',
          x: 0,
          y: 70,
          w: 72, // Ancho del rectángulo
          h: 37, // Alto del rectángulo
          color: '#135585', // Color de fondo del rectángulo
        },  ],},

    {
      text: 'UACO',
      bold: true, // Negrita estándar
      color: 'white', // Color del texto
      fontSize: 25,
      alignment: 'left', // Alineación del texto
      absolutePosition: { x: 44, y: 726 }, // Posición absoluta para centrar verticalmente en el rectángulo
      width: 100, // Ancho del texto igual al ancho del rectángulo
      height: 30, // Alto del texto igual al alto del rectángulo
    },
    {
      text: `${formData.cuc_nombre}`,
      bold: true, // Negrita estándar
      color: '#135585', // Color del texto
      fontSize: 8.5,
      alignment: 'left', // Alineación del texto
     
      margin: [76,-38, 350, 0]// Margen [left, top, right, bottom]
    },
    {
      text: `UACO-${formData.cuc_nombre}`,
      bold: true, // Negrita estándar
      color: '#135585', // Color del texto
      fontSize: 8,
      alignment: 'left', // Alineación del texto
     
      margin: [0,2, 260, 0]// Margen [left, top, right, bottom]
    },

    {
      text: `${formData.cuc_calle} ${formData.cuc_numEx}, ${formData.cuc_colonia},`,
      bold: true, // Negrita estándar
      color: '#135585', // Color del texto
      fontSize: 9,
      alignment: 'left', // Alineación del texto
     
      margin: [0,0, 300,0]// Margen [left, top, right, bottom]
    },
    {
      text: `${formData.cuc_municipio}, Oaxaca C.P. ${formData.cuc_cp}`,
      bold: true, // Negrita estándar
      color: '#135585', // Color del texto
      fontSize: 9,
      alignment: 'left', // Alineación del texto
     
      margin: [0,0, 305, 0]// Margen [left, top, right, bottom]
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
        <button className="boton" onClick={generarSolicitud}>
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
          <button className="calificar" onClick={closeModal}>
            Cerrar
          </button>
        </Modal>

        <div className="gg">
          <label className="archivo">Archivo subido: </label>
          <input type="text"
        />
          <button className="ver">Ver</button>
        
          <div className="acciones">
           <label className="es">Estado: </label>
            <button className="cal">Aceptar</button>
            <button className="calificar-no">Rechazar</button>
          </div>
        </div>
      </div>

      <div className="contenedor">
        <label className="titulo-contenedor2">Carta de aceptación</label>

        <div className="gg2">
          <label className="archivo">Archivo subido: </label>
          <input type="text" />
          <button className="ver">Ver</button>
        
          <div className="acciones">
           <label className="es">Estado: </label>
            <button className="cal">Aceptar</button>
            <button className="calificar-no">Rechazar</button>
          </div>
        </div>

      </div>
    </div>
  );
};
