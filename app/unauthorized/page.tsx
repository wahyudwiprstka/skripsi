"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Unauthorized = () => {
  const router = useRouter();
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <p className="font-semibold text-xl">Access Denied</p>
      <button
        onClick={() => {
          router.back();
        }}
        className="bg-indigo-600 text-white text-sm font-semibold px-10 py-2 rounded-md mt-2 hover:bg-indigo-500 transition duration-150 ease-in-out"
      >
        Go back
      </button>
    </div>
  );
};

export default Unauthorized;
