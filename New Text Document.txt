import { React } from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
