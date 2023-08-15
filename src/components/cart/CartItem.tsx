import React from "react";

import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  setDecrement,
  setIncremement,
  setRemoveItem,
} from "../../store/CartSlice.ts";

interface Props {
  item: {
    id: number;
    title: string;
    text: string;
    img: string;
    color: string;
    shadow: string;
    price: number;
    cartQuantity: number;
  };
}

const CartItem: React.FC<Props> = ({ item }) => {
  const { id, title, text, img, color, shadow, price, cartQuantity } = item;

  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(
      setRemoveItem({
        id,
        title,
        text,
        img,
        color,
        shadow,
        price,
        cartQuantity,
      })
    );
  };

  const onIncrease = () => {
    dispatch(
      setIncremement({
        id,
        title,
        text,
        img,
        color,
        shadow,
        price,
        cartQuantity,
      })
    );
  };
  const onDecrease = () => {
    dispatch(
      setDecrement({ id, title, text, img, color, shadow, price, cartQuantity })
    );
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex items-center gap-5">
          <div
            className={`bg-gradient-to-b ${color} ${shadow} relative rounded p-3 hover:scale-105 transition-all duration-300 ease-in-out grid items-center `}
          >
            <img
              src={img}
              alt={`img/cartItem/${id}`}
              className="w-36 h-auto object-fill lg:w-28"
            />
            <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded">${price}</div>
          </div>
          <div className="grid items-center gap-4">
            <div className="grid items-center leading-none">
              <h1 className=" font-medium text-lg text-slate-900 lg:text-sm">
                {title}
              </h1>
              <p className="text-sm text-slate-800 lg:text-xs">{text}</p>
            </div>
            <div className="flex items-center justify-around w-full">
              <button
                type="button"
                onClick={onDecrease}

                className="bg-theme-cart rounded w-6 h-6 flex items-center justify-center lg:w-5 lg:h-5 active:scale-90"
              >
                <MinusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
              </button>
              <div className="bg-theme-cart rounded text-white font-medium lg:text-xs w-7 h-6 lg:w-6 lg:h-5 flex items-center justify-center">
                {cartQuantity}
              </div>
              <button
                type="button"
                onClick={onIncrease}
                className="bg-theme-cart rounded w-6 h-6 flex items-center justify-center lg:w-5 lg:h-5 active:scale-90"
              >
                <PlusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-5">
          <div className="grid items-center justify-items-center ">
            <h1 className="text-lg lg:text-base text-slate-900 font-medium">
              ${price * cartQuantity}
            </h1>
          </div>
          <div className="grid items-center justify-items-center ">
            <button
              type="button"
              onClick={onRemoveItem}
              className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center active:scale-90 cursor-pointer justify-items-center"
            >
              <TrashIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
