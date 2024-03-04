import { useState, useEffect } from "react";
import axios from "axios";

export const useApi = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
 

  const sendRequest = async (config) => {
    const token = localStorage.getItem("tok"); // Obtén el token de localStorage

    if (token) {
      // Si tienes un token, agrégalo a la configuración de la solicitud
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    try {
      const res = await axios(config);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err);
      setResponse(null);
    } finally {
      
    }
  };

  return { response, error, sendRequest };
};
