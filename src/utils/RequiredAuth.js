import { Navigate } from "react-router-dom";

export const RequiredAuth = ({ children, path, user }) => {
  if (path === "auth") {
    if (user.status) {
      return <Navigate to="/productList" replace />;
    } else {
      return children;
    }
  } else {
    if (user.status) {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  }
};
