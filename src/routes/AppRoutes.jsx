import { Routes, Route, Navigate } from "react-router-dom";

import App from "../App";
import { Login } from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { Motos } from "../pages/Motos/Motos";
import { Veiculos } from "../pages/Veiculos/Veiculos";
import { PrivateRoute } from '../Componentes/PrivateRoute/PrivateRoute'
import { NotFound } from "../pages/NotFound/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />


      <Route element={<PrivateRoute />}>
        <Route element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/motos" element={<Motos />} />
          <Route path="/veiculos" element={<Veiculos />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/Home" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
