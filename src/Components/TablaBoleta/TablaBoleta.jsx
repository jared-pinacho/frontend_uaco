import React from 'react'
import '../TablaBoleta/TablaBoleta.css'
import Loader from '../Loader/Loader';
export const TablaBoleta = ({ data, isLoading }) => {

    const calcularPromedio = (data) => {
        const calificaciones = data.map((item) => item.status_facilitador ? item.calificacion_estudiante : 0);
        const calificacionesValidas = calificaciones.filter((calificacion) => calificacion !== "Sin calificar");
        
        if (calificacionesValidas.length === 0) {
          return "Sin calificar";
        }
    
        const sumaCalificaciones = calificacionesValidas.reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        return (sumaCalificaciones / calificacionesValidas.length).toFixed(2);
      };
    
      const promedioCalificaciones = calcularPromedio(data);

    const filas = data.map((item, index) => (
        <tr key={index}>
          <td>{item.nombre_materia}</td>
          <td>{item.nombre_clase}</td>
          <td>{item.nombre_facilitador}</td>
          <td>{item.creditos_materia}</td>
          <td>{item.status_facilitador?item.calificacion_estudiante:"Sin calificar"}</td>
        </tr>
      ));
  return (
    <div className="table-responsive contenedor">
      <table className="table-responsive table tablita">
        <thead>
          <tr>
            <th>Materia</th>
            <th>Clase</th>
            <th>Facilitador</th>
            <th>Creditos</th>
            <th>Calificacion</th>
          </tr>
        </thead>

        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">
                <Loader />
              </td>
            </tr>
          ) : (
            filas
          )}
        </tbody>
        {data.length===0 ? (
            null
          ) : (
            <tfoot>
            <tr>
            <td colSpan="5"></td>
            </tr>
          <tr >
            <td colSpan="3"></td>
            <td className='promedio'>Promedio:</td>
            <td className='promedio'>{promedioCalificaciones}</td>
            
          </tr>
        </tfoot>
          )}
        
      </table>
    </div>
  )
}
