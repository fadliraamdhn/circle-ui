import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
    const token = localStorage.getItem("isLoggedIn")

    return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute