import { useEffect } from "react";
import useProyectos from "../../hooks/useProyectos";
import { Alerta , PreviewProyecto } from "../../components";
import io from 'socket.io-client';

let socket;

export const Proyectos = () => {

  const { proyectos , alerta } = useProyectos();

  useEffect(()=> {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    //socket.emit('prueba','Nicolas');    ;
    socket.emit('prueba',proyectos);
  },[]);

  const { msg } = alerta;
  
  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      { msg && <Alerta alerta={alerta} /> }

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
          : 
          <p className="mt-5 text-center text-gray-600 uppercase p-5">No hay proyectos aún</p>}
      </div>
    </>
  )
}
