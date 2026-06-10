import { Routes, Route } from "react-router-dom";

import App from "../App";
import { Login } from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { Motos } from "../pages/Motos/Motos";
import { Veiculos } from "../pages/Veiculos/Veiculos";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<App />}>
        <Route path="/home" element={<Home />} />
        <Route path="/motos" element={<Motos />} />
        <Route path="/veiculos" element={<Veiculos />} />
      </Route>
    </Routes>
  );
}
