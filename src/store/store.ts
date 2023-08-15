import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.ts";
import { productsApi } from "../api/products.ts";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware);
  },
});
export default store;
