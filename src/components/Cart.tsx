import React, { useEffect } from "react";
import CartCnt from "./cart/CartCnt";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getTotal,
  selectCart,
  selectCartItems,
  selectQuanty,
  selectTotal,
  setCloseCart,
} from "../store/CartSlice.ts";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const ifCartState = useSelector(selectCart);

  const cartItems = useSelector(selectCartItems);

  const totalAmount = useSelector(selectTotal);
  const totalQty = useSelector(selectQuanty);

  useEffect(() => {
    dispatch(getTotal());
  }, [cartItems, dispatch]);

  // console.log(cartItems)

  const onCartToggle = () => {
    dispatch(setCloseCart({ cartState: false }));
  };

  return (
    <>
      <div
        className={`fixed top-0  left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[250]
        ${
          ifCartState
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-8"
        }`}
      >
        <div
          className={`blur-effect-theme h-screen max-w-xl w-full absolute right-0`}
        >
          <CartCnt totalQty={totalQty} onCartToggle={onCartToggle} />
          {cartItems.length === 0 ? (
            <CartEmpty onCartToggle={onCartToggle} />
          ) : (
            <div>
              <div className="flex  items-start justify-start flex-col gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3">
                {cartItems?.map((cart: any) => (
                  <CartItem key={cart.id} item={cart} />
                ))}
              </div>
              <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-semibold uppercase">
                    SubTotal
                  </h1>
                  <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
                    $ {totalAmount}
                  </h1>
                </div>
                <div className="grid items-center gap-2">
                  <p className="text-sm font-medium text-center">
                    Taxes and Shipping Will Calculate At Shipping
                  </p>
                  <Link to={"pay"}>
                    <button
                      type="button"
                      onClick={onCartToggle}
                      className="button-theme bg-theme-cart text-white"
                    >
                      Check Out
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
