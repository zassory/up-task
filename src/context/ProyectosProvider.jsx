import { useState , useEffect , useContext, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos,setProyectos] = useState([]);
    const [alerta,setAlerta] = useState({});

    const mostrarAlerta = alerta => {
        setAlerta(alerta);

        setTimeout(()=> {
            setAlerta({});
        },5000);
    }

    const submitProyecto = async proyecto => {
        console.log(proyecto);
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext;
