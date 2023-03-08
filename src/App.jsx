import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout , RutaProtegida } from './layouts';
import { 
    Login , 
    Registrar , 
    OlvidePassword , 
    NuevoPassword , 
    ConfirmarCuenta ,
 } from './paginas/usuarios';

import { 
    Proyectos , 
    NuevoProyecto , 
    Proyecto , 
    EditarProyecto 
  } from './paginas/proyectos';

import { 
    NuevoColaborador 
  } from './paginas/colaborador';

import { AuthProvider , ProyectosProvider } from './context';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos /> }/>
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
              <Route path=":id" element={<Proyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>    
  )
}

export default App
