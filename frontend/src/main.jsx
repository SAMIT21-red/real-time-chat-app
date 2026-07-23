window.global = window;
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./assets/config/routes";
import { Toaster } from "react-hot-toast";
import "./index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Toaster/>
         <AppRoute/>
    </BrowserRouter>
  </StrictMode>
)