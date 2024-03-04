import React, { useEffect, useState } from "react";
import "../Estudiante/MateriasEnCursoPage.css";
import axios from "axios";
import { TarjetaCargaAcademica } from "../../Components/TarjetaCargaAcademica/TarjetaCargaAcademica";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const MateriasEnCursoPage = () => {
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [materiasCursando, setMateriasCursando] = useState([]);
  const [estudiante, setEstudiante] = useState("");
  useEffect(() => {
    obtenerCargaAcademica();
  }, []);

  const obtenerCargaAcademica = () => {
    axios
      .get(`${apiUrl}estudiantes/clases/general`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setMateriasCursando(response.data.data.clases);
        setEstudiante(response.data.data.estudiante[0])
        // setIsLoading(false);
      })
      .catch((error) => {
        setMateriasCursando([]);
        setEstudiante("");
        // setIsLoading(false);
        // console.log(error);
        toast.error("Error al obtener la carga academica");
      });
  };

  const generarHorarioPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setTextColor(19, 85, 133);
    doc.setFont("times", "bold");
    doc.text("UNIVERSIDAD AUTONOMA COMUNAL DE OAXACA", 15, 10);
    doc.setFontSize(16);
    doc.text("Horario de Clases", 80, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Nombre: " + estudiante.nombre + " " + estudiante.apellido_paterno + " " + estudiante.apellido_materno, 15, 28);
    doc.text("Grupo: " + estudiante.grupo[0].nombre, 15, 34);
    doc.text("Programa: " + estudiante.grupo[0].carrera.nombre, 15, 40);
    doc.setFont("Helvetica");
    doc.autoTable({
      head: [["Clase", "Materia", "Profesor", "Aula", "Hora"]],
      body: materiasCursando.map((materia) => [
        materia.nombre_clase,
        materia.nombre_materia,
        materia.nombre_facilitador + " " + materia.apellidoP_facilitador + " " + materia.apellidoM_facilitador,
        materia.salon_clase,
        `${materia.hora_inicio} - ${materia.hora_final}`,
      ]),
      startY: 45,
    });
    doc.save("horario.pdf");
  };

  return (
    <div className="materiasCursandoPage">
      <div className="titulomateriasCursando">
        <h1>Carga Academica</h1>
      </div>
      <div className="Horario">
        {materiasCursando.length !== 0 ? (
          <button
            className="btnHorario"
            disabled={materiasCursando.length === 0}
            onClick={generarHorarioPDF}
          >
            Descargar horario
          </button>
        ) : <div></div>}
      </div>
      <div className="opcionesIniciales">
        {materiasCursando.map((materia, index) => (
          <div className="opcion" key={index}>
            <TarjetaCargaAcademica
              materia={materia.nombre_materia}
              profesor={materia.nombre_facilitador + " " + materia.apellidoP_facilitador + " " + materia.apellidoM_facilitador}
              calificacion={
                materia.status_facilitador
                  ? materia.calificacion_estudiante
                  : "Sin calificar"
              }
              retroalimentacion={
                materia.status_facilitador
                  ? materia.retroalimentacion_estudiante
                  : "Sin retroalimentación"
              }
              aula={materia.salon_clase}
              hora={materia.hora_inicio + " - " + materia.hora_final}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
