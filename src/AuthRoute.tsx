import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export const PrivateRoute = ({ children }: Props) => {
  const authInfo = useAuth();

  if (!authInfo.checked) {
    return <div>Loading...</div>;
  }

  return authInfo.isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

export const GuestRoute = ({ children }: Props) => {
  const authInfo = useAuth();

  if (!authInfo.checked) {
    return <div>Loading...</div>;
  }

  return !authInfo.isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};
