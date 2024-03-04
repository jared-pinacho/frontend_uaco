import React from "react";
import "../BotonCRUD/BotonCRUD.css"

export const BotonCRUD = ({ modoActual, modo, texto, cambiarModo }) => {
  return (
    <button className="btn-opcion"
      onClick={() => cambiarModo(modo)}
      style={{
        backgroundColor: modoActual === modo ? "#D34646" : "#135A7A",
      }}
    >
      {texto}
    </button>
  );
}

