import React, { useEffect, useState } from "react";
import "../TablaForaneos/TablaForaneos.css";
import Loader from "../Loader/Loader";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from "../../assets/img/logoUACO.png";
import { saveAs } from 'file-saver';
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import Modal from 'react-modal';



export const TablaForaneos = ({ estudiantes, isLoading, abrirDocumentacion, abrirKardex }) => {
  const [filtro, setFiltro] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [informacion, setInformacion] = useState(null);
  const [informacion2, setInformacion2] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const obtenerInformacion = async (dat) => {
    setInformacion(null);
  
    try {
      const response = await axios.get(`${apiUrl}obten/info/foraneo/${dat}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInformacion(response.data.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };
  
  useEffect(() => {
    if (informacion) {
      generarAceptacion();
    }
  }, [informacion]); // Dependencia del efecto secundario


  const obtenerInformacion2 = async (dat) => {
    setInformacion2(null);
  
    try {
      const response = await axios.get(`${apiUrl}obten/info/foraneo/${dat}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInformacion2(response.data.data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    if (informacion) {
      generarTerminacion();
    }
  }, [informacion2]); // Dependencia del efecto secundario



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
 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

    
    const generarAceptacion = () => {
     
    loadImageAsBase64(logo, (imageData) => {

      var articulo_consejero = "";
      var articulo = "";
      var consejer = "";
      var articulo_estudiante="";
      var articulo_may="";
      var acepta="";
      var mencion="";
      var prestador="";
   
      if(informacion.consejero?.sexo=== "H"){
        articulo_consejero="El";
        consejer="Consejero académico";
        articulo="el";
        
      }else{
       articulo_consejero="La";
       consejer="Consejera académica";
       articulo="la";
      
      }
   
   
      if(informacion.foraneo?.sexo=== "H"){
       articulo_estudiante="el";
       articulo_may="El";
       acepta="Aceptado";
       mencion="mencionado";
       var prestador="prestador";
     }else{
      articulo_may="La";
      articulo_estudiante="la";
      acepta="Aceptada";
      mencion="mencionada";
      var prestador="prestadora";
     }

   
  
    let formattedDate = dateTime.toLocaleDateString(undefined, options);
  
    let fechainicio = new Date(informacion.foraneo?.fecha_inicio).toLocaleDateString('es-MX');
    let fechafinal = new Date(informacion.foraneo?.fecha_final).toLocaleDateString('es-MX');

  
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

 { text: `${informacion.cuc.nombre.substring(6)}`, margin: [162,-60, 200, 0],bold:false,color:"#135585" ,fontSize:11},

  // Encabezado con dirección y fecha
  { text: `${informacion.cuc?.direccion?.colonia?.nombre}, ${informacion.cuc?.direccion?.colonia?.municipio?.nombre}, ${informacion.cuc?.direccion?.colonia?.municipio?.estado?.nombre} a ${formattedDate}`, style: 'header' },

  // Asunto en negrita
  { text: 'Asunto: Carta de aceptación', style: 'asunto' },


 // Datos del titular en negrita
 { text: `${informacion.foraneo?.grado_titular}. ${informacion.foraneo?.titular_dep}`, style: 'datos' },
 // Saludo inicial
 { text:`${informacion.foraneo?.cargo_titular}`, style: 'datos' },
    // Saludo inicial
    { text: 'P R E S E N T E', style: 'datos' },


    {
      text: [
        { text: `Por este medio me permito comunicarle que ${articulo_estudiante} C. `, style: 'parrafo' },
        { text: `${informacion.foraneo?.nombre} ${informacion.foraneo?.apellido_paterno} ${informacion.foraneo?.apellido_materno} `, style: 'parrafoBold' }, // Consejero en negrita
        { text: `estudiante de la carrera de`, style: 'parrafo' },
         { text: `${informacion.foraneo?.licenciatura}`, style: 'parrafoBold' },
        { text: 'con matricula', style: 'parrafo' },
         { text: `${informacion.foraneo?.matricula_escolar}`, style: 'parrafoBold' },
        { text: `es`, style: 'parrafo' },
        { text: `${acepta} `, style: 'parrafoBold' },
         { text: `dentro del ${informacion.cuc.nombre.substring(6)}, para realizar su servicio social durante el período comprendido del `, style: 'parrafo' },
         { text: `${fechainicio}`, style: 'parrafoBold' },
          { text: ' al ', style: 'parrafo' },
          { text: `${fechafinal} `, style: 'parrafoBold' },
        { text: `cubriendo un total de `, style: 'parrafo' },
        { text: `${informacion.foraneo?.horas} `, style: 'parrafoBold' },
        { text: `horas. \n `, style: 'parrafo' },
        { text: `${articulo_may} ${mencion} ${prestador} de servicio social llevará a cabo sus actividades del programa denominado `, style: 'parrafo' },
        { text: `"${informacion.foraneo?.programa}" `, style: 'parrafoBold' },
        { text: `y será asesorado por ${informacion.foraneo?.resp_seg} responsable de dicho programa.\n\n\n `, style: 'parrafo' },
        { text: `Sin otro asunto en particular, reciba un cordial saludo.\n\n\n\n `, style: 'parrafo' },
       
       


      ],
      alignment: 'justify',
      margin: [0, 50, 0, 10] // Márgenes
    },

    { text: 'ATENTAMENTE \n\n\n ', style: 'aten' },
    { text: '____________________________________', style: 'aten' },
    { text:  `${informacion.consejero?.nombre} ${informacion.consejero?.apellido_paterno} ${informacion.consejero?.apellido_materno}`, style: 'con' },
    { text:  `${consejer} `, style: 'con' },

    // {canvas: [ {
    //   position: 'absolute',
    //       type: 'rect',
    //       x: 0,
    //       y: 135,
    //       w: 72, // Ancho del rectángulo
    //       h: 45, // Alto del rectángulo
    //       color: '#135585', // Color de fondo del rectángulo
    //     },  ],},

    {
      text: 'UACO',
      bold: true,
      color: '#135585',
      fontSize: 28,
      absolutePosition: { x: 81, y: 734 }, // Posición absoluta del texto dentro del rectángulo
      backgroundColor: 'red'
    },
   
    {
      text: `${informacion.cuc?.nombre}`,
      bold: true,
      color: '#135585',
      fontSize: 8,
      absolutePosition: { x: 80, y: 770 } // Posición absoluta del texto
    },
    {
      text: `${informacion.cuc?.direccion?.calle} ${informacion.cuc?.direccion?.num_exterior}, ${informacion.cuc?.direccion?.colonia?.nombre},`,
      bold: true,
      color: '#135585',
      fontSize: 9,
      absolutePosition: { x: 80, y: 780 } // Posición absoluta del texto
    },
    {
      text: `${informacion.cuc?.direccion?.colonia?.municipio?.nombre}, Oaxaca C.P. ${informacion.cuc?.direccion?.colonia?.id_cp}`,
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
      saveAs(blob, `aceptacion_.pdf`); // Reemplaza 'nombre_del_archivo.pdf' c
    });
    } else {
      pdfDoc.getBlob((blob) => {
        const pdfUrl = URL.createObjectURL(blob);
        setPdfUrl(pdfUrl);
        setModalIsOpen(true); // Mostrar el PDF en una ventana modal
      });
    }

  }); 


};


const generarTerminacion = () => {
     
  loadImageAsBase64(logo, (imageData) => {

    var articulo_consejero = "";
    var articulo = "";
    var consejer = "";
    var articulo_estudiante="";
    var articulo_may="";
    var acepta="";
    var mencion="";
    var prestador="";
    var interes="";
 
    if(informacion2.consejero?.sexo=== "H"){
      articulo_consejero="El";
      consejer="Consejero académico";
      articulo="el";
      
    }else{
     articulo_consejero="La";
     consejer="Consejera académica";
     articulo="la";
    
    }
 
 
    if(informacion2.foraneo?.sexo=== "H"){
     articulo_estudiante="el";
     articulo_may="El";
     acepta="Aceptado";
     mencion="mencionado";
     var prestador="prestador";
     interes='interesado';
   }else{
    articulo_may="La";
    articulo_estudiante="la";
    acepta="Aceptada";
    mencion="mencionada";
    var prestador="prestadora";
    interes='interesada';
   }

 

  let formattedDate = dateTime.toLocaleDateString(undefined, options);

  let fechainicio = new Date(informacion2.foraneo?.fecha_inicio).toLocaleDateString('es-MX');
  let fechafinal = new Date(informacion2.foraneo?.fecha_final).toLocaleDateString('es-MX');


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

{ text: `${informacion2.cuc.nombre.substring(6)}`, margin: [162,-60, 200, 0],bold:false,color:"#135585" ,fontSize:11},

// Encabezado con dirección y fecha
{ text: `${informacion2.cuc?.direccion?.colonia?.nombre}, ${informacion2.cuc?.direccion?.colonia?.municipio?.nombre}, ${informacion2.cuc?.direccion?.colonia?.municipio?.estado?.nombre} a ${formattedDate}`, style: 'header' },

// Asunto en negrita
{ text: 'Asunto: Carta de terminación', style: 'asunto' },


// Datos del titular en negrita
{ text: `${informacion2.foraneo?.grado_titular}. ${informacion2.foraneo?.titular_dep}`, style: 'datos' },
// Saludo inicial
{ text:`${informacion2.foraneo?.cargo_titular}`, style: 'datos' },
  // Saludo inicial
  { text: 'P R E S E N T E', style: 'datos' },


  {
    text: [
      { text: `Por medio de la presente, me dirijo a usted para hacer de su conocimiento que ${articulo_estudiante} C. `, style: 'parrafo' },
      { text: `${informacion2.foraneo?.nombre} ${informacion2.foraneo?.apellido_paterno} ${informacion2.foraneo?.apellido_materno} `, style: 'parrafoBold' }, // Consejero en negrita
      { text: `estudiante de la carrera de`, style: 'parrafo' },
       { text: `${informacion2.foraneo?.licenciatura}`, style: 'parrafoBold' },
      { text: 'con matricula', style: 'parrafo' },
       { text: `${informacion2.foraneo?.matricula_escolar},`, style: 'parrafoBold' },
      { text: `realizó satisfactoriamente el Servicio Social en, el programa denominado `, style: 'parrafo' },
      { text: `"${informacion2.foraneo?.programa}" `, style: 'parrafoBold' },
      { text: `cubriendo un total de `, style: 'parrafo' },
      { text: `${informacion2.foraneo?.horas} `, style: 'parrafoBold' },
      { text: `horas, durante el período comprendido del `, style: 'parrafo' },
      { text: `${fechainicio}`, style: 'parrafoBold' },
       { text: ' al ', style: 'parrafo' },
       { text: `${fechafinal}. \n`, style: 'parrafoBold' },
       { text: `En la ciudad de ${informacion2.cuc?.direccion?.colonia?.municipio?.nombre} al dia de hoy ${formattedDate}, se extiende la presente Carta de Terminación de Servicio Social, para los fines que ${articulo_estudiante} ${interes} convenga. \n\n\n `, style: 'parrafo' },
       { text: `Sin otro asunto en particular, reciba un cordial saludo.\n\n\n\n `, style: 'parrafo' },
        // _____________, a los_________ días del mes de_____ del año _______, se extiende la presente Carta de Terminación de Servicio Social, para los fines que el (la) interesado(a) convenga.
      
      //  { text: `dentro del ${informacion.cuc.nombre.substring(6)}, para realizar su servicio social durante el período comprendido del `, style: 'parrafo' },
      //  { text: `${fechainicio}`, style: 'parrafoBold' },
      //   { text: ' al ', style: 'parrafo' },
      //   { text: `${fechafinal} `, style: 'parrafoBold' },
      // { text: `cubriendo un total de `, style: 'parrafo' },
      // { text: `${informacion.foraneo?.horas} `, style: 'parrafoBold' },
      // { text: `horas. \n `, style: 'parrafo' },
      // { text: `${articulo_may} ${mencion} ${prestador} de servicio social llevará a cabo sus actividades del programa denominado `, style: 'parrafo' },
      // { text: `"${informacion.foraneo?.programa}" `, style: 'parrafoBold' },
      // { text: `y será asesorado por ${informacion.foraneo?.resp_seg} responsable de dicho programa.\n\n\n `, style: 'parrafo' },
      // { text: `Sin otro asunto en particular, reciba un cordial saludo.\n\n\n\n `, style: 'parrafo' },
     
     


    ],
    alignment: 'justify',
    margin: [0, 50, 0, 10] // Márgenes
  },

  { text: 'ATENTAMENTE \n\n\n ', style: 'aten' },
  { text: '____________________________________', style: 'aten' },
  { text:  `${informacion.consejero?.nombre} ${informacion.consejero?.apellido_paterno} ${informacion.consejero?.apellido_materno}`, style: 'con' },
  { text:  `${consejer} `, style: 'con' },

  // {canvas: [ {
  //   position: 'absolute',
  //       type: 'rect',
  //       x: 0,
  //       y: 135,
  //       w: 72, // Ancho del rectángulo
  //       h: 45, // Alto del rectángulo
  //       color: '#135585', // Color de fondo del rectángulo
  //     },  ],},

  {
    text: 'UACO',
    bold: true,
    color: '#135585',
    fontSize: 28,
    absolutePosition: { x: 81, y: 734 }, // Posición absoluta del texto dentro del rectángulo
    backgroundColor: 'red'
  },
 
  {
    text: `${informacion.cuc?.nombre}`,
    bold: true,
    color: '#135585',
    fontSize: 8,
    absolutePosition: { x: 80, y: 770 } // Posición absoluta del texto
  },
  {
    text: `${informacion.cuc?.direccion?.calle} ${informacion.cuc?.direccion?.num_exterior}, ${informacion.cuc?.direccion?.colonia?.nombre},`,
    bold: true,
    color: '#135585',
    fontSize: 9,
    absolutePosition: { x: 80, y: 780 } // Posición absoluta del texto
  },
  {
    text: `${informacion.cuc?.direccion?.colonia?.municipio?.nombre}, Oaxaca C.P. ${informacion.cuc?.direccion?.colonia?.id_cp}`,
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
    saveAs(blob, `terminacion_.pdf`); // Reemplaza 'nombre_del_archivo.pdf' c
  });
  } else {
    pdfDoc.getBlob((blob) => {
      const pdfUrl = URL.createObjectURL(blob);
      setPdfUrl(pdfUrl);
      setModalIsOpen(true); // Mostrar el PDF en una ventana modal
    });
  }

}); 


};





  const closeModal = () => {
    // Cerrar el modal y liberar la URL del PDF
    setModalIsOpen(false);
    setPdfUrl(null);
  };




















  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
   
    return (
      estudiante.id_foraneo.toString().toLowerCase().includes(termino) ||
      estudiante.matricula_escolar.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) ||
      estudiante.edad.toString().includes(termino) ||
      estudiante.telefono.includes(termino) ||
      estudiante.correo.toLowerCase().includes(termino) ||
      estudiante.discapacidad.toLowerCase().includes(termino) ||
      estudiante.semestre.toLowerCase().includes(termino) ||
      estudiante.licenciatura.toLowerCase().includes(termino) ||
      estudiante.lenguaindigena.nombre.toLowerCase().includes(termino) ||
      estudiante.institucion.toLowerCase().includes(termino) ||
      estudiante.titular_dep.toLowerCase().includes(termino) ||
      estudiante.resp_seg.toLowerCase().includes(termino) ||
      estudiante.programa.toLowerCase().includes(termino) ||
      estudiante.horas.toLowerCase().includes(termino) ||
      estudiante.fecha_inicio.toLowerCase().includes(termino) ||
      estudiante.fecha_final.toLowerCase().includes(termino) 
     

    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr key={index} >
      <td>{estudiante.id_foraneo}</td>  
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td><button
          className="btnAcep"
          onClick={() => obtenerInformacion(estudiante.id_foraneo)}
        >Generar</button></td>
        <td><button
          className="btnTer"
          onClick={() => obtenerInformacion2(estudiante.id_foraneo)}
        >Generar</button></td>
      <td>{estudiante.edad}</td>
      <td>{estudiante.telefono}</td>
      <td>{estudiante.correo}</td>
      <td>{estudiante.discapacidad}</td>
      <td>{estudiante.lenguaindigena.nombre}</td>
      <td>{estudiante.semestre}</td>
      <td>{estudiante.licenciatura}</td>
      <td>{estudiante.matricula_escolar}</td>  
      <td>{estudiante.institucion}</td>
      <td>{estudiante.titular_dep}</td>
      <td>{estudiante.resp_seg}</td>
      <td>{estudiante.programa}</td>
      <td>{estudiante.horas}</td>
      <td>{estudiante.fecha_inicio}</td>
      <td>{estudiante.fecha_final}</td>
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


        <thead>
          <tr>
          <th>Identificador</th>
          
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>

            <th>Carta de aceptación</th>
            <th>Carta de terminación</th>
      
      
            <th>Edad</th>
            <th>Telefono</th>
            <th>Correo</th>
            <th>Discapacidad</th>
            <th>Lengua indigena</th>
            <th>Semestre</th>
            <th>Carrera</th>
            <th>Matricula</th>
            
            <th>Institución</th>
            <th>Titular</th>
            <th>Responsable </th>
            <th>Area</th>
            <th>Horas</th>
            <th>Fecha inicio</th>
            <th>Fecha termino</th>            
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
