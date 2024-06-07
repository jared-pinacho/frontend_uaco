import React, { useState } from 'react';
import "../TablaEstudiantes/TablaEstudiantes.css";
import Loader from "../Loader/Loader";
import { PanelTramite } from '../TramiteServicio/PanelTramite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const TablaEstudiantesServicio = ({
  estudiantes,
  isLoading,
  setBotonesVisibles
}) => {
  const [filtro, setFiltro] = useState("");
  const [datoAPasar, setDatoAPasar] = useState(null);
  const [estado, setEstado] = useState(null);

  const filasFiltradas = estudiantes.filter((estudiante) => {
    const termino = filtro.toLowerCase();
    const nombreCompleto = `${estudiante.nombre} ${estudiante.apellido_paterno} ${estudiante.apellido_materno}`.toLowerCase();
    return (
      estudiante.matricula.toLowerCase().includes(termino) ||
      estudiante.nombre.toLowerCase().includes(termino) ||
      estudiante.apellido_paterno.toLowerCase().includes(termino) ||
      estudiante.apellido_materno.toLowerCase().includes(termino) ||
      nombreCompleto.includes(termino) ||
      estudiante.usuario.email.toLowerCase().includes(termino) ||
      estudiante.telefono.includes(termino) 
    );
  });

  const handleButtonClick = (matricula,estado) => {
    // Aquí podrías realizar alguna lógica adicional si es necesario con el dato de matrícula
    setDatoAPasar(matricula);
    setEstado(estado);
    setBotonesVisibles(false); // Oculta los botones

  };

  const handleBackToTable = () => {
    // Función para limpiar el estado datoAPasar y volver a mostrar la tabla de estudiantes
    setDatoAPasar(null);
    setBotonesVisibles(true); // Oculta los botones

  };

  const renderComponent = () => {
    if (datoAPasar) {
      // Si datoAPasar tiene un valor (matrícula), renderiza el componente PanelTramite
      return (
        <PanelTramite
          dato={datoAPasar}
          estado={estado}
          onBack={handleBackToTable} // Pasa la función de regreso como prop a PanelTramite

          />
      );
    } else {
      // Si datoAPasar es null, renderiza la tabla de estudiantes
      return (
        <div className="table-responsive contenedorTablaEstudiantes">
          <input
            className="campoBusqueda"
            type="text"
            placeholder="Buscar..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <table className="table-responsive table tablita">
            <thead>
              <tr>
                <th>Matrícula</th>
                <th>Nombre</th>
                <th>Apellido paterno</th>
                <th>Apellido materno</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Momento aprobado</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="8">
                    <Loader />
                  </td>
                </tr>
              ) : (
                filasFiltradas.map((estudiante, index) => (
                  <tr key={index}>
                    <td>{estudiante.matricula}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.apellido_paterno}</td>
                    <td>{estudiante.apellido_materno}</td>
                    <td>{estudiante.usuario.email}</td>
                    <td>{estudiante.telefono}</td>
                    <td>{estudiante.estado_tramite}</td>
                    <td>
                      <button
                        className="btnDoc"
                        onClick={() => handleButtonClick(estudiante.matricula,estudiante.estado_tramite)}
                      >
                       <FontAwesomeIcon icon={faUser} /> ir
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return renderComponent();
};
