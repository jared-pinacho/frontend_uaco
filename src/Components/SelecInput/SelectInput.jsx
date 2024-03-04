import React from 'react'
import '../SelecInput/SelectInput.css'
export const SelectInput = ({clave,name, value, datos, onChange, disabled,mostrar,handlBlur}) => {
  return (
   
      <select
        name={name}
        value={value}
        required
        onChange={onChange}
        disabled={disabled}
        onBlur={handlBlur}
      >
        <option value="">Seleccione</option>
        {datos.map((option) => (
          <option key={option[clave]} value={option[clave]}>
          {option[mostrar]}
          </option>
        ))}
      </select>
    
  )
}
