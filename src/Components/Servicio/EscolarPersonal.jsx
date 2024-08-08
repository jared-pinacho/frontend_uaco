import React, { useEffect, useState } from "react";
import axios from "axios";

import "./EscolarPersonal.css";

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { URL_API } from "../../Services/Const";
import { SelectInput } from "../SelecInput/SelectInput";
import { VentanaConfirmacion } from '../../Components/VentanaConfirmacion/VentanaConfirmacion';
import { VentanaRevisar } from "../VentanaRevisar/VentanaRevisar";

export const EscolarPersonal = ({
  estudianteAEditar,
  actualizarTabla,
}) => {
 
  const apiUrl = URL_API;
  const token = Cookies.get("tok");
  const [colonias, setColonias] = useState([]);
  const [matricula, setMatricula] = useState(true);
  const [pueblos_indigenas, setPueblosIndigenas] = useState([]);
  const [lenguas_indigenas, setLenguasIndigenas] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [estatus_envio, setEstatus_envio] = useState([]);
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(true);
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    matricula: "cargando ",
    nombre: "cargando...",
    apellidopaterno: "cargando...",
    apellidomaterno: "cargando...",
    edad: 0,
    curp: "cargando...",
    sexo: "cargando...",
    fecha_nacimiento: "cargando...",
    niveleducativo: "cargando...",
    calle: "cargando..",
    telefono: "cargando..",
    telefono_emergencia: "cargando..",
    num_exterior: "cargando..",
    colonia: "cargando..",
    municipio: "cargando..",
    cp: "cargando..",
    estado: "cargando..",
    id_tiposangre: "",
    padecimiento: "cargando..",
    discapacidad: "cargando..",
    regular: "cargando..",
    semestre: "cargando..",
    estatus: "",
    lengua_indigena: "",
    pueblo_indigena: "",
    clave_carrera: "",
    clave_grupo: "",
    email: "cargando..",
    password: "",
    otra_lengua: "",
    otro_pueblo: "",
    nacionalidad: "",
    otra_nacionalidad: "",
    estado_nacimiento: "",
  });

  useEffect(() => {
    // Si estamos en modo "edición" y se proporciona un objeto estudianteAEditar, llenar el formulario con esos datos.
    if (estudianteAEditar) {
      obtenerColonias(estudianteAEditar.direccion.colonia.cp.id_cp);
      
      setFormData({
        matricula: estudianteAEditar.matricula || 0,
        nombre: estudianteAEditar.nombre || "",
        apellidopaterno: estudianteAEditar.apellido_paterno || "",
        apellidomaterno: estudianteAEditar.apellido_materno || "",
        edad: estudianteAEditar.edad || 0,
        curp: estudianteAEditar.curp || "",
        sexo: estudianteAEditar.sexo || "",
        fecha_nacimiento: estudianteAEditar.fecha_nacimiento || "",
        niveleducativo: estudianteAEditar.nivel_educativo || "",
        calle: estudianteAEditar.direccion.calle || "",
        telefono: estudianteAEditar.telefono || "",
        telefono_emergencia: estudianteAEditar.telefono_emergencia || "",
        num_exterior: estudianteAEditar.direccion.num_exterior || "",
        colonia: estudianteAEditar.direccion.colonia.id_colonia || "",
        municipio: estudianteAEditar.direccion.colonia.municipio.nombre || "",
        cp: estudianteAEditar.direccion.colonia.cp.id_cp || "",
        estado:
          estudianteAEditar.direccion.colonia.municipio.estado.nombre || "",
        id_tiposangre: estudianteAEditar.id_tiposangre || "",
        padecimiento: estudianteAEditar.padecimiento || "",
        discapacidad: estudianteAEditar.discapacidad || "",
        regular: estudianteAEditar.regular || "",
        semestre: estudianteAEditar.semestre || "",
        estatus: estudianteAEditar.estatus || "",
        lengua_indigena: estudianteAEditar.id_lenguaindigena || "",
        pueblo_indigena: estudianteAEditar.id_puebloindigena || "",
        clave_carrera: estudianteAEditar.grupo.clave_carrera || "",
        clave_grupo: estudianteAEditar.clave_grupo || "",
        email: estudianteAEditar.usuario.email || "",
        password: estudianteAEditar.password || "",
        nacionalidad: estudianteAEditar.id_nacionalidad || "",
        estado_nacimiento: estudianteAEditar.estado_nacimiento || "",
        envio: estudianteAEditar.estatus_envio || "",
        
      });
   
      setEstatus_envio(estudianteAEditar.estatus_envio);
        setMatricula(estudianteAEditar.matricula);
    } 
  }, [estudianteAEditar]);


  const obtenerCarrerasDeCuc = () => {
    axios
      .get(`${apiUrl}cucs/carreras/carreritas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCarreras(response.data.data);
       // console.log("carreras")
      })
      .catch((error) => {
        toast.error("Error al obtener los datos");
      });
  };

  const obtenerLenguasIndigenas = () => {
    axios
      .get(`${apiUrl}lengua/regresa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLenguasIndigenas(response.data.data);
       // console.log("lenguas")
      })
      .catch((error) => {
        toast.error("Error al obtener las lenguas indigenas");
      });
  };

  const obtenerPueblosIndigenas = () => {
    axios
      .get(`${apiUrl}pueblos/regresa`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPueblosIndigenas(response.data.data);
      //  console.log("pueblos")
      })
      .catch((error) => {
        toast.error("Error al obtener los pueblos indigenas");
      });
  };

  

useEffect(()=>{

    obtenerCarrerasDeCuc();
    obtenerLenguasIndigenas();
    obtenerPueblosIndigenas();
},[]);


const handleMostrarComponente = () => {
  setMostrarComponente(true); // Establece el estado para mostrar el componente
};


const handleMostrarBoton = () => {
  setMostrarBoton(false); // Establece el estado para mostrar el componente
};




  const cambiarEstado = (estado) => {
    axios
      .patch(
        `${apiUrl}estado/cambio/${estudianteAEditar.matricula}/${estado}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
      //  console.log('actualizado a enviado');

      })
      .catch((error) => {
        toast.error(error.message);
        console.error('Error al activar el enviado:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();


    // Mostrar ventana modal de confirmación
    setShowConfirmDialog(true);
  };


 

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fecha_nacimiento") {
      const edad = calcularEdad(value);
      setFormData({
        ...formData,
        [name]: value,
        edad: edad, // Aquí establecemos la edad
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };




  const obtenerColonias = (id_colonia) => {
    if (!id_colonia) {
      setColonias([]);
      return;
    }
    axios
      .get(`${apiUrl}cp/${id_colonia}/colonias/municipio/estado`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setColonias(response.data.data.colonias);
        //setCarreraRegistrada(response.data.data);
      })
      .catch((error) => {
        setColonias([]);
      });
  };
 


  

  const handleConfirmSubmit = () => {
    // Enviar formulario
    axios
      .put(`${apiUrl}estudia/${estudianteAEditar.matricula}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        enviarInfo(); // Llamar a enviarInfo después de completar el envío del formulario
      })
      .catch((error) => {
        // Manejo de errores
      });

    // Cerrar la ventana modal después de enviar el formulario
    setShowConfirmDialog(false);
  };

  const handleCancelSubmit = () => {
    // Cancelar el envío del formulario
    setShowConfirmDialog(false);
  };
  
  


  
  return (
    <div className="EscolarPersonale">
      
     
      {estatus_envio === 0 && (
          <div>
           
            <h1 className="estado">INFORMACIÓN SIN ACTUALIZAR</h1>
          </div>
        )}

   {estatus_envio === 1 && (
          <div>
            <h1 className="estado-actualizado">INFORMACIÓN PERSONAL</h1>
          </div>
        )}

        
{estatus_envio === 2 && (
          <div>
           
            <h1 className="estado-actualizado">INFORMACIÓN REVISADA Y APROBADA</h1>
          </div>
        )}


      <form onSubmit={handleSubmit}>
        <div>
          <label>Matricula:</label>
          <label className="info" 
           visible={
            estatus_envio === 1 ||
            estatus_envio === 2 ||
            estatus_envio === 3
          }
          
          >
            {formData.matricula}</label>
        </div>

        <div>
          <label>Nombre:</label>
          <label className="info" >
            {formData.nombre}</label>
        </div>

        <div>
          <label>Apellido Paterno:</label>
          <label className="info" >
            {formData.apellidopaterno}</label>
        </div>

        <div>
          <label>Apellido Materno:</label>
          <label className="info" >
            {formData.apellidomaterno}</label>
        </div>

        <div>
          <label>Fecha Nacimiento:</label>
          <label className="info" >
            {formData.fecha_nacimiento}</label>
        </div>

        <div>
          <label>Edad:</label>
          <label className="info" >
            {formData.edad}</label>
        </div>

      
        <div>
          <label>Sexo:</label>
          <select
            name="sexo"
            value={formData.sexo}
            required
            
          
           readOnly
          >
            <option value="">Seleccione</option>
            <option value="H">Hombre</option>
            <option value="M">Mujer</option>
          </select>
        </div>

        <div>
          <label>Nivel educativo:</label>
          <label className="info" >
            {formData.niveleducativo}</label>
        </div>

       
        <div>
          <label>Telefono:</label>
          <label className="info" >
            {formData.telefono}</label>
        </div>

        <div>
          <label>Tel emergencia:</label>
          <label className="info" >
            {formData.telefono_emergencia}</label>
        </div>

        <div>
          <label>Padecimiento:</label>
          <label className="info" >
            {formData.padecimiento}</label>
        </div>

        <div>
          <label>Discapacidad:</label>
          <label className="info" >
            {formData.discapacidad}</label>
        </div>
       
        <div>
          <label>Regular:</label>
          <label className="info" >
            {formData.regular}</label>
        </div>

        <div>
          <label>Semestre:</label>
          <label className="info" >
            {formData.semestre}</label>
        </div>

      

      
        <div>
          <label>Lengua indigena:</label>
          <SelectInput
          type="text"
            clave={"id_lenguaindigena"}
            name={"lengua_indigena"}
            value={formData.lengua_indigena}
            datos={lenguas_indigenas}
            mostrar={"nombre"}
            disabled={true}
           readOnly
            
          />
        </div>

       

        <div>
          <label>Pueblo indigena:</label>
          <SelectInput
            clave={"id_puebloindigena"}
            name={"pueblo_indigena"}
            value={formData.pueblo_indigena}
            datos={pueblos_indigenas}
            mostrar={"nombre"}
         
            disabled={true}
            
          />
        </div>

        {formData.pueblo_indigena === "2" ? (
          <div>
            <label>Otro pueblo:</label>
            <input
              type="text"
              name="otro_pueblo"
              value={formData.otro_pueblo}
           
          
            />
          </div>
        ) : null}

        <div>
          <label>Programa:</label>
          <SelectInput
            clave={"clave_carrera"}
            name={"clave_carrera"}
            value={formData.clave_carrera}
            datos={carreras}
            mostrar={"nombre"}
         
            disabled={true}
            
          />
        </div>

        <div>
          <label>Codigo Postal:</label>
          <label className="info" >
            {formData.cp}</label>
        </div>

        <div>
          <label>Estado:</label>
          <label className="info" >
            {formData.estado}</label>
        </div>

        <div>
          <label>Municipio:</label>
          <label className="info" >
            {formData.municipio}</label>
        </div>

        <div>
          <label>Colonia:</label>
          <select
            name="colonia"
            value={formData.colonia}
           
            disabled={true}
          >
            <option value="">Seleccione </option>
            {colonias.map((option) => (
              <option key={option.id_colonia} value={option.id_colonia}>
                {option.nombre}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label>Calle:</label>
          <label className="info" >
            {formData.calle}</label>
        </div>

        <div>
          <label>Número exterior:</label>
          <label className="info" >
            {formData.num_exterior}</label>
        </div>

        <div>
          <label>Correo:</label>
          <label className="info" >
            {formData.email}</label>
        </div>

        
      
   {estatus_envio === 1 && (
     <div>
  {!mostrarComponente && mostrarBoton && ( // Mostrar botones solo si mostrarComponente es false
          <div className="botones">
            
           <button 
           onClick={()=> {
            handleMostrarComponente();
            cambiarEstado(3);
           
           }
          }
           
           className="button-cancelare">Rechazar</button>
            
            <button 
           onClick={() => {
            cambiarEstado(2);
            handleMostrarBoton();
           }}
           className="button-afirmar">Aceptar</button>
          </div>
)}

{!mostrarComponente && !mostrarBoton && (
<h2>Información revisada y aprobada</h2>
)}




             {mostrarComponente && <VentanaRevisar
             
             matricula={matricula}
             
             />}
             </div>
         
        )}

        
     
        {estatus_envio.envio === 1 && (
          <div>
            <span className="estado">ESTADO: ENVIADO</span>
          </div>
        )}

        {estatus_envio === 2 && (
          <div>
            <span className="estado">ESTADO: REVISADO Y APROBADO</span>
          </div>
        )}

{estatus_envio === 3 && (
          <div>
            <span className="estado">ESTADO: REVISADO NO APROBADO</span>
          </div>
        )}
      </form>
   
     
   
    </div>




  );
};
