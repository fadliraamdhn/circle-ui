import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const token = localStorage.getItem("isLoggedIn")  // atau dari context, sesuai kebutuhan

    return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute