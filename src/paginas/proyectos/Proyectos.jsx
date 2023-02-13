import useProyectos from "../../hooks/useProyectos";

export const Proyectos = () => {

  const { proyectos } = useProyectos();

  console.log(proyectos);

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {proyectos.length ? <p>Si hay Proyectos</p> : <p className="mt-5 text-center text-gray-600 uppercase">No hay proyectos aún</p>}
      </div>
    </>
  )
}
