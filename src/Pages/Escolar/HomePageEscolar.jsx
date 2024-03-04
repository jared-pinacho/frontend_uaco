import React, { useEffect, useState } from "react";
import "../Coordinador/HomePageCoordinador";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { toast } from "react-toastify";

export const HomePageEscolar = () => {
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [datosGenerales, setDatosGenerales] = useState({});
  const [datosProgramas, setDatosProgramas] = useState([]);
  const apiUrl = URL_API;
  const calcularPorcentaje = (valor, total) => {
    const porcentaje = (valor / total) * 100;
    return porcentaje.toFixed(1); // Limitar a un decimal
  };
  const dataHombreMujeres = {
    labels: ["Hombres", "Mujeres"],
    datasets: [
      {
        label: "%",
        data: [calcularPorcentaje(datosGenerales.total_hombres, datosGenerales.total_hombres + datosGenerales.total_mujeres), calcularPorcentaje(datosGenerales.total_mujeres, datosGenerales.total_hombres + datosGenerales.total_mujeres)],
        backgroundColor: ["#135585", "#9dc5c2"],
        hoverBackgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };

  const dataMexicanos = {
    labels: ["Mexicanos", "No mexicanos"],
    datasets: [
      {
        label: "%",
        data: [
          calcularPorcentaje(datosGenerales.total_estudiantes_mexicanos, datosGenerales.total_estudiantes_mexicanos + datosGenerales.total_estudiantes_no_mexicanos),
          calcularPorcentaje(datosGenerales.total_estudiantes_no_mexicanos, datosGenerales.total_estudiantes_mexicanos + datosGenerales.total_estudiantes_no_mexicanos)
        ],
        backgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };
  const dataEstudiantesProgramas = {
    labels: datosProgramas.map((programa) => programa.label),
    datasets: [
      {
        label: "%",
        // data: datosProgramas.map((programa) => ((programa.data / datosGenerales.total_estudiantes)) * 100),
        data: datosProgramas.map((programa) => ((programa.data / datosGenerales.total_estudiantes) * 100).toFixed(1)),
        backgroundColor: ["#135585", "#9dc5c2", "#135585", "#9dc5c2"],
      },
    ],
  };

  const obtenerDatos = () => {
    axios
      .get(`${apiUrl}por-cuc/estudiantes/total/numero`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        const datosCarreras = response.data.data.estudiantes_carrera;

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
        toast.error("Error al obtener los datos del CUC");
        setIsLoading(false);
      });
  };
  const obtenerEstudiantesPorPrograma = () => {
    axios
      .get(`${apiUrl}por-cuc/programa/estudiantes/total/numero`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {

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
                    text: "% Hombres y Mujeres",
                    color: "black", // Color del texto del título
                    font: {
                      size: 16, // Tamaño del texto del título
                      weight: "bold", // Peso del texto del título
                    },
                  }, tooltip: {
                    enabled: true,
                    titleFont: {
                      size: 18, // Tamaño de letra del título del tooltip
                    },
                    bodyFont: {
                      size: 18, // Tamaño de letra del contenido del tooltip
                    },
                  }
                }, // Opcional: ajusta el tamaño del gráfico
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
                // y: {
                //   ticks: {
                //     callback: function (value) {
                //       return value + "%";
                //     },
                //   },
                // },
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "% Estudiantes mexicanos y no mexicanos",
                    color: "black",
                    font: {
                      size: 16,
                      weight: "bold",
                    },
                  }, tooltip: {
                    enabled: true,
                    titleFont: {
                      size: 18, // Tamaño de letra del título del tooltip
                    },
                    bodyFont: {
                      size: 18, // Tamaño de letra del contenido del tooltip
                    },
                  },
                  datalabels: {
                    display: false,
                    color: 'black',
                    align: 'end',
                    anchor: 'end',
                    formatter: (value, context) => {
                      return (value * 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
                    },
                  },
                },

              }}
            />

          </div>
        </div>
        <div className="contenedorAbajo">
          <div className="graficaProgramasE">
            <Bar
              data={dataEstudiantesProgramas}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  x: {
                    ticks: {
                      autoSkip: true,
                      maxRotation: 70,
                      minRotation: 0,
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
                  }, tooltip: {
                    enabled: true,
                    titleFont: {
                      size: 18, // Tamaño de letra del título del tooltip
                    },
                    bodyFont: {
                      size: 18, // Tamaño de letra del contenido del tooltip
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
