import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  Link,
} from "react-router";
import Swagger from "./Swagger.tsx";
import Tanstack from "./Tanstack.tsx";

const RootLayout = () => {
  return (
    <>
      <ul>
        <li>
          <Link to="/">useState + axios</Link>
        </li>
        <li>
          <Link to="/swagger">Swagger 예제</Link>
        </li>
        <li>
          <Link to="/tanstack">React Query 예제</Link>
        </li>
      </ul>
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<App />} />
      <Route path="/swagger" element={<Swagger />} />
      <Route path="/tanstack" element={<Tanstack />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
