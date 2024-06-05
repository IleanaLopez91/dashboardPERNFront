/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  useNavigate,
  Form,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

const ProductsDetail = ({ product }: ProductDetailProps) => {
  const navigate = useNavigate();
  const isAvailability = product.availability;
  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {isAvailability ? "Disponible" : "No disponible"}
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => {
              navigate(`/productos/${product.id}/editar`);
            }}
            className=" bg-indigo-600 text-white rounded-lg w-full  p-2 uppercase font-bold text-xs text-center"
          >
            Editar
          </button>
          <Form
            className=" w-full"
            method="POST"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("¿Desea eliminarlo?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className=" bg-red-600 text-white rounded-lg w-full  p-2 uppercase font-bold text-xs text-center"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductsDetail;
