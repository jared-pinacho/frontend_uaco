import React, { useEffect, useState } from "react";
import "../Coordinador/HomePageServicio.css";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { URL_API } from "../../Services/Const";
import { Pie, Bar, Line } from "react-chartjs-2";

export const PageSocialCoordinador = () => {
  const token = Cookies.get("tok");
  const [isLoading, setIsLoading] = useState(true);
  const [datosGenerales, setDatosGenerales] = useState({});
  const apiUrl = URL_API;


  const dataHombreMujeres = {
    labels: ["Hombres", "Mujeres"],
    datasets: [
      {
        label:'Total',
        data: [datosGenerales.total_hombres, datosGenerales.total_mujeres],
        backgroundColor: ["#135585", "#9dc5c2"],
        hoverBackgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };


  const dataModalidad  = {
    labels: datosGenerales.label_estudiantes,

    datasets: [
      {
        label: "Prestadores",
        data: datosGenerales.data_estudiantes,
        backgroundColor: ["#135585", "#9dc5c2"],
      },
    ],
  };


  const dataHombreMujeresForaneos = {
    labels: ["Hombres", "Mujeres"],
    datasets: [
      {
        label: "Total",
        data: [datosGenerales.hombres_foraneos,datosGenerales.mujeres_foraneos],
        backgroundColor: ["#218838", "#81c784"],
        hoverBackgroundColor: ["#218838", "#81c784"],
      },
    ],
  };



  const dataEdad  = {
    labels: datosGenerales.label_foraneos,

    datasets: [
      {
        label: "Foráneos",
        data: datosGenerales.data_foraneos,
        backgroundColor: ["#218838", "#81c784"],
        hoverBackgroundColor: ["#218838", "#81c784"],
      },
    ],
  };

 

  const obtenerDatos = () => {
    axios
      .get(`${apiUrl}cucs/prestadores/total/numero`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {      
        setDatosGenerales(response.data.data);
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
      <div className="homePageCoordinadore">
        <div className="contenedorArribae">
          <div className="contenedorTarjetae">
            <div className="tarjetaTotalEstudiantese">
              <div className="tituloe">Total de Prestadores de Servicio</div>
              <div className="contenidoe">
                {datosGenerales.total_estudiantes}
              </div>
            </div>
          </div>
          <div className="contenedorTarjetae">
            <Pie
              data={dataHombreMujeres}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Cantidad de Hombres y Mujeres",
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
          <div className="contenedorTarjetae">
          <Bar
  data={dataModalidad}
  options={{
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Asegura que solo se muestren valores enteros
          callback: function(value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Estudiantes prestadores por año",
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
       



        <div className="contenedorArribae">
          <div className="contenedorTarjetae">
            <div className="tarjetaTotalEstudiantese">
              <div className="tituloe">Total de Prestadores Foráneos</div>
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
          stepSize: 1, // Esto asegura que solo se muestren valores enteros
          callback: function(value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
      x: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Prestadores Foráneos por año",
        color: "black",
        font: {
          size: 16,
          weight: "bold",
        },
      },
      tooltip: {
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
        // Eliminado el formateador de porcentaje
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
