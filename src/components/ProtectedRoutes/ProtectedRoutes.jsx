import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes({ condition, redirectPath = '/' }) {

  return condition
    ? <Outlet />
    : <Navigate to={redirectPath} />
}

export default ProtectedRoutes;