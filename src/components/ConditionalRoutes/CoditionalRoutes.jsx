import { Navigate, Outlet } from 'react-router-dom';

function ConditionalRoutes({ condition, redirectPath = '/' }) {

  return condition
    ? <Outlet />
    : <Navigate to={redirectPath} />
}

export default ConditionalRoutes;
