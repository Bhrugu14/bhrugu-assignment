import { createContext, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Login from "./Pages/Login";
import ProductList from "./Pages/ProductList";
import Error from "./Pages/404";

import { StoreValue, GetValue, RemoveValue, RequiredAuth } from "./utils";

export const AuthContext = createContext();

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(GetValue("user"));

  const SetToast = (msg) => {
    toast(msg);
  };

  const login = async (data) => {
    setUser({ status: true, value: data });
    console.log("store", { status: true, value: data });
    StoreValue("user", data);
  };

  const logout = () => {
    setUser({ status: false, value: "no data found" });
    RemoveValue("user");
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      SetToast,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequiredAuth user={user} path={"auth"}>
              <Login />
            </RequiredAuth>
          }
        />
        <Route
          exact
          path="/productList"
          element={
            <RequiredAuth user={user} path={"app"}>
              <ProductList />
            </RequiredAuth>
          }
        />
        <Route
          path="*"
          element={
            <RequiredAuth user={user} path={"app"}>
              <Error />
            </RequiredAuth>
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  );
};

export default Main;
