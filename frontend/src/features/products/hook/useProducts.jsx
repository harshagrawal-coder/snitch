import {
  createProducts,
  getAllProducts,
  getAllproductforuser,
  getSingleProductDetail,
} from "../services/product.service.js";
import { useDispatch } from "react-redux";
import { setSellerProducts, setuserProducts } from "../state/productslice.js";
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
  async function handlegetAllProductsForuser() {
    const data = await getAllproductforuser();
    dispatch(setuserProducts(data.products));
  }

  async function handlegetproductbyId(productId) {
    const data = await getSingleProductDetail(productId);
    return data.product;
  }
  return {
    handleCreateProducts,
    handleGetAllProducts,
    handlegetAllProductsForuser,
    handlegetproductbyId,
  };
};
