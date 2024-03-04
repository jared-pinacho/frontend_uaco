import React, { useState } from "react";
import "../Login/Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { URL, URL_API } from "../../Services/Const";
import logo from "../../assets/img/logoUACO.png";
import Loader from "../Loader/Loader";

export const Login = () => {
  const apiUrl = URL_API;
  const Url = URL;
  const [modoLogin, setModoLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const cambiarModo = (modo) => {
    setModoLogin(modo);
  };
  const { login } = useAuthContext();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    axios
      .get(`${Url}sanctum/csrf-cookie`, {
        withCredentials: true,
      })
      .then((response) => {
        axios
          .post(`${apiUrl}login`, formData)
          .then((response) => {
            // console.log(response);
            const data = response.data.data;
            // Cookies.set('token',data.token,{expires:tiempoVida15m});
            // Cookies.set('nombre',data.nombre,{expires:tiempoVida15m});
            // Cookies.set('rol',data.rol,{expires:tiempoVida15m});
            // Cookies.set('clave_cuc',data.clave_cuc,{expires:tiempoVida15m});
            login(data);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleSubmitResestPassword = (event) => {
    event.preventDefault();
    setLoading(true);
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
  };

  return (
    <div className="contenedorPricipal">
      <div className="titulo">
        <h1>BIENVENIDO AL SISTEMA</h1>
      </div>
      <div className="contenidoFormulario">
        <div className={`ladoA ${modoLogin ? "mayor" : "menor"}`}>
          {modoLogin ? (
            <div className="formulario">
              <form onSubmit={handleSubmitLogin}>
                <div className="campos">
                  <label htmlFor="#">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="campos">
                  <label htmlFor="#">Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary boton">
                    Iniciar Sesión
                  </button>
                  <br />
                  <br />
                  <a href="#" onClick={() => cambiarModo(false)}>
                    <span className="txtOlvidoContra">
                      ¿Olvidó su contraseña?
                    </span>
                  </a>
                </div>
              </form>
            </div>
          ) : (
            <div className="contenedorlogo">
              <div className="imagen">
                <img src={logo} alt="Descripción de la imagen"  />
              </div>
              <div className="textoUaco">
                <h4>Universidad Autónoma Comunal de Oaxaca</h4>
              </div>
            </div>
          )}
        </div>
        <div className={`ladoB ${modoLogin ? "menor" : "mayor"}`}>
          {!modoLogin ? (
            <div className="formulario2">
              <form onSubmit={handleSubmitResestPassword}>
                <div className="campos">
                  <label htmlFor="#">Correo electronico</label>
                  <input
                    type="text"
                    name="email"
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
                <div className="text-center">
                  <button
                    class="btn btn-primary boton"
                    onClick={() => cambiarModo(true)}
                    type="button"
                  >
                    Volver al login
                  </button>
                </div>
                <div>{isLoading ? <Loader /> : null}</div>
              </form>
            </div>
          ) : (
            <>
              <div className="contenedorlogo">
                <div className="imagen">
                  <img src={logo} alt="Descripción de la imagen" />
                </div>
                <div className="textoUaco">
                  <h4>Universidad Autónoma Comunal de Oaxaca</h4>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
