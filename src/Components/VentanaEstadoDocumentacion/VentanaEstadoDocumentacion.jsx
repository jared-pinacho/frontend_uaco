import React, { useState } from "react";
import "../VentanaEstadoDocumentacion/VentanaEstadoDocumentacion.css";
export const VentanaEstadoDocumentacion = ({
  abierto,
  dataDocumentos,
  estudiante,
  enviar,
  onCancel,
  grado,
  editable,
}) => {
  const [documentos, setDocumentos] = useState(estudiante.documentacion);
  const toggleEstado = (index) => {
    const newDocumentos = [...documentos];
    newDocumentos[index].estado = !newDocumentos[index].estado;
    setDocumentos(newDocumentos);
  };
  const filas = documentos.map((documento, index) => {
    if (index === 3 && grado !== "Licenciatura") {
      // console.log("No es licenciatura")
      return null; // O podrías devolver un elemento en blanco, dependiendo de tus necesidades
    }
    // console.log(grado)
    return (
      <tr key={index}>
        <td>{documento.nombre}</td>
        <td>
          <button
            className={`switch ${documento.estado ? "on" : "off"}`}
            onClick={() => toggleEstado(index)}
            disabled={!editable}
          >
            {documento.estado ? "Activado" : "Desactivado"}
          </button>
        </td>
      </tr>
    );
  });
  const prepararEnviar = (documentos) => {
    if (!estudiante.matricula || !documentos) {
      return;
    }
    const datosEnviar = {
      matricula: estudiante.matricula,
      documentacion: documentos,
    };
    enviar(datosEnviar);
  };

  return abierto ? (
    <>
      <div className={`ventanaDocumentacioPrincipal ${abierto ? "open" : ""}`}>
        <div className="tituloVentana">
          Estado de la documentacion del estudiante
        </div>
        <div className="datosEstudiante">{`${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`}</div>
        <div className="opcionesDocumentacion">
          <div className="table-responsive contenedor">
            <table className="table-responsive table tablita">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Entregado</th>
                </tr>
              </thead>

              <tbody>{filas}</tbody>
            </table>
          </div>
        </div>
        <div className="botonesDocumentacion">
          {editable ? (
            <button
              onClick={() => prepararEnviar(documentos)}
              className="confirmar"
            >
              Confirmar
            </button>
          ):null}

          <button onClick={onCancel} className="cancelar">
            Cancelar
          </button>
        </div>
      </div>
    </>
  ) : null;
};
