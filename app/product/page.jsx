"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/app/components/ProductCard";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
// import "@/public/styles/productCard.css";
import Link from "next/link";

const ProductCardListing = () => {
  const [limit, setLimit] = useState(8);
  const [products, setProducts] = useState([]);

  const showMore = () => {
    setLimit((prevValue) => prevValue + 8);
  };

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("http://localhost:3000/api/product");
      const data = await res.json();
      setProducts(data);
      console.log(products);
    };
    getProducts();
  }, []);

  return (
    <div>
      <Navbar></Navbar>

      <div className="product-listing px-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 mx-auto justify-center items-center">
        {products &&
          products
            .slice(0, limit)
            .map((product) => (
              <ProductCard
                imglink={
                  "https://cdn.eraspace.com/media/catalog/product/a/p/apple_iphone_15_pro_max_natural_titanium_1_1_2.jpg"
                }
                imgalt={"Product image"}
                price={product.price}
                rating={5}
                title={product.name}
              />
            ))}
      </div>
      {products.length > limit ? (
        <button
          onClick={showMore}
          className="flex justify-center mx-auto my-6 text-center text-violet-700"
        >
          Lihat Lebih Banyak
        </button>
      ) : null}
    </div>
  );
};

export default ProductCardListing;
