import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import History from "./pages/History";
import Add from "./pages/Add";
import EditProduct from "./pages/EditProduct";
import Example from "./pages/Example";
import HistoryDetail from "./pages/HistoryDetail";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Testimoni from "./pages/Testimoni";
import ProductById from "./pages/ProductById";
import Register from "./pages/Register";
import Product from "./pages/Product";
const authHome = () => {
  if (!localStorage.access_token) {
      return redirect("/login")
  }
  return null
}

const authLogin = () => {
  if (localStorage.access_token) {
      return redirect("/")
  }
  return null
}

// Definisi rute dengan tipe RouteObject
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    loader: authHome
  },
  {
    path: '/login',
    element: <Login />,
    loader: authLogin
  },
  {
    path: '/register',
    element: <Register />,
    loader: authLogin
  },
  {
    path: '/history',
    element: <History/>,
    loader: authHome
  },
  {
    path: '/add',
    element: <Add/>,
    loader: authHome
  },
  {
    path: '/editProduct/:id',
    element: <EditProduct/>,
    loader: authHome
  },
  {
    path: '/coba',
    element: <Example/>,
    loader: authHome
  },
  {
    path: '/history/:id',
    element: <HistoryDetail/>,
    loader: authHome
  },
  {
    path: '/team',
    element: <Team/>,
    loader: authHome
  },
  {
    path: '/contact',
    element: <Contact/>,
    loader: authHome
  },
  {
    path: '/testimoni',
    element: <Testimoni/>,
    loader: authHome
  },
  {
    path: '/product/:id',
    element: <ProductById/>,
    loader: authHome
  },
  {
    path: '/product',
    element: <Product/>,
    loader: authHome
  },
];

const router = createBrowserRouter(routes);

export default router;
