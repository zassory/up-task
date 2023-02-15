import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../../hooks/useProyectos";

import { FormularioProyecto } from "../../components";

export const EditarProyecto = () => {

  const params = useParams();
  const { obtenerProyecto , proyecto , cargando } = useProyectos();

  const { nombre } = proyecto;

  useEffect(()=> {
    obtenerProyecto(params.id);
  },[]);

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
            <h1 className="font-black text-4xl flex justify-center">{nombre}</h1>
            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>

        </>
    )    
  )
}
