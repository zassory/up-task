import { useState , useEffect , useContext, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) => {

    const [proyectos,setProyectos] = useState([]);
    const [alerta,setAlerta] = useState({});
    const [proyecto,setProyecto] = useState({});
    const [cargando,setCargando] = useState(false);
    const [modalFormularioTarea,setModalFormularioTarea] = useState(false);
    const [tarea,setTarea] = useState({});
    const [modalEliminarTarea,setModalEliminarTarea] = useState(false);

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
            await editarProyecto(proyecto);
        }else{
            await nuevoProyecto(proyecto);
        }        
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
            
            const proyectosActualizados = proyectos.map(proyectoState => 
                proyectoState._id === data._id ? data : proyectoState);

            setProyectos(proyectosActualizados);
            
            setAlerta({
                msg: 'Proyecto Actualizado Correctamente',
                error: false,
            });

            setTimeout(()=> {
                setAlerta({});
                navigate('/proyectos');
            },3000);

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

    const eliminarProyecto = async id => {
        try{
            const token = localStorage.getItem('token');
            if(!token)  return;
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

            const proyectosActualizados = proyectos.filter(proyectoState => 
                proyectoState._id !== id );

            setProyectos(proyectosActualizados);

            setAlerta({
                msg: data.msg,
                error: false,
            });

            setTimeout(()=> {
                setAlerta({});
                navigate('/proyectos');
            },3000);


        }catch(error){
            console.log('Hable con el administrador');
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({});
    }

    const submitTarea = async tarea => {

        if(tarea?.id){
            await editarTarea(tarea);
        }else{
            await crearTarea(tarea);
        }        
    }

    const crearTarea = async tarea => {
        try{

            const token = localStorage.getItem('token');
            if(!token)  return;
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tareas', tarea , config);        

            //Agregar la tarea al state
            const proyectoActualizado = {...proyecto};
            proyectoActualizado.tareas = [...proyecto.tareas, data];

            setProyecto(proyectoActualizado);
            setAlerta({});
            setModalFormularioTarea(false);

        }catch(error){
            
        }
    }

    const editarTarea = async tarea => {
        try{
            const token = localStorage.getItem('token');
            if(!token)  return;
            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea , config );
            
            // TODO: Actualizar el DOM
            const proyectoActualizado  = {...proyecto};
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState =>
                tareaState._id === data._id ? data : tareaState );
            
            setProyecto(proyectoActualizado);
            setAlerta({});
            setModalFormularioTarea(false);
            
        }catch(error){
            console.log(error);
        }
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea);
        setModalFormularioTarea(true);
    }

    const handleModalEliminarTarea = tarea => {
        setTarea(tarea);
        setModalEliminarTarea(!modalEliminarTarea);
    }

    const eliminarTarea = async () => {
       try{
        const token = localStorage.getItem('token');
        if(!token)  return;
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config );
        setAlerta({
            msg: data.msg,
            error: false
        });
                    
        const proyectoActualizado  = {...proyecto};
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => 
        tareaState._id !== tarea._id);
        
        
        
        setProyecto(proyectoActualizado);            
        setModalEliminarTarea(false);
        setTarea({});
        setTimeout(()=> {
            setAlerta({});
        },3000);
       }catch(error){
        console.log(error);
       }
    }

    const submitColaborador = async email => {
        console.log(email);
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
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
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
