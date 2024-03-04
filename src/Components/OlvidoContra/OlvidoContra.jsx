import React, { useState } from "react";
import "../OlvidoContra/OlvidoContra.css";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "../Loader/Loader";
import { NavLink } from "react-router-dom";
import { URL_API } from "../../Services/Const";
export const OlvidoContra = () => {
  const [formData, setFormData] = useState({ email: "" });
  const [isLoading, setLoading] = useState(false);
  const apiUrl = URL_API;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(formData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    // axios
    //   .get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    axios
      .post(`${apiUrl}olvido-contra`, formData)
      .then((response) => {
        // console.log(response);
        toast.success(response.data.message);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
        // console.log(error.response.data);
      });
    // }
    // )
    // .catch((error) => {
    //   console.log(error);
    //   toast.error(error.response.data.message);
    // });
  };

  return (
    <div className="contenedor-principal">
      <div className="titulo">
        <h1>OLVIDO SU CONTRASEÑA</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo electronico
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Ingrese su correo"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary boton">
            Enviar enlace de recuperacion al correo
          </button>
        </div>
        <br />

        {/* <Loader /> */}
      </form>
      <div className="text-center">
        <a href="/">
          <button class="btn btn-primary boton">Volver al login</button>
        </a>
      </div>
      <div>
        {(isLoading)?<Loader/>:(null)}
      </div>
    </div>
  );
};
