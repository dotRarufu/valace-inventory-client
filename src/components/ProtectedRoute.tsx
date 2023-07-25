import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  children: ReactNode;
  isAllowed: boolean;
  redirectPath: string;
};

const ProtectedRoute = ({ isAllowed, redirectPath, children }: Props) => {
  // console.log('===== protected route =====');
  // console.log('isAllowed: ', isAllowed);
  // console.log('redirectPath: ', redirectPath);
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
