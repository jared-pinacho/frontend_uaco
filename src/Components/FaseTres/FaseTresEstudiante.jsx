import React, { useEffect, useState } from "react";
import "../FaseTres/EstudianteTres.css";
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



export const FaseTresEstudiante = ({informacion, actualizar, setActualizar}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [visible, setVisible] = useState(0);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [dateTime, setDateTime] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');
  const apiUrl = URL_API;
  const token = Cookies.get("tok");

  const [matricula, setMatricula] = useState(null);
  const [formData, setFormData] = useState({

   nombre_dep: "",
   cuc_calle:"",
   cuc_numEx:"",
   cuc_colonia:"",
   cuc_municipio:"",
   cuc_cp:"",
   cuc_estado:"",
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
   sexo_con:"",
   sexo_est:"",
   reporte_dos:"",
   comentario_r2:"",
   estatus_r2:"",

  });


  useEffect(() => {
  
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
      estudiante: nombreCompleto(informacion) || "",
      matricula: informacion.estudiante?.matricula || "",
      carrera: informacion.carrera || "",
      proyecto: informacion.servicio?.programa || "",
      responsable: informacion.servicio?.responsable || "",
      actividad: informacion.servicio?.actividad || "",
      fecha_inicio: informacion.servicio?.fecha_ini || "",
      fecha_final: informacion.servicio?.fecha_fin || "",
      horas: informacion.servicio?.horas || "",
      cuc_cp: informacion.cuc?.direccion?.colonia?.id_cp || "",
      reporte_dos:informacion.faseTres?.reporte_dos || "",
      estado_r2:informacion.faseTres?.estatus_envio || "",
      comentario_r2:informacion.faseTres?.comentario || "", 
    });
setVisible(informacion.faseTres?.estatus_envio);
setMatricula(informacion.estudiante?.matricula);
 
if (informacion?.faseTres ===null) {
  setVisible(0);
}


    setMatricula(informacion.estudiante?.matricula);
}, []);


const cambiarInforme2 = (dato) => {
  axios
    .patch(
      `${apiUrl}estado/cambio/presentacion/informe2/${dato}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
     // console.log("estado cambiado");
     
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

 
 { text: `${formData.cuc_nombre}\n\n\n\n\n`, margin: [162,-60, 200, 0],bold:false,color:"#135585" ,fontSize:11},

   
 { text: 'Servicio Social Comunitario\n', alignment:"center",bold:"true",fontSize:"15" },

 { text: 'Informe bimestral 2\n\n', alignment:"center",bold:"false",fontSize:"13" },
   
{
  table: {
    widths: [120, '*'], // Ancho de las columnas (ambas columnas con ancho automático)
    body: [
      [
        { text: 'PLANTEL', style: 'tabla' },
        { text:`${formData.cuc_nombre}` , style: 'tablacuc' }
    ], // Primera fila
    [
      { text: 'NOMBRE ESTUDIANTE', style: 'tabla' },
      { text: `${formData.estudiante}`, style: 'tabla' }
  ], // Primera fila
  [
    { text: 'PROGRAMA', style: 'tabla' },
    { text: `${formData.proyecto}`, style: 'tabla' }
],
[
  { text: 'NOMBRE RESPONSABLE', style: 'tabla' },
  { text: `${formData.responsable}`, style: 'tabla' }
],
[
  { text: 'FECHA INICIO', style: 'tabla' },
  { text: `${fechainicio}`, style: 'tabla' }
],
[
  { text: 'FECHA TERMINO', style: 'tabla' },
  { text:  `${fechafinal}`, style: 'tabla' }
],
[
  { text: 'NÚMERO DE INFORME', style: 'tabla' },
  { text: '2', style: 'tabla' }
],
    ]
}
},
{ stack: [{ canvas: [{ type: 'rect', x: 0, y: 0, w:550, h: 55, color: 'white' }] }] },

{
  table: {
    widths: [120, '*'], // Ancho de las columnas (ambas columnas con ancho automático)
    
    body: [
      [
        { text: 'MES', style: 'tablae'  },
        { text:`REPORTE DE ACTIVIDADES` , style: 'tablae' }
    ], // Primera fila
    [
      { text: 'Mes 3', style: 'tabla' },
      { text: `${formData.actividad}`, style: 'tabla' }
  ], // Primera fila
  [
    { text: 'Mes 4', style: 'tabla' },
    { text: `${formData.actividad}`, style: 'tabla' }
], // Primera fila
    ],
    heights: [40, 50, 50],
}
},

{ text:  `\nObservaciones:________________________________________________________________________________________________________________________________________________________________`, style: 'obser' },


    { text: '\n\n\n\n\n\n\n\n_________________________________', style: 'aten' },
    { text:  `${formData.responsable}`, style: 'coni' },
    { text:  `Nombre y firma responsable `, style: 'con' },


    { text: '\n\n\n\n\n\n\n_________________________________',   fontSize: 12,bold: true,alignment: 'right',
    margin: [0, -140, 0, 0] },// Margen [left, top, right, bottom]

    { text:  `${formData.estudiante}`, fontSize: 12,bold: true,alignment: 'right',
    margin: [0, 0, 0, 0] },

    { text:  `Nombre y firma estudiante `, fontSize: 12,bold: false,alignment: 'right',
    margin: [0, 0, 0, 0] },



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
    tabla: {
      fontSize: 10,
      bold: false,
      alignment: 'left',
     
    },
    tablacuc: {
      fontSize: 10,
      bold: false,
      alignment: 'left',
     
    },
    tablae: {
      fontSize: 12,
      bold: true,
      alignment: 'left',
      
     
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
      alignment: 'left',
      margin: [0, 0, 0, 0] // Márgenes
    },
    con: {
      fontSize: 12,
      bold: false,
      alignment: 'left',
      margin: [0, 0, 0, 0] // Márgenes
    },
    coni: {
      fontSize: 12,
      bold: true,
      alignment: 'left',
      margin: [0, 0, 0, 0] // Márgenes
    },
    obser: {
      fontSize: 13,
      bold: false,
      alignment: 'justify',
      margin: [0, 0, 0, 0] // Márgenes
    },

  },
 
};

    // Generar el PDF y obtener la URL del PDF
   
    const pdfDoc = pdfMake.createPdf(documentDefinition, { compression: true });



    if (windowWidth < 769) { 
       pdfDoc.getBlob((blob) => {
      saveAs(blob, `informe1_${formData.matricula}.pdf`); // Reemplaza 'nombre_del_archivo.pdf' c
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





  const actualizarDesdeHijo = () => {
    const nuevoValor = !actualizar; // Cambiar el valor de 'actualizar' (alternar entre true y false)
    setActualizar(nuevoValor); // Cambiar 'actualizar' desde el componente hijo
  };


  const handleSubmitInforme2 = async () => {
    // Verificar si se ha seleccionado un archivo
    if (selectedFile) {
        // Crear un objeto FormData para enviar el archivo al servidor
        const formData = new FormData();
        formData.append('archivo', selectedFile);
     
        axios
        .post(`${apiUrl}subir/doc/informe2`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        })
        .then((response) => {
          toast.success(response.data.message);    
          setVisible(4);
          cambiarInforme2(1);
          actualizarDesdeHijo();
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
    <div className="Festudianz">
      <label className="titulz">Segundo Reporte Bimestral</label>
       
      <div className="contenedorz">
        <label className="titulo-contenedorz">Reporte bimestral 2</label>
       
        
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


        <div className="ggz">
          
          <button className="botonz-0" onClick={generarSolicitud}>
Generar Informe 2
</button> 
<div className="a">
          <input
        type="file"
        id="fileUpload"
        accept="application/pdf"
        onChange={handleFileChange}
      />

<button className="subir-3z" onClick={handleSubmitInforme2}>Subir</button>

</div>
<div>
<label className="estado-0z">Estado: No enviado </label>
</div>


      </div> )}

      

{visible === 2  && (
<div className="accionesz">
          
<button className="ver-2z" onClick={() => descargarArchivo(formData.reporte_dos)} >Ver</button>

<p className="arc-2z" >Archivo subido: {formData.reporte_dos}</p>
          <label className="estado-0z">Estado: Revisado aceptado </label>
          </div>    

)}


{visible === 1  && (
<div className="accionesz-1">
       
       <button className="verz-1" onClick={() => 
        
        descargarArchivo(formData.reporte_dos)}
        
        >Ver</button>


<p className="arc-1z" >Archivo subido: 

{formData.reporte_dos}</p>
       

          <label className="esz-1">Estado: Enviado no revisado </label>
         
          </div>    
)}


{ visible === 3   && (

  <div className="contener-3z">

<div className="accionesz-3">

<button className="botonz-3" onClick={generarSolicitud}>
Generar Informe 2
</button> 

<div className="ff">

<input      
        type="file"
        id="fileUpload"
        accept="application/pdf"
        onChange={handleFileChange}
        defaultValue={selectedFile ? selectedFile.name : textInputValue}
      />

<button className="subir-3z" onClick={handleSubmitInforme2}>Subir</button>
</div>
<button className="verz-3" onClick={() => descargarArchivo(formData.reporte_dos)} >Ver</button>
<p className="arc-3z" >Archivo subido: {formData.reporte_dos}</p>
               

<label className="esz-3">Estado: Revisado no aprobado </label>
           <label className="comentz">Comentarios: </label> 
           <div className="comentarioz">
           <span >{formData.comentario_r2}</span>

           </div>
          

          </div>    


  </div>

)}


{visible === 4  && (
<div className="accionesz-4i">
       
      


<p className="arc-1z-4" >Archivo subido:InformeDos{matricula}</p>
       
          <label className="esz-1">Estado: Enviado no revisado </label>
         
          </div>    
)}





</div>


    </div>
  );
};
