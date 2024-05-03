import Navbar from "@/app/components/Navbar";
import OrderCard from "@/app/components/product/OrderCard";
import React, { useEffect, useState } from "react";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch('http://localhost:3000/api/product');
    };
  });

  return <div className="home flex justify-center flex-col items-center">
  <Navbar></Navbar>
  <div className="mt-2 content w-full flex flex-col">
    <div className="justify-between flex flex-wrap h-[200vh]">
      <div className="sticky self-start top-[5.5rem]">
        {/* <ProductImages></ProductImages> */}
      </div>
      <div className="w-[40vw]">
        <h1 className="text-2xl font-semibold text-left">Nama Barang</h1>
        <p className="mb-2">
          Terjual <span className="text-slate-600">100+</span> •{" "}
          <svg
            className="h-5 w-5 text-yellow-300 inline"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>{" "}
          4.9 <span className="text-slate-600">(100 Rating)</span> • Diskusi{" "}
          <span className="text-slate-600">(2)</span>
        </p>
        <h2 className="font-semibold text-xl">Rp2.000.000</h2>
        <hr className="my-2" />
        <p>
          <span className="text-slate-600">Kondisi:</span> Baru
        </p>
        <p className="mb-2">
          <span className="text-slate-600">Min. Pemesanan:</span> 1 Buah
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          cupiditate beatae repudiandae ea ullam ducimus debitis qui labore
          veritatis a excepturi asperiores molestiae quae veniam quidem
          minima, error nesciunt. Tempore voluptate sit, assumenda nihil
          eius eveniet error voluptas unde aliquid? <br /> Lorem, ipsum
          dolor sit amet consectetur adipisicing elit. Tenetur porro non
          nostrum distinctio alias sed iste a tempora adipisci animi
          aperiam, amet eligendi perferendis eaque ducimus ipsam quasi quia
          possimus quae maiores error asperiores quod. Sint placeat pariatur
          aspernatur repudiandae, omnis, accusamus ducimus voluptas saepe
          similique, inventore optio. Distinctio rerum ipsam dolorum eveniet
          doloremque accusantium repellat aliquid repudiandae adipisci quod
          nam quidem a quis, sapiente dolore est earum magni quae?
        </p>
      </div>
      <div className="sticky self-start top-[5.5rem]">
        <OrderCard></OrderCard>
      </div>
    </div>
  </div>
</div>;
};

export default ProductDetail;
