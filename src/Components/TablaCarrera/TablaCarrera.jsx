import React, { useState } from "react";
import axios from 'axios';

export const TablaCarrera = () => {
    const [carrera, setCarrera] = useState([]);
    const [clavecu, setClaveCu] = useState("");

    const handleChange = (event) => {
    setClaveCu(event.target.value);
    };

    const buscarCarrera = () => {
    // Realiza una solicitud GET para obtener los detalles de la carrera por clave.
    
    axios.get(`http://127.0.0.1:8000/api/cucs/${clavecu}/carreras`)
        .then((response) => {
        // Almacena los detalles de la carrera en el estado del componente.
        console.log(response.data);
        setCarrera(response.data.data);
        
        })
        .catch((error) => {
        console.error('Error al obtener los detalles de la carrera:', error);
        });
    };

    
    const filas = carrera.map((carrer, index) => (
        <tr key={index}>
            <td>{carrer.clave_carrera}</td>
            <td>{carrer.nombre}</td>
            <td>{carrer.tipo}</td>
            <td>{carrer.creditos}</td>
            <td>{carrer.modalidad}</td>
            <td>{carrer.duracion}</td>
        </tr>
        ));

    return (
        <div>
        <h1>Detalles de Carrera</h1>
        <div>
            <label>Clave de cuc:</label>
            <input
            type="text"
            value={clavecu}
            onChange={handleChange}
            />
            <button onClick={buscarCarrera}>Buscar</button>
        </div>
        <table>
        <thead>
            <tr>
            <th>Clave de Carrera</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Créditos</th>
            <th>Modalidad</th>
            <th>Duración</th>
            </tr>
        </thead>
        <tbody>
            {filas}
        </tbody>
        </table>
        
        </div>
    );
    }