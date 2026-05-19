import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import Home from "@/feature/home";

const basic = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
    </>,
  ),
);

export default basic;
