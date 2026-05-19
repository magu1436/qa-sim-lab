import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import basic from "./routes/basic";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={basic} />
  </StrictMode>,
);
