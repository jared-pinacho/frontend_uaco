import React from 'react'
import '../VentanaConfirmacion/VentanaConfirmacion.css'
export const VentanaConfirmacion = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <div className={`confirm-dialog ${isOpen ? "open" : ""}`}>
      <div className="confirm-message">{message}</div>
      <button onClick={onConfirm} className='confirmar'>Confirmar</button>
      <button onClick={onCancel} className='cancelar'>Cancelar</button>
    </div>
  )
}
