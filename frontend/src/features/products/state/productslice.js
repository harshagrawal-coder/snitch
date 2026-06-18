import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    sellerProducts: [],
    userProducts: [],
  },
  reducers: {
    setSellerProducts: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setuserProducts: (state, action) => {
      state.userProducts = action.payload;
    },
  },
});

export const { setSellerProducts, setuserProducts } = productSlice.actions;
export default productSlice.reducer;
