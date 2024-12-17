import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import History from "./pages/History";
import Add from "./pages/Add";
import EditProduct from "./pages/EditProduct";
import Example from "./pages/Example";
import Product from "./pages/Product";

// Definisi rute dengan tipe RouteObject
const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/history',
    element: <History/>
  },
  {
    path: '/add',
    element: <Add/>
  },
  {
    path: '/editProduct/:id',
    element: <EditProduct/>
  },
  {
    path: '/coba',
    element: <Example/>
  },
  {
    path: '/product',
    element: <Product/>
  },
];

const router = createBrowserRouter(routes);

export default router;
