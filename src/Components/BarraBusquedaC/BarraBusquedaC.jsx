import React, { useState } from "react";
import '../BarraBusquedaC/BarraBusquedaC.css'
export const BarraBusquedaC = ({ onBuscar, placeholdero}) => {
  const [clave, setClave] = useState("");

  const handleInputChange = (event) => {
    setClave(event.target.value);
  };

  const handleBuscarClick = () => {
    onBuscar(clave);
  };

  return (
    <div className="BusquedaCuc">
      <input
        type="text"
        placeholder={placeholdero}
        value={clave}
        onChange={handleInputChange}
      />
      <button onClick={handleBuscarClick}>Buscar</button>
    </div>
  );
};
