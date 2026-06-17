import { createProducts, getAllProducts } from "../services/product.service.js";
import { useDispatch } from "react-redux";
import { setSellerProducts } from "../state/productslice.js";
export const useProducts = () => {
  const dispatch = useDispatch();
  async function handleCreateProducts(formData) {
    const data = await createProducts(formData);
    return data.products;
  }
  async function handleGetAllProducts() {
    const data = await getAllProducts();
    dispatch(setSellerProducts(data.products));
  }
  return { handleCreateProducts, handleGetAllProducts };
};
