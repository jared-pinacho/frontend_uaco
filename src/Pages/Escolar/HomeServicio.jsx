import React, { useEffect, useState } from "react";
import "../Coordinador/HomePageServicio.css";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import axios from "axios";
import { Bar, Pie , Doughnut, PolarArea, Radar } from "react-chartjs-2";
import { toast } from "react-toastify";
import { BarController } from "chart.js";

export const HomeServicio = () => {
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
        label: "Total",
        data: [
        datosGenerales.total_hombres, 
          
        datosGenerales.total_mujeres],
        backgroundColor: ["#135585", "#9dc5c2"],
        hoverBackgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };

  const dataModalidad = {
    labels: datosGenerales.label_estudiantes,
    datasets: [
      {
        label: 'Estudiantes prestadores',
        data: datosGenerales.data_estudiantes, // Array de totales
        
        backgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };



  const dataEdad = {
    labels: datosGenerales.label_foraneos,

    datasets: [
      {
        label: 'Foraneos',
        data: datosGenerales.data_foraneos, // Array de totales
        
        backgroundColor: ["#218838", "#81c784"],
      },
    ],
  };



  const dataHombreMujeresForaneos = {
    labels: ["Hombres", "Mujeres"],
    datasets: [
      {
        label: "Total",
        data: [
        datosGenerales.hombres_foraneos,
        datosGenerales.mujeres_foraneos
      ],
        backgroundColor: ["#218838", "#81c784"],
        hoverBackgroundColor: ["#218838", "#81c784"],
      },
    ],
  };


  const obtenerDatos = () => {
    axios
      .get(`${apiUrl}por-cuc/prestadores/total/numero`, {
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
  
  useEffect(() => {
    obtenerDatos();
  }, []);

  return !datosGenerales ? null : (
    <>
      <div className="homePageCoordinadore">

        <div className="contenedorArribae">
          <div className="contenedorTarjetae">
            <div className="tarjetaTotalEstudiantese">
              <div className="tituloe">Prestadores de servicio</div>
              <div className="contenidoe">
                {datosGenerales.total_estudiantes}
              </div>
            </div>
          </div>
          <div className="contenedorTarjetae">
            <Doughnut
              data={dataHombreMujeres}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Prestadores Hombres y Mujeres",
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
          <div className="contenedorTarjetae">
            <Bar
              data={dataModalidad}
              options={{
                indexAxis: "y",
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1, // Asegura que los pasos sean de uno en uno, mostrando solo enteros
                      callback: function(value) {
                        if (Number.isInteger(value)) {
                          return value; // Muestra solo valores enteros
                        }
                      }
                    },
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Prestadores por año",
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
                      return (value * 100).toLocaleString(undefined, { style: 'inter', minimumFractionDigits: 1 });
                    },
                  },
                },

              }}
            />

          </div>
        </div>




        <div className="contenedorArribae">
          <div className="contenedorTarjetae">
            <div className="tarjetaTotalEstudiantese">
              <div className="tituloe">Prestadores Foráneos</div>
              <div className="contenidoe2">
                {datosGenerales.total_foraneos}
              </div>
            </div>
          </div>
          <div className="contenedorTarjetae">
            <Pie
              data={dataHombreMujeresForaneos}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Foráneos Hombres y Mujeres",
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
          <div className="contenedorTarjetae">
            <Bar
              data={dataEdad}
              options={{
                indexAxis: "x",
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1, // Asegura que los pasos sean de uno en uno, mostrando solo enteros
                    },
                  },
                },
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Foráneos por año",
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




        
      </div>
    </>
  );
};
