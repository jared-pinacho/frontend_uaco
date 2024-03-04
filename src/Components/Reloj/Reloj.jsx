import React, { useState, useEffect } from 'react';
import '../Reloj/Reloj.css';

function Reloj() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000); // Actualiza cada segundo

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedDate = dateTime.toLocaleDateString(undefined, options);

    // Capitalizar el día de la semana
    formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Ajustar las horas si son mayores de 12 (formato de 12 horas)
    const formattedHours = hours > 12 ? hours - 12 : hours;

    const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds} ${amOrPm}`;

    return (
        <div className='Reloj'>
            <p>{formattedDate} -- {formattedTime}</p>
        </div>
    );
}

export default Reloj;