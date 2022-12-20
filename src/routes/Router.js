import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "../auth/ProtectedRoute";
import { RegisterUser } from "../pages/RegisterUser";
import { AuthProvider } from "../context/authContext";
import { ResetPassword } from "../pages/ResetPassword";
import Layoutdesing from "../Layout/Layoutdesing";
import { Dashboard } from "../pages/Dashboard";
import TableReports from "../components/TableReports";
import TableRegistered from "../components/TableRegistered";
import PerfilCar from "../components/PerfilCar";
import ReportesUso from "../pages/ReportesUso";


const Router = () => {
    return (
        
        <AuthProvider>
        <BrowserRouter>
        <Routes>
            {/* Rutas Publicas */}
            <Route path="/Login" element={<Login />} />
            <Route path="/RegisterUser" element={<RegisterUser />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            
            {/* Rutas Privadas */}
            <Route path="/" element={ <ProtectedRoute> <Layoutdesing /> </ProtectedRoute>  } > 
                <Route path="/Dashboard" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
                <Route path="/Informe" element={ <ProtectedRoute> <ReportesUso /> </ProtectedRoute> } />
                <Route path="/Reportes" element={<ProtectedRoute> <TableReports/> </ProtectedRoute>} />
                <Route path="/VehiculosRegis" element={ <ProtectedRoute> <TableRegistered/> </ProtectedRoute>} />
                <Route path="/PerfilAuto" element={ <ProtectedRoute> <PerfilCar/> </ProtectedRoute>} />
            </Route>

        </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default Router