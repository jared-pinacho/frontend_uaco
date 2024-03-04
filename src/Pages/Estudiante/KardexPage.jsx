import React, { useEffect, useState } from 'react';
import '../Estudiante/KardexPage.css'
import { URL_API } from '../../Services/Const';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { TablaKardex } from '../../Components/TablaKardex/TablaKardex';

export const KardexPage = () => {
    const apiUrl = URL_API;
    const token = Cookies.get("tok");
    const [kardexs, setKardexs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      obtenerKardex();
    }, []);
    
  
    const obtenerKardex = () => {
      setIsLoading(true);
      axios
        .get(`${apiUrl}estudiantes/clases/general/totales`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // console.log(response);
          setKardexs(response.data.data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setKardexs([]);
          // console.log(error);
          toast.error("Error al obtener los datos");
        });
    };
    return (
      <div className="kardexPage">
        <div className="tituloKardex">
          <h1>Kardex</h1>
        </div>
        <div className="tablaKardex">
            <TablaKardex isLoading={isLoading} data={kardexs}/>
        </div>
        
      </div>
  )
}
