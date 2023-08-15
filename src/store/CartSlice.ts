import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

interface CartItem {
  id: number;
  title: string;
  cartQuantity: number;
}

interface CartState {
  cartState: boolean;
  cartItems: CartItem[];
  cartTotal: number;
  cartQuantity: number;
}

const initialState: CartState = {
  cartState: false,
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  cartTotal: 0,
  cartQuantity: 0,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOpenCart: (state, action: PayloadAction<{ cartState: boolean }>) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action: PayloadAction<{ cartState: boolean }>) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemtoCart: (state, action: PayloadAction<CartItem>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`)
      } else {
        const temp: CartItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);

        toast.success(`${action.payload.title} added to cart`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setRemoveItem: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));

      toast.success(`${action.payload.title} Removed from cart`);
    },
    setIncremement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Product QTY Increased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setDecrement: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`Product QTY Decreased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setClearItem: (state) => {
      state.cartItems = [];
      toast.success("Cart cleared");
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    getTotal: (state) => {
      let { totalAmount, totlalQTY } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const sum = price * cartQuantity;
          cartTotal.totalAmount += sum;
          cartTotal.totlalQTY += cartQuantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totlalQTY: 0,
        }
      );
      state.cartTotal = totalAmount;
      state.cartQuantity = totlalQTY;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemtoCart,
  setRemoveItem,
  setIncremement,
  setDecrement,
  setClearItem,
  getTotal,
} = CartSlice.actions;
export const selectCart = (state: { cart: CartState }) => state.cart.cartState;
export const selectCartItems = (state: { cart: CartState }) =>
  state.cart.cartItems;

export const selectTotal = (state:{cart:CartState}) => state.cart.cartTotal  
export const selectQuanty = (state:{cart:CartState}) => state.cart.cartQuantity  

export default CartSlice.reducer;
