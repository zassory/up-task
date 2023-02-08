import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { Login , Registrar , OlvidePassword , NuevoPassword , ConfirmarCuenta } from './paginas';

import { AuthProvider } from './context/AuthProvider';

function App() {
  

  return (    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>        
        </Routes>
        </AuthProvider>
    </BrowserRouter>    
  )
}

export default App
