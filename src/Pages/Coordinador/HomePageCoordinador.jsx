import React, { useEffect, useState } from "react";
import "../Coordinador/HomePageCoordinador.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { URL_API } from "../../Services/Const";
import { Pie, Bar, Line } from "react-chartjs-2";

export const HomePageCoordinador = () => {
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [datosGenerales, setDatosGenerales] = useState({});
  const [datosProgramas, setDatosProgramas] = useState([]);
  const apiUrl = URL_API;
  const dataHombreMujeres = {
    labels: ["Hombres", "Mujeres"],
    datasets: [
      {
        data: [datosGenerales.total_hombres, datosGenerales.total_mujeres],
        backgroundColor: ["#135585", "#9dc5c2"],
        hoverBackgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };

  const dataMexicanos = {
    labels: ["Mexicanos", "No mexicanos"],
    datasets: [
      {
        label: "Estudiantes mexicanos",
        data: [
          datosGenerales.total_estudiantes_mexicanos,
          datosGenerales.total_estudiantes_no_mexicanos,
        ],
        backgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };
  const dataEstudiantesProgramas = {
    labels: datosProgramas.map((programa) => programa.label),
    datasets: [
      {
        label: "Estudiantes por programa",
        data: datosProgramas.map((programa) => programa.data),
        backgroundColor: ["#135585", "#9dc5c2", "#135585", "#9dc5c2"],
      },
    ],
  };

  const obtenerDatos = () => {
    axios
      .get(`${apiUrl}cucs/estudiantes/total/numero`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        const datosCarreras = response.data.data.estudiantes_carrer;

        const datosProgram = Object.entries(datosCarreras).map(
          ([carrera, data]) => ({
            label: carrera,
            data: data,
          })
        );
        setDatosGenerales(response.data.data);
        // console.log(datosProgram);
        setDatosProgramas(datosProgram);

        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de las CUCs:");
        setIsLoading(false);
      });
  };

  const obtenerEstudiantesPorPrograma = () => {
    axios
      .get(`${apiUrl}coordinador/programa/estudiantes/total/numero`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);

        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error al obtener los datos de las CUCs:");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  return !datosGenerales ? null : (
    <>
      <div className="homePageCoordinador">
        <div className="contenedorArriba">
          <div className="contenedorTarjeta">
            <div className="tarjetaTotalEstudiantes">
              <div className="titulo">Total de estudiantes</div>
              <div className="contenido">
                {datosGenerales.total_estudiantes}
              </div>
            </div>
          </div>
          <div className="contenedorTarjeta">
            <Pie
              data={dataHombreMujeres}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Cantidad de hombres y mujeres",
                    color: "black", 
                    font: {
                      size: 16, 
                      weight: "bold", 
                    },
                  },
                },
              }}
            />
          </div>
          <div className="contenedorTarjeta">
            <Bar
              data={dataMexicanos}
              options={{
                indexAxis: "y", 
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Estudiantes mexicanos",
                    color: "black", 
                    font: {
                      size: 16, 
                      weight: "bold", 
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="contenedorAbajo">
          <div className="graficaProgramas">
            <Bar
              data={dataEstudiantesProgramas}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  x: {
                    
                    ticks: {
                      autoSkip: false,
                      maxRotation: 70,
                      minRotation: 70,
                      fontSize: 5,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    stepSize: 1,
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Cantidad de estudiantes por programa",
                    color: "black",
                    font: {
                      size: 16,
                      weight: "bold",
                    },
                  },
                },
              }}
              dataset={{
                barThickness: 10,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
