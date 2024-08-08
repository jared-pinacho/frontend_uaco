import logo from "../assets/img/logoUACO.jpg";
import jsPDF from "jspdf";

import { toast } from "react-toastify";
export const GeneradorReporteGrupo = (grupo, cucEspecifica, infoReporte,periodo,tipo)=>{
    
        if (!grupo || !cucEspecifica || !infoReporte) {
         // console.log("Ocurrion un error en la generacion del reporte");
        }
        // console.log(infoReporte);
        toast.info("Generando reporte");
        const pdf = new jsPDF({
          orientation: "landscape",
          format: "legal",
        });
        const dividirTexto = (texto, longitudMaxima) => {
          const palabras = texto.split(" ");
          let lineaActual = palabras[0];
          const lineas = [];
    
          for (let i = 1; i < palabras.length; i++) {
            const palabra = palabras[i];
            const lineaPropuesta = lineaActual + " " + palabra;
    
            if (pdf.getStringUnitWidth(lineaPropuesta) > longitudMaxima) {
              lineas.push(lineaActual);
              lineaActual = palabra;
            } else {
              lineaActual = lineaPropuesta;
            }
          }
    
          lineas.push(lineaActual);
          return lineas;
        };
        // Crear un nuevo objeto jsPDF con orientación horizontal
    
        const AgregarformatoInicial = (grupo, cucEspecifica) => {
          // Establecer formato para las primeras cinco líneas de texto
          pdf.setFontSize(10); // Tamaño de letra
          pdf.setFont("times", "bold");
    
          pdf.text("SECRETARIA DE EDUCACION PUBLICA", 85, 10);
          pdf.text("UNIVERSIDAD AUTONOMA COMUNAL DE OAXACA", 70, 15);
          pdf.text(""+cucEspecifica.nombre , 50, 20);
          pdf.text("CONTROL ESCOLAR", 105, 25);
          pdf.text("REGISTRO DE ESCOLARIDAD", 93, 30);
    
          
          pdf.addImage(logo, 'JPEG', 5, 3, 40, 40);
          // Agregar un rectángulo (figura cuadrada)
          const logox = 5; // Posición x del rectángulo
          const logoy = 10; // Posición y del rectángulo
          const logowidth = 35; // Ancho del rectángulo
          const logoheight = 35; // Altura del rectángulo
    
           // "F" indica que se debe rellenar el rectángulo
    
          // const logo2x = 190; // Posición x del rectángulo
          // const logo2y = 10; // Posición y del rectángulo
          // const logo2width = 30; // Ancho del rectángulo
          // const logo2height = 30; // Altura del rectángulo
    
          // pdf.rect(logo2x, logo2y, logo2width, logo2height, "F");
           // "F" indica que se debe rellenar el rectángulo
    
          // Agregar un rectángulo cuadriculado
          const cuadradoX = 230; // Posición x del cuadrado
          const cuadradoY = 5; // Posición y del cuadrado
          const cuadradoWidth = 120; // Ancho del cuadrado
          const cuadradoHeight = 35; // Altura del cuadrado
          const divisionesX = 4; // Número de divisiones horizontales
          const divisionesY = 3; // Número de divisiones verticales
    
          const anchoDivision = cuadradoWidth / divisionesX;
          const altoDivision = cuadradoHeight / divisionesY;
    
          // Dibujar líneas horizontales y líneas verticales
          for (let i = 0; i <= divisionesX; i++) {
            const x = cuadradoX + i * anchoDivision;
    
            for (let j = 0; j <= divisionesY; j++) {
              const y = cuadradoY + j * altoDivision;
              pdf.line(x, cuadradoY, x, cuadradoY + cuadradoHeight);
              pdf.line(cuadradoX, y, cuadradoX + cuadradoWidth, y);
            }
          }
    
          // Líneas de contorno
          pdf.rect(cuadradoX, cuadradoY, cuadradoWidth, cuadradoHeight);
          // Más contenido del PDF
    
          pdf.text("CUC: " + cucEspecifica.nombre, 5, 50);
          pdf.text(
            "LOCALIDAD: " +
              cucEspecifica.direccion.colonia.municipio.nombre.toUpperCase(),
            5,
            55
          );
          pdf.text("PROGRAMA: " + grupo.carrera.nombre, 5, 60);
          pdf.text("MODALIDAD: " + grupo.carrera.modalidad.toUpperCase(), 5, 65);
    
          pdf.text("TURNO: DISCONTINUO", 170, 60);
          pdf.text("CLAVE CARRERA: " + grupo.carrera.clave_carrera, 170, 65);
    
          pdf.text("CVE. CTRO. TRAB: " + cucEspecifica.clave_cuc, 250, 50);
          // pdf.text("CICLO ESCOLAR:", 250, 50);
          pdf.text("SEMESTRE:", 250, 55);
          
          pdf.text((infoReporte.semestre===-1)?(infoReporte.estudiantes_grupo.length !== 0?(""+infoReporte.estudiantes_grupo[0].semestre):(""+0)):(""+infoReporte.semestre), 273, 55);
          pdf.text(
            "PERIODO ESCOLAR: " +periodo.nombre,
            250,
            60
          );
    
          pdf.text("GRUPO: " + grupo.clave_grupo, 310, 50);
          // pdf.text("Semestre:", 270, 55);
          // pdf.text("Periodo escolar:", 270, 60);
    
          pdf.setFontSize(8);
          pdf.text("CONCEPTO", 233, 12);
          pdf.text("HOMBRES", 265, 12);
          pdf.text("" + infoReporte.total_estudiantes_hombres, 275, 25);
          pdf.text((tipo===1)?(" "):(""+infoReporte.total_estudiantes_hombres), 275, 35);

          pdf.text("MUJERES", 295, 12);
          pdf.text("" + infoReporte.total_estudiantes_mujeres, 305, 25);
          pdf.text((tipo===1)?(" "):(""+infoReporte.total_estudiantes_mujeres), 305, 35);

          pdf.text("TOTALES", 325, 12);
          pdf.text("" + infoReporte.total_estudiantes, 335, 25);
    
          pdf.text((tipo===1)?(" "):(""+infoReporte.total_estudiantes), 335, 35);
          pdf.text("INICIO DE CURSOS", 233, 25);
          pdf.text("FIN DE CURSO", 233, 35);
    
          // INICIO LINEA
    
          // Modificar grosor de línea horizontal
          const grosorLineaHorizontal = .5; // Grosor en puntos
          pdf.setLineWidth(grosorLineaHorizontal);
    
          const lineaHorizontalYArriba = 67; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalYArriba, 350, lineaHorizontalYArriba);
    
          const lineaVertical0 = 67;
          pdf.line(1, lineaVertical0, 1, pdf.internal.pageSize.height - 5);
    
          pdf.text("ANTECEDENTES", 20, 75);
    
          pdf.text("NUM. PROGRE.", 6, 120, {
            angle: 90,
          });
          const lineaVertical0sub1 = 80;
          pdf.line(10, lineaVertical0sub1, 10, pdf.internal.pageSize.height - 5);
          pdf.text("ASIGNATURAS NO ACREDITADAS", 16, 130, {
            angle: 90,
          });
          const lineaVertical0sub2 = 80;
          pdf.line(20, lineaVertical0sub2, 20, pdf.internal.pageSize.height - 5);
          pdf.text("SITUACION ESCOLAR", 26, 120, {
            angle: 90,
          });
          const lineaVertical0sub3 = 80;
          pdf.line(30, lineaVertical0sub3, 30, pdf.internal.pageSize.height - 5);
          pdf.text("MATRICULA", 40, 100);
    
          const lineaVertical1 = 67;
          pdf.line(67, lineaVertical1, 67, pdf.internal.pageSize.height - 5);
          pdf.text("NOMBRE DEL ESTUDIANTE", 100, 100);
          pdf.text("APELLIDO PATERNO  APELLIDO MATERNO  NOMBRE(S)", 80, 110);
    
          const lineaVertical2 = 67;
          pdf.line(170, lineaVertical2, 170, pdf.internal.pageSize.height - 5);
          pdf.text("SEXO", 176, 110, {
            angle: 90,
          });
    
          const lineaVertical3 = 67;
          pdf.line(180, lineaVertical3, 180, pdf.internal.pageSize.height - 5);
    
          const lineaHorizontalCalificaciones = 73; // Altura de la línea horizontal
          pdf.line(
            180,
            lineaHorizontalCalificaciones,
            250,
            lineaHorizontalCalificaciones
          );
          pdf.text("** CALIFICACIONES FINALES **", 192, 71);
    
          pdf.text("A", 183, 78);
    
          const lineaVertical3inter1 = 73;
          pdf.line(
            190,
            lineaVertical3inter1,
            190,
            pdf.internal.pageSize.height - 5
          );
          pdf.text("B", 193, 78);
          const lineaVertical3inter2 = 73;
          pdf.line(
            200,
            lineaVertical3inter2,
            200,
            pdf.internal.pageSize.height - 5
          );
          pdf.text("C", 203, 78);
          const lineaVertical3inter3 = 73;
          pdf.line(
            210,
            lineaVertical3inter3,
            210,
            pdf.internal.pageSize.height - 5
          );
          pdf.text("D", 213, 78);
          const lineaVertical3inter4 = 73;
          pdf.line(
            220,
            lineaVertical3inter4,
            220,
            pdf.internal.pageSize.height - 5
          );
          pdf.text("E", 223, 78);
          const lineaVertical3inter5 = 73;
          pdf.line(
            230,
            lineaVertical3inter5,
            230,
            pdf.internal.pageSize.height - 5
          );
          pdf.text("F", 233, 78);
          const lineaVertical3inter6 = 73;
          pdf.line(
            240,
            lineaVertical3inter6,
            240,
            pdf.internal.pageSize.height - 5
          );
          pdf.text("G", 243, 78);
          const lineaVertical3inter7 = 73;
          pdf.line(
            250,
            lineaVertical3inter7,
            250,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("CALIFICACIONES DE REGULARIZACION", 252, 75);
    
          const lineaVertical4 = 67;
          pdf.line(250, lineaVertical4, 250, pdf.internal.pageSize.height - 5);
    
          pdf.text("CLAVE MATERIA", 256, 120, {
            angle: 90,
          });
    
          const lineaVertical4inter1 = 80;
          pdf.line(
            260,
            lineaVertical4inter1,
            260,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("CALIFICACION", 266, 120, {
            angle: 90,
          });
    
          const lineaVertical4inter2 = 80;
          pdf.line(
            270,
            lineaVertical4inter2,
            270,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("TIPO DE EXAMEN", 276, 120, {
            angle: 90,
          });
    
          const lineaVertical4inter3 = 80;
          pdf.line(
            280,
            lineaVertical4inter3,
            280,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("CLAVE MATERIA", 286, 120, {
            angle: 90,
          });
    
          const lineaVertical4inter4 = 80;
          pdf.line(
            290,
            lineaVertical4inter4,
            290,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("CALIFICACION", 296, 120, {
            angle: 90,
          });
    
          const lineaVertical4inter5 = 80;
          pdf.line(
            300,
            lineaVertical4inter5,
            300,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("TIPO DE EXAMEN", 306, 120, {
            angle: 90,
          });
    
          const lineaVertical5 = 67;
          pdf.line(310, lineaVertical5, 310, pdf.internal.pageSize.height - 5);
    
          pdf.text("ASIGNATURAS NO ACREDITADAS", 321, 125, {
            angle: 90,
          });
    
          const lineaVertical6 = 67;
          pdf.line(330, lineaVertical6, 330, pdf.internal.pageSize.height - 5);
    
          pdf.text("SITUACION ESCOLAR", 341, 118, {
            angle: 90,
          });
    
          const lineaVerticalFinDoc = 67;
          pdf.line(350, lineaVerticalFinDoc, 350, pdf.internal.pageSize.height - 5);
    
          const lineaHorizontalYAbajo = 80; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalYAbajo, 310, lineaHorizontalYAbajo);
          //ANTES DE LA DATA DE ALUMNOS
    
          const lineaHorizontalArribaData = 132; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalArribaData, 350, lineaHorizontalArribaData);
    
          // FIN LINEA
    
          const lineaHorizontalYFin = pdf.internal.pageSize.height - 5; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalYFin, 350, lineaHorizontalYFin);
        };
        AgregarformatoInicial(grupo, cucEspecifica);
    
        //Llenar datos
        const estudiantesNormales = infoReporte.estudiantes_grupo;
        const estudiantesReprobados = infoReporte.estudiantes_otras_clases;
        let inicioy = 136;
        let lineaHorizontalInterData = 140;
        let matRecorridoY = 184;
        const estudiantesPorPagina = 10;
        let estudiantesAcumulados = 0;
        let cont = 0;
        estudiantesNormales.map((data, index) => {
          if (estudiantesAcumulados === estudiantesPorPagina) {
            pdf.addPage();
            AgregarformatoInicial(grupo, cucEspecifica);
            estudiantesAcumulados = 0;
            cont = 0;
          }
          inicioy = 136 + cont * 8;
          lineaHorizontalInterData = 140 + cont * 8;
          pdf.text("" + (index + 1), 6, inicioy);
          pdf.text(" ", 16, inicioy);//materias no acreditadas izquierda
          pdf.text(data.estudiante.regular === "Si" ? "REG" : "IRR", 22, inicioy);
          pdf.text("" + data.estudiante.matricula, 37, inicioy);
          pdf.text(
            
              " " +
              data.estudiante.apellido_paterno +
              " " +
              data.estudiante.apellido_materno+
              " " +
              data.estudiante.nombre ,
            80,
            inicioy
          );
          pdf.text("" + data.estudiante.sexo.toUpperCase(), 173, inicioy);
          // pdf.text(""+data.estudiante.semestre, 273, 55);
          //Materias
          const nombreMaterias=infoReporte.nombres_materias;
          let posNombreMateria=[184,194,204,214,224,234,244];
          nombreMaterias.map((materia,indexN)=>{
            const lineasTextoVerticalC = dividirTexto(
              "" + materia,
              15
            );
            lineasTextoVerticalC.forEach((linea, index) => {
              pdf.text(linea, posNombreMateria[indexN] + index * 3, 125, {
                angle: 90,
              });
            });
          })
          let arregloMaterias = data.clases;
          arregloMaterias.map((materia, index) => {
            let i=nombreMaterias.indexOf(materia.nombre_materia);
              // matRecorridoY = 184 + index * 10;
              if(i!==-1){
                pdf.text(
                  tipo===1?(" "):(materia.calificacion_estudiante),
                  posNombreMateria[i] - 2,
                  inicioy
                );
              }
              
          });
    
          pdf.text(" ", 321, inicioy);//materias no acreditadas derecha
          pdf.text(data.estudiante.regular === "Si" ? "REG" : "IRR", 341, inicioy);
          // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalInterData, 350, lineaHorizontalInterData);
          estudiantesAcumulados++;
          cont++;
        });
    
        pdf.addPage();
        const AgregarformatoInicialParteTrasera = () => {
          pdf.setFontSize(7); // Tamaño de letra
          pdf.setFont("times", "bold");
          // INICIO LINEA
    
          // Modificar grosor de línea horizontal
          const grosorLineaHorizontal = .5; // Grosor en puntos
          pdf.setLineWidth(grosorLineaHorizontal);
    
          const lineaHorizontalYArriba = 1; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalYArriba, 350, lineaHorizontalYArriba);
    
          const lineaVertical0 = 1;
          pdf.line(1, lineaVertical0, 1, pdf.internal.pageSize.height - 5);
    
          pdf.text("ANTECEDENTES", 20, 8);
    
          pdf.text("NUM. PROGRE.", 6, 54, {
            angle: 90,
          });
          const lineaVertical0sub1 = 14;
          pdf.line(10, lineaVertical0sub1, 10, 133);
          pdf.text("ASIGNATURAS NO ACREDITADAS", 16, 58, {
            angle: 90,
          });
          const lineaVertical0sub2 = 14;
          pdf.line(20, lineaVertical0sub2, 20, 133);
          pdf.text("SITUACION ESCOLAR", 26, 54, {
            angle: 90,
          });
          const lineaVertical0sub3 = 14;
          pdf.line(30, lineaVertical0sub3, 30, 133);
          pdf.text("MATRICULA", 40, 34);
    
          const lineaVertical1 = 1;
          pdf.line(67, lineaVertical1, 67, 133);
          pdf.text("NOMBRE DEL ESTUDIANTE", 100, 34);
          pdf.text("APELLIDO PATERNO  APELLIDO MATERNO  NOMBRE(S)", 80, 44);
    
          const lineaVertical2 = 1;
          pdf.line(170, lineaVertical2, 170, 133);
          pdf.text("SEXO", 176, 44, {
            angle: 90,
          });
    
          const lineaVertical3 = 1;
          pdf.line(180, lineaVertical3, 180, 133);
    
          const lineaHorizontalCalificaciones = 7; // Altura de la línea horizontal
          pdf.line(
            180,
            lineaHorizontalCalificaciones,
            250,
            lineaHorizontalCalificaciones
          );
          pdf.text("** CALIFICACIONES FINALES **", 192, 5);
    
          pdf.text("A", 183, 12);
    
          // pdf.text("MateriaA", 186, 125, {
          //   angle: 90,
          // });
          const lineaVertical3inter1 = 7;
          pdf.line(190, lineaVertical3inter1, 190, 133);
          pdf.text("B", 193, 12);
          const lineaVertical3inter2 = 7;
          pdf.line(200, lineaVertical3inter2, 200, 133);
          pdf.text("C", 203, 12);
          const lineaVertical3inter3 = 7;
          pdf.line(210, lineaVertical3inter3, 210, 133);
          pdf.text("D", 213, 12);
          const lineaVertical3inter4 = 7;
          pdf.line(220, lineaVertical3inter4, 220, 133);
          pdf.text("E", 223, 12);
          const lineaVertical3inter5 = 7;
          pdf.line(230, lineaVertical3inter5, 230, 133);
          pdf.text("F", 233, 12);
          const lineaVertical3inter6 = 7;
          pdf.line(240, lineaVertical3inter6, 240, 133);
          pdf.text("G", 243, 12);
          const lineaVertical3inter7 = 7;
          pdf.line(250, lineaVertical3inter7, 250, 133);
    
          // pdf.text("CALIFICACIONES DE REGULARIZACION", 252, 8);
    
          const lineaVertical4 = 1;
          pdf.line(250, lineaVertical4, 250, 133);
    
          pdf.text("CLAVE MATERIA", 256, 54, {
            angle: 90,
          });
    
          const lineaVertical4inter1 = 14;
          pdf.line(260, lineaVertical4inter1, 260, 133);
    
          pdf.text("CALIFICACION", 266, 54, {
            angle: 90,
          });
    
          const lineaVertical4inter2 = 14;
          pdf.line(270, lineaVertical4inter2, 270, 133);
    
          pdf.text("TIPO DE EXAMEN", 276, 54, {
            angle: 90,
          });
    
          const lineaVertical4inter3 = 14;
          pdf.line(280, lineaVertical4inter3, 280, 133);
    
          pdf.text("CLAVE MATERIA", 286, 54, {
            angle: 90,
          });
    
          const lineaVertical4inter4 = 14;
          pdf.line(290, lineaVertical4inter4, 290, 133);
    
          pdf.text("CALIFICACION", 296, 54, {
            angle: 90,
          });
    
          const lineaVertical4inter5 = 14;
          pdf.line(300, lineaVertical4inter5, 300, 133);
    
          pdf.text("TIPO DE EXAMEN", 306, 54, {
            angle: 90,
          });
    
          const lineaVertical5 = 1;
          pdf.line(310, lineaVertical5, 310, 133);
    
          pdf.text("ASIGNATURAS NO ACREDITADAS", 321, 59, {
            angle: 90,
          });
    
          const lineaVertical6 = 1;
          pdf.line(330, lineaVertical6, 330, 133);
    
          pdf.text("SITUACION ESCOLAR", 341, 52, {
            angle: 90,
          });
    
          const lineaVerticalFinDoc = 1;
          pdf.line(350, lineaVerticalFinDoc, 350, pdf.internal.pageSize.height - 5);
    
          const lineaHorizontalYAbajo = 14; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalYAbajo, 310, lineaHorizontalYAbajo);
          //ANTES DE LA DATA DE ALUMNOS
    
          const lineaHorizontalArribaData = 60; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalArribaData, 350, lineaHorizontalArribaData);
    
          pdf.text("ESTUDIANTES QUE REPITEN CURSO", 90, 63);
          const lineaHorizontalAbajoRepitenCurso = 65; // Altura de la línea horizontal
          pdf.line(
            1,
            lineaHorizontalAbajoRepitenCurso,
            350,
            lineaHorizontalAbajoRepitenCurso
          );
    
          pdf.text("ESTUDIANTES DADOS DE ALTA", 90, 98);
          const lineaHorizontalAbajoDadosDeAlta = 100; // Altura de la línea horizontal
          pdf.line(
            1,
            lineaHorizontalAbajoDadosDeAlta,
            350,
            lineaHorizontalAbajoDadosDeAlta
          );
    
          const lineaHorizontalAbajoData = 133; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalAbajoData, 350, lineaHorizontalAbajoData);
    
          //PARTE DE SELLOS
          pdf.text("INSCRIPCION O REINSCRIPCION", 30, 137);
          const lineaHorizontalSellos1 = 139; // Altura de la línea horizontal
          pdf.line(1, lineaHorizontalSellos1, 110, lineaHorizontalSellos1);
          pdf.text("COORDINACION ACADEMICA", 57, 142);
          const lineaHorizontalCoordinacioA1 = 144; // Altura de la línea horizontal
          pdf.line(
            55,
            lineaHorizontalCoordinacioA1,
            110,
            lineaHorizontalCoordinacioA1
          );
    
          const lineaHorizontalFechaArriba1 = 170; // Altura de la línea horizontal
          pdf.line(
            55,
            lineaHorizontalFechaArriba1,
            110,
            lineaHorizontalFechaArriba1
          );
          pdf.text("FECHA", 57, 173);
    
          const lineaHorizontalSellosPlantelArriba = 175; // Altura de la línea horizontal
          pdf.line(
            1,
            lineaHorizontalSellosPlantelArriba,
            110,
            lineaHorizontalSellosPlantelArriba
          );
          pdf.text("SELLO PLANTEL", 10, 178);
          pdf.text("FECHA Y SELLO DE VALIDACION", 57, 178);
          const lineaHorizontalSellosPlantelAbajo = 181; // Altura de la línea horizontal
          pdf.line(
            1,
            lineaHorizontalSellosPlantelAbajo,
            110,
            lineaHorizontalSellosPlantelAbajo
          );
    
          const lineaHorizontalNombreFirmaArriba1 = 204; // Altura de la línea horizontal
          pdf.line(
            1,
            lineaHorizontalNombreFirmaArriba1,
            110,
            lineaHorizontalNombreFirmaArriba1
          );
          pdf.text("NOMBRE Y FIRMA DIRECTOR DEL CUC", 5, 207);
          pdf.text("NOMBRE Y FIRMA DE QUIEN VALIDA", 60, 207);
    
          const lineaVerticalSellos1 = 139;
          pdf.line(55, lineaVerticalSellos1, 55, pdf.internal.pageSize.height - 5);
    
          const lineaVerticalSellos2 = 139;
          pdf.line(
            110,
            lineaVerticalSellos2,
            110,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("ACREDITACION Y REGULARIZACION", 155, 137);
          const lineaHorizontalSellos2 = 139; // Altura de la línea horizontal
          pdf.line(125, lineaHorizontalSellos2, 235, lineaHorizontalSellos2);
    
          const lineaVerticalSellos3 = 139;
          pdf.line(
            125,
            lineaVerticalSellos3,
            125,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("COORDINACION ACADEMICA", 183, 142);
          const lineaHorizontalCoordinacioA2 = 144; // Altura de la línea horizontal
          pdf.line(
            180,
            lineaHorizontalCoordinacioA2,
            235,
            lineaHorizontalCoordinacioA2
          );
    
          const lineaHorizontalFechaArriba2 = 170; // Altura de la línea horizontal
          pdf.line(
            180,
            lineaHorizontalFechaArriba2,
            235,
            lineaHorizontalFechaArriba2
          );
          pdf.text("FECHA", 182, 173);
    
          const lineaHorizontalSellosPlantelArriba2 = 175; // Altura de la línea horizontal
          pdf.line(
            125,
            lineaHorizontalSellosPlantelArriba2,
            235,
            lineaHorizontalSellosPlantelArriba2
          );
          pdf.text("SELLO PLANTEL", 135, 178);
          pdf.text("FECHA Y SELLO DE VALIDACION", 182, 178);
          const lineaHorizontalSellosPlantelAbajo2 = 181; // Altura de la línea horizontal
          pdf.line(
            125,
            lineaHorizontalSellosPlantelAbajo2,
            235,
            lineaHorizontalSellosPlantelAbajo2
          );
    
          const lineaHorizontalNombreFirmaArriba2 = 204; // Altura de la línea horizontal
          pdf.line(
            125,
            lineaHorizontalNombreFirmaArriba2,
            235,
            lineaHorizontalNombreFirmaArriba2
          );
          pdf.text("NOMBRE Y FIRMA DIRECTOR DEL CUC", 130, 207);
          pdf.text("NOMBRE Y FIRMA DE QUIEN VALIDA", 185, 207);
          const lineaVerticalSellos4 = 139;
          pdf.line(
            180,
            lineaVerticalSellos4,
            180,
            pdf.internal.pageSize.height - 5
          );
    
          const lineaVerticalSellos5 = 139;
          pdf.line(
            235,
            lineaVerticalSellos5,
            235,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("LEGALIZACION DEL DOCUMENTO", 280, 137);
          const lineaHorizontalSellos3 = 139; // Altura de la línea horizontal
          pdf.line(250, lineaHorizontalSellos3, 350, lineaHorizontalSellos3);
    
          const lineaVerticalSellos6 = 139;
          pdf.line(
            250,
            lineaVerticalSellos6,
            250,
            pdf.internal.pageSize.height - 5
          );
    
          pdf.text("PERIODO LEGALIZADO", 283, 142);
    
          const lineaHorizontalPeriodoAbajo = 146; // Altura de la línea horizontal
          pdf.line(
            250,
            lineaHorizontalPeriodoAbajo,
            350,
            lineaHorizontalPeriodoAbajo
          );
          pdf.text("RECTORIA", 293, 149);
    
          const lineaHorizontalRectoria = 151; // Altura de la línea horizontal
          pdf.line(250, lineaHorizontalRectoria, 350, lineaHorizontalRectoria);
    
          const lineaHorizontalEspacio = 170; // Altura de la línea horizontal
          pdf.line(250, lineaHorizontalEspacio, 350, lineaHorizontalEspacio);
          pdf.text("NOMBRE Y FIRMA DEL RECTOR", 278, 173);
    
          const lineaHorizontalFirmaRectorAbajo = 175; // Altura de la línea horizontal
          pdf.line(
            250,
            lineaHorizontalFirmaRectorAbajo,
            350,
            lineaHorizontalFirmaRectorAbajo
          );
    
          pdf.text("COORDINACION ACADEMICA", 280, 178);
          const lineaHorizontalCordinacionAcademicaLegalizacionAbajo = 181; // Altura de la línea horizontal
          pdf.line(
            250,
            lineaHorizontalCordinacionAcademicaLegalizacionAbajo,
            350,
            lineaHorizontalCordinacionAcademicaLegalizacionAbajo
          );
    
          const lineaHorizontalNombreFirmaArriba3 = 204; // Altura de la línea horizontal
          pdf.line(
            250,
            lineaHorizontalNombreFirmaArriba3,
            350,
            lineaHorizontalNombreFirmaArriba3
          );
          pdf.text("NOMBRE Y FIRMA DEL COORDINADOR ACADEMICO", 265, 207);
          // const lineaVerticalSellos7 = 160;
          // pdf.line(
          //   300,
          //   lineaVerticalSellos7,
          //   300,
          //   pdf.internal.pageSize.height - 5
          // );
    
          const lineaVerticalSellos8 = 139;
          pdf.line(
            350,
            lineaVerticalSellos8,
            350,
            pdf.internal.pageSize.height - 5
          );
          // FIN LINEA
    
          const lineaHorizontalYFin = pdf.internal.pageSize.height - 5; // Altura de la línea horizontal
          pdf.line(0, lineaHorizontalYFin, 350, lineaHorizontalYFin);
        };
        AgregarformatoInicialParteTrasera();
    
        let inicioyHojaT = 69;
        let lineaHorizontalInterDataHojaT = 70;
        let matRecorridoYHojaT = 184;
        const estudiantesPorPaginaHojaT = 4;
        let estudiantesAcumuladosHojaT = 0;
        let contHojaT = 0;
        estudiantesReprobados.map((data, index) => {
          if (estudiantesAcumuladosHojaT === estudiantesPorPaginaHojaT) {
            pdf.addPage();
            AgregarformatoInicialParteTrasera();
            estudiantesAcumuladosHojaT = 0;
            contHojaT = 0;
          }
          inicioyHojaT = 69 + contHojaT * 8;
          lineaHorizontalInterDataHojaT = 70 + contHojaT * 8;
          pdf.text("" + (index + 1), 6, inicioyHojaT);
          pdf.text(" ", 16, inicioyHojaT);
          pdf.text(
            data.estudiante.regular === "Si" ? "REG" : "IRR",
            22,
            inicioyHojaT
          );
          pdf.text("" + data.estudiante.matricula, 37, inicioyHojaT);
          pdf.text(
              " " +
              data.estudiante.apellido_paterno +
              " " +
              data.estudiante.apellido_materno+" " +
              data.estudiante.nombre ,
            80,
            inicioyHojaT
          );
          pdf.text("" + data.estudiante.sexo.toUpperCase(), 173, inicioyHojaT);
    
          //Materias
          let arregloMateriasHojaT = data.clases;
          const nombreMaterias=infoReporte.nombres_materias;
          let posNombreMateria=[184,194,204,214,224,234,244];

          nombreMaterias.map((materia,indexN)=>{
            const lineasTextoVerticalCHT = dividirTexto(
              "" + materia,
              15
            );
            lineasTextoVerticalCHT.forEach((linea, index) => {
              pdf.text(linea, posNombreMateria[indexN] + index * 3, 55, {
                angle: 90,
              });
            });
          })
          arregloMateriasHojaT.map((materia, index) => {
            // matRecorridoYHojaT = 184 + index * 10;
            let i=nombreMaterias.indexOf(materia.nombre_materia);
            if(i!==-1){ 
              pdf.text(
                tipo===1?(" "):(materia.calificacion_estudiante),
                posNombreMateria[i]  - 2,
                inicioyHojaT
              );
            }
           
          });

          
    
          pdf.text(" ", 321, inicioyHojaT);
          pdf.text(
            data.estudiante.regular === "Si" ? "REG" : "IRR",
            341,
            inicioyHojaT
          );
          // Altura de la línea horizontal
          pdf.line(
            1,
            lineaHorizontalInterDataHojaT,
            350,
            lineaHorizontalInterDataHojaT
          );
          estudiantesAcumuladosHojaT++;
          contHojaT++;
        });
    
        // Guardar o mostrar el documento
        // pdf.save("documento_horizontal.pdf");
        // Para mostrar en una nueva ventana
        pdf.output("dataurlnewwindow");
      };
