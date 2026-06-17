import axios from "axios";

const productApiInstance = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export async function createProducts(formData) {
  const response = await productApiInstance.post("/product", formData);
  return response.data;
}
export async function getAllProducts() {
  const response = await productApiInstance.get("/product/getall/seller");
  return response.data;
}
