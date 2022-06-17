import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoute() {
    if (localStorage.getItem('edak-blood-token')) {
        return <Outlet />
    } else {
        return <Navigate to='/' />
    }
}

export default ProtectedRoute;