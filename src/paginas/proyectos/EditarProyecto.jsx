import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../../hooks/useProyectos";

import { FormularioProyecto } from "../../components";

export const EditarProyecto = () => {

  const params = useParams();
  const { obtenerProyecto , proyecto , cargando , eliminarProyecto } = useProyectos();

  
  useEffect(()=> {
      obtenerProyecto(params.id);
    },[]);


  const handleClick = () => {
    if(confirm('¿Deseas eliminar este proyecto?')){
        eliminarProyecto(params.id);
    }
  }
    
  const { nombre } = proyecto;


  return (
    cargando ? (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
          </div>
        </div>
      </div>
    )
    :
    (
        <>            
            <div className="flex justify-between">
                <h1 className="font-black text-4xl flex items-center">{nombre}</h1>
                <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6"
                    >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" 
                    />
                    </svg>
                    <button                    
                        className="uppercase font-bold"
                        onClick={handleClick}
                    >Eliminar</button>
                </div>
            </div>
            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>

        </>
    )    
  )
}
