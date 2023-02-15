import { useState , useEffect , useContext, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos,setProyectos] = useState([]);
    const [alerta,setAlerta] = useState({});
    const [proyecto,setProyecto] = useState({});
    const [cargando,setCargando] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProyectos = async () => {
            try{
                const token = localStorage.getItem('token');
                if(!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/proyectos', config);
                setProyectos(data);

            }catch(error){
                console.log(error);
            }
        }
        obtenerProyectos();
    }, []);

    const mostrarAlerta = alerta => {
        setAlerta(alerta);

        setTimeout(()=> {
            setAlerta({});
        },5000);
    }

    const submitProyecto = async proyecto => {

        if(proyecto.id){
            editarProyecto(proyecto);
        }else{
            nuevoProyecto(proyecto);
        }

        return;
        
    }

    const editarProyecto = async proyecto => {
        try{
            const token = localStorage.getItem('token');
            if(!token)  return;
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config);
            // Sincronizar el state

            // Mostrar la alerta

            // Redireccionar

        }catch(error){
            console.log('Hable con el administrador');
        }
    }

    const nuevoProyecto = async proyecto => {
        try{
            const token = localStorage.getItem('token');
            if(!token)  return;
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto , config);
            
            setAlerta({
                msg: 'Proyecto Creado Correctamente',
                error: false,
            });

            setProyectos([...proyectos, data]);

            setTimeout(()=> {
                setAlerta({});
                navigate('/proyectos');
            },3000);
            
        }catch(error){
            console.log(error.response);
        }
    }

    const obtenerProyecto = async id => {

        setCargando(true);
        
        try{

            const token = localStorage.getItem('token');
            if(!token)  return;
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data);

        }catch(error){
            console.log(error);
        } finally {
            setCargando(false);
        }

    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
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
