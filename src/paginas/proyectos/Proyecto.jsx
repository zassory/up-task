import { useEffect } from "react";
import { useParams , Link } from "react-router-dom";
import  useProyectos  from "../../hooks/useProyectos";

export const Proyecto = () => {

  const params = useParams();

  const { obtenerProyecto , proyecto , cargando } = useProyectos();

  useEffect( ()=> {
    obtenerProyecto(params.id);
  }, [] );

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
      : (
        <div className="flex justify-between">
          <h1 className="font-black text-4xl">{nombre}</h1>
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" 
            />
            </svg>

            <Link
              to={`/proyectos/editar/${params.id}`}
              className='uppercase font-bold'
            >Editar</Link>
          </div>
        </div>
    )
  )
}
