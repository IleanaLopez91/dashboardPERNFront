import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, {
  loader as productLoader,
  action as updateAvailabilityAction,
} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import EditProduct, {
  loader as EditProductLoader,
  action as EditProductAction,
} from "./views/EditProduct";
import { action as deleteProductAction } from "./components/ProductsDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar",
        element: <EditProduct />,
        loader: EditProductLoader,
        action: EditProductAction,
      },
      {
        path: "productos/:id/eliminar",
        action: deleteProductAction,
      },
    ],
  },
]);
