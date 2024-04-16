"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OrderCard = () => {
  const [items, setItems] = useState(1);
  const minItems = 1;
  const maxItems = 10;

  const isRealNumber = (n: number) => {
    if (n > 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleCount = () => {
    if (items > maxItems) {
      setItems(maxItems);
    } else if (items < minItems) {
      setItems(minItems);
    } else {
      setItems(items);
    }
  };

  const increment = () => {
    if (items < maxItems) {
      setItems(items + 1);
    } else {
      setItems(maxItems);
    }
  };

  const decrement = () => {
    if (items > minItems) {
      setItems(items - 1);
    } else {
      setItems(minItems);
    }
  };

  return (
    <>
      <div className="border px-4 py-7 w-[330px] rounded-lg shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">Atur Pesanan</h2>
        <div className="flex gap-2 items-center mb-4">
          <Image
            src="https://cdn.eraspace.com/media/catalog/product/a/p/apple_iphone_15_pro_max_natural_titanium_1_1_2.jpg"
            width={2000}
            height={2000}
            alt="Product Image"
            className="w-[50px] h-[50px] rounded overflow-hidden object-center object-cover border"
          />
          <p>Variasi Barang</p>
        </div>
        <hr className="mb-4" />
        {/* <div className="flex items-center gap-5 mb-4">
                    <div className="flex justify-between border rounded gap-4 py-2 px-2 w-[7rem]">
                        <button className="w-[1.5rem] rounded hover:bg-indigo-700 hover:text-white transition duration-150 ease-in-out" onClick={() => isRealNumber(items) && setItems(prevItems => prevItems - 1)}>-</button>
                        <p>{items}</p>
                        <button className="w-[1.5rem] rounded hover:bg-indigo-700 hover:text-white transition duration-150 ease-in-out" onClick={() => setItems(prevItems => prevItems + 1)}>+</button>
                    </div>
                    <p>Stok: 5</p>
                </div> */}
        <div className="flex items-center gap-5 mb-4">
          <div
            className="flex justify-between border rounded gap-4 py-2 px-2 w-[7rem]"
            onSubmit={handleCount}
          >
            <button
              className="w-[1.5rem] rounded hover:bg-indigo-700 hover:text-white transition duration-150 ease-in-out"
              onClick={() => decrement()}
            >
              -
            </button>
            <p>{items}</p>
            <button
              className="w-[1.5rem] rounded hover:bg-indigo-700 hover:text-white transition duration-150 ease-in-out"
              onClick={() => increment()}
            >
              +
            </button>
          </div>
          <p>Stok: 5</p>
        </div>
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Subtotal</h2>
          <h1 className="text-xl font-bold text-indigo-700">Rp1500000</h1>
        </div>
        <div className="mb-2">
          <Link href="/keranjang">
            <button className="text-white bg-indigo-700 w-full py-2 rounded-lg">
              + Keranjang
            </button>
          </Link>
        </div>
        <div className="mb-2">
          <Link href="/beli">
            <button className="text-indigo-700 w-full py-2 rounded-lg outline outline-1">
              Beli Langsung
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
