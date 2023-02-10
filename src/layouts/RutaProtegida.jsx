import { Outlet , Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";

export const RutaProtegida = () => {
 
  const { auth } = useAuth();

  console.log(auth);

  return (
    <>
        {auth._id ? 'Autenticado' : <Navigate to="/" />}
    </>
  )
}
