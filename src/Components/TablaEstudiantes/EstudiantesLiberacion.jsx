import React, { useEffect, useState } from "react";
import "../TablaEstudiantes/TablaEstudiantes.css";
import Loader from "../Loader/Loader";
import Modal from 'react-modal';
import { saveAs } from 'file-saver';
import axios from "axios";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import pdfMake from 'pdfmake/build/pdfmake';

import logo from "../../assets/img/logoUACO.png";




export const EstudiantesLiberacion = ({ estudiantes, isLoading }) => {
  const [filtro, setFiltro] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const [dateTime, setDateTime] = useState(new Date());
let cuc;



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
   
  const formatFecha = (fecha, locale = 'default') => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha + 'T00:00:00').toLocaleDateString(locale, options);
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


  const generarSolicitud = (info) => {

    loadImageAsBase64(logo, (imageData) => {

    let articulo="";
  if(info.sexo==='H'){
articulo='al'
  }else{
    articulo='a la'
  }
   
    let Date = dateTime.toLocaleDateString(undefined, options);


    let day = dateTime.getDate(); // Día del mes (1-31)
    let mes = dateTime.toLocaleString('default', { month: 'long' });
let year = dateTime.getFullYear(); // Año (por ejemplo, 2024)

 // Usar la función formatFecha para formatear fecha_ini
 let inicioDate = formatFecha(info.fecha_ini);

 // Usar la función formatFecha para formatear fecha_ini
 let finalDate = formatFecha(info.fecha_fin);

const documentDefinition = {
  content: [
// Agregar la imagen como encabezado
{ image: imageData, height:130, width: 130, alignment: 'left', margin: [0,-30, 0, 5] // Margen [left, top, right, bottom]
},
 // Asunto en negrita
 


 { text: 'Universidad Autonóma Comunal de Oaxaca',alignment: 'center', margin: [85,-80, 0, 0],bold:true,fontSize:17}, //[left, top, right, bottom]

    // Asunto en negrita
    { text: 'C.C.T.20MSU0IIIH',alignment: 'center', margin: [80,0, 0, 0],bold:true,fontSize:12 },
 //[left, top, right, bottom]

{ text: '\n\n\nConstancia de liberación de Servicio Social\n\n\n\n\n',alignment: 'center', margin: [0,0, 0, 0],bold:true,fontSize:17 },

  // { text:`Se otorga la presente constancia ${articulo} C. `, style: 'parrafo' },
  // { text:`${articulo}  `, style: 'parrafo' },
  //   // Saludo inicial
   
{
  text:[
  { text:`Se otorga la presente constancia ${articulo} C. `, style: 'parrafo' },
   { text:`   ${info.nombre} ${info.apellido_paterno} ${info.apellido_materno}               `.toUpperCase(), style:'parrafo_sub' },
   { text:` con número de expediente `, style: 'parrafo' },
   { text:`  ${info.matricula}        `, style:'parrafo_sub' },
   { text:`, pasante de la carrera `, style: 'parrafo' },
   { text:`  ${info.grupo.carrera.nombre}        `, style:'parrafo_sub' },
   { text:`por haber cumplido con el Servicio Social Comunitario durante el periodo comprendido del `, style: 'parrafo' },
   { text:`     ${inicioDate}     `, style:'parrafo_sub' },
   { text:` al  `, style: 'parrafo' },
   { text:`     ${finalDate}      `, style:'parrafo_sub' },
   { text:`.`, style: 'parrafo' },
   { text:`\nSe expide la presente por tener cumplidos los requisitos previstos por los artículos 9, 52 y 55 de la Ley de Profesiones, el artículo 24 de la Ley General de Educación, el artículo 42 de la Ley Estatal de Educación Pública de Oaxaca, asi como los definidos de Acuerdo de la Asamblea Académica Universitaria de la Universidad Autónoma Comunal de Oaxaca.`, style: 'parrafo' },
   { text:`\n\n A petición del interesado se extiende la presente para los usos legales a que haya lugar, en la ciudad de oaxaca de Juárez, Oaxaca, a los`, style: 'parrafo' },
   { text:`         ${day} dias            `, style:'parrafo_sub' },
   { text:`del mes de `, style: 'parrafo' },
   { text:`               ${mes}                       `, style:'parrafo_sub' },
   { text:`del año de `, style: 'parrafo' },
   { text:`               ${year}                       `, style:'parrafo_sub' },
   { text:`.`, style: 'parrafo' },
   { text:`\n\n\n\n\n\n\n\n\n\nCOORDINACIÓN ACADÉMICA`, style: 'parrafo_bold' },
 ],
      alignment: 'justify',
      margin: [40, 0, 40, 0] // Márgenes
     },
   
 

  ],
  styles: {
  
    parrafo: {
      fontSize: 12,
      bold: false,
      alignment: 'justify',
      margin: [40,0, 0, 40], // Márgenes
      
    },
    parrafo_bold: {
      fontSize: 14,
      bold: true,
      alignment: 'center',
      margin: [40,0, 0, 40], // Márgenes
      
    },
    parrafo_sub: {
      fontSize: 12,
      bold: false,
      alignment: 'justify',
      margin: [40,0, 0, 40], // Márgenes
      decoration: 'underline', // Subrayar el texto
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

  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
     cuc= estudiante.cuc_nombre.substring(39);
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) 
     
     
    );
  });
  const filas = filasFiltradas.map((estudiante, index) => (
    <tr key={index} className={estudiante.estatus!=="Activo"?"inactivo":estudiante.regular!=="Si"?"irregular":""}>
      <td>{estudiante.matricula}</td>
      <td><button className="btnDoc" onClick={()=>descargarArchivo( `recibo${estudiante.matricula}.pdf`)}>Ver</button></td>
      <td><button className="btnDoc2" onClick={()=>generarSolicitud(estudiante)}>Generar</button></td>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.apellido_paterno}</td>
      <td>{estudiante.apellido_materno}</td>
      <td>{estudiante.usuario.email}</td>
      <td>{estudiante.telefono}</td>
      <td>{cuc}</td>
      <td>{estudiante.nombre_dep}</td>
      <td>{estudiante.programa}</td>
      <td>{estudiante.fecha_ini}</td>
      <td>{estudiante.fecha_fin}</td>
      <td>{estudiante.edad}</td>
      <td>{estudiante.semestre}</td>
      <td>{estudiante.padecimiento}</td>
      <td>{estudiante.direccion.calle}</td>
      <td>{estudiante.direccion.num_exterior}</td>
      <td>{estudiante.direccion.colonia.nombre}</td>
      <td>{estudiante.direccion.colonia.municipio.nombre}</td>
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
        <thead>
          <tr>
            <th>Matricula</th>
            <th>Recibo pago</th>
            <th>Constancia liberación</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Cuc</th>
            <th>Dependencia</th>
            <th>Programa</th>
            <th>Fecha inicio</th>
            <th>Fecha final</th>
            <th>Edad</th>
            <th>Semestre</th>
            <th>Padecimiento</th>
            <th>Calle</th>
            <th>Numero exterior</th>
            <th>Colonia</th>
            <th>Municipio</th>
         
          </tr>

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
