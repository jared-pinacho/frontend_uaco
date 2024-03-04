import React from "react";
import "../Pages/HomePage.css";
import logo from "../assets/img/logoUACO.png";
export const HomePage = () => {
  const mision =
    "La UACO, como institución de educación superior y en coincidencia con los principios de Comunalidad que guían su labor, tiene como fin generar educación de nivel licenciatura, posgrado, especialización y actualización; además de la investigación se plantea el fortalecimiento y difusión de los saberes y la cultura propia.   Para cumplir su misión fundamenta su actuar en los principios de Comunalidad, Integralidad existencial, Complementariedad, Horizontalidad, Equidad de género, Respeto y Reciprocidad; mediante las estrategias fundadas en la labor y acción, así como resignificar la labor de tequiar y servir para el bien común de los pueblos.";
  const vision =
    "La universidad busca recuperar y preservar las relaciones colectivas y comunitarias, y elevarlas al conocimiento en educación superior mediante prácticas pedagógicas que tienen como principio epistemológico, la Comunalidad, que se plantea refundar la formación de profesionales con sensibilidad y conocimientos que transformen las relaciones sociales y comunitarias en los pueblos y naciones originarias.";
  return (
    <div className="contenedorMain">
      <div className="titulo">
        <h1>{"Bienvenido al sistema"}</h1>
      </div>
      <div className="contenedorSecundario">
        <div className="contenedorTexto">
          <div className="mision">
            <h1>Misión</h1>
            <p>{mision}</p>
          </div>
          <div className="vision">
            <h1>Visión</h1>
            <p>{vision}</p>
          </div>
        </div>

        <div className="contenedorImagen">
          <img src={logo} alt="Descripción de la imagen" />
          
        </div>
        
      </div>
    </div>
  );
};
