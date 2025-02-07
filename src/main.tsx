import { FC, PropsWithChildren, StrictMode } from "react";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Tanstack_Jotai from "./Tanstack_Jotai.tsx";
import { useHydrateAtoms } from "jotai/utils";
import { queryClientAtom } from "jotai-tanstack-query";

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
        <li>
          <Link to="/tanstack-jotai">React Query + Jotai 예제</Link>
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
      <Route path="/tanstack-jotai" element={<Tanstack_Jotai />} />
    </Route>
  )
);

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      // staleTime: Infinity,
    },
  },
});

const HydrateAtoms: FC<PropsWithChildren> = ({ children }) => {
  useHydrateAtoms([[queryClientAtom, client]]);
  return children;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HydrateAtoms>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HydrateAtoms>
  </StrictMode>
);
