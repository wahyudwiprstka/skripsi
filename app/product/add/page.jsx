"use client";

import Dropzone from "@/app/components/product/Dropzone";
import Variant from "@/app/components/product/Variant";
import { storage } from "@/app/firebase";
import { userHasStore } from "@/libs/userHasStore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";
// import { UploadDropzone } from "@/utils/uploadthing";
// import { ProductCategory } from "@prisma/client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const {data: session, status} = useSession();

  // if(status === "unauthenticated"){
  //   return redirect('http://localhost:3000/unauthorized');
  // }

  // const hasStore = userHasStore(session?.user?.id);
  // console.log("User has store? " + JSON.stringify(hasStore));

  // fetch(`http://localhost:3000/api/store/u/${session?.user?.id}`).then(res => {
  //   res.json().then(res => {
  //     console.log(res);
  //     hasStore = res;
  //   })
  // })

  // if (!hasStore){return redirect('http://localhost:3000/unauthorized')}

  const [name, setName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [store, setStore] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [variants, setVariants] = useState([{ name: "", qty: 0 }]);

  const router = useRouter();

  const toggleLoad = () => {
    setIsLoaded(!isLoaded);
  };

  // Dropzone
  const updateDragActive = (value) => {
    setDragActive(value);
  };

  const updateImages = (value) => {
    setImages(value);
  };

  const updateError = (value) => {
    setError(value);
  };

  const updateImageUrl = (value) => {
    setImageUrls(value);
  }

  // Variants
  const updateVariants = (value) => {
    setVariants(value);
  }

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch("http://localhost:3000/api/product/category");
      const data = await res.json();
      setCategories(data);
      
    };
    
    getCategories();
    
  }, []);

  useEffect(() => {
    // When user is unauthenticated redirect to unauthorized page
    if(status == "unauthenticated"){
      router.push('http://localhost:3000/unauthorized');
    }
    const getUserStore = async () => {
      // if user is authenticated
      if(session && (status !== "loading" && status !== "unauthenticated")) {
        console.log("session " + JSON.stringify(session) + " status " + JSON.stringify(status));
        // Check if user has a store
        const res = await fetch(`http://localhost:3000/api/store/u/${session.user.id}`);
        const data = await res.json();
        // If user doesn't have a store, redirect to unauthorized page
        if(!data){
          router.push('http://localhost:3000/unauthorized');
        }
        // If user has a store, stop the div
        if(data){
          setIsLoaded(true);
          setStore(data);
        }
        console.log(data);
      }
    }
    getUserStore();
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("category: " + category);

    if (!name || !price || !category || !images || !description || !quantity) {
      setError("Field tidak boleh kosong");
      return;
    }

    let parsePrice = parseInt(price);
    let parseQuantity = parseInt(quantity);

    variants.map((variant) => (variant.qty = parseInt(variant.qty)));

    if (Number.isNaN(parsePrice)) {
      setError("Harap masukkan data harga dengan tipe angka");
      return;
    }

    if (Number.isNaN(parseQuantity)) {
      setError("Harap masukkan data quantity dengan tipe angka");
      return;
    }

    console.log("images");
    console.log(images);
    console.log("imageUrls");
    console.log(imageUrls);
    console.log(parsePrice);

    
    try {
      const res = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: parsePrice,
          description,
          category: category,
          quantity: parseQuantity,
          variants: [...variants],
          images: [...imageUrls],
          store: store.id,
        }),
      });

      if (res.ok) {
        setSuccess("Berhasil menambah produk");
        res.json().then((response) => {
          console.log(response.message);
        });
      } else {
        res.json().then((response) => {
          if (!success) {
            console.log(response.error);
          }
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`${!isLoaded ? 'justify-center' : ''} min-h-[100vh] flex flex-col items-center mb-10`}>
      {!isLoaded ? <span className="loading loading-spinner loading-lg"></span> :
      <div className="w-[50rem]">
        {/* Error */}
        <div className="py-10">
          <div
            role="alert"
            className={`alert alert-error bg-red-500 text-white w-[20vw] mx-auto mb-4 shadow ${
              error && !success ? "" : "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>

          {/* Success */}
          <div
            role="alert"
            className={`alert alert-success bg-green-500 text-white w-[20vw] mx-auto mb-4 shadow ${
              success ? "" : "hidden"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        </div>

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8 bg-">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              src="/img/pekutokoo.png"
              width={1000}
              height={1000}
              alt="Logo Pekutatan"
              className={`h-[100px] w-auto mx-auto`}
            />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Tambah Produk
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="/api/user"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div isLoaded={isLoaded} className="rounded-lg">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Produk
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              </div>

              <div isLoaded={isLoaded} className="rounded-lg">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Harga
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="price"
                    name="price"
                    type="text"
                    autoComplete="price"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              </div>

              <div isLoaded={isLoaded} className="rounded-lg">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Quantity (Jumlah Barang)
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="quantity"
                    name="quantity"
                    type="text"
                    autoComplete="quantity"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              </div>

              {/* <div>
                <div className="flex items-center justify-between">
                  <div className="flex w-full justify-between">
                    <label
                      htmlFor="variants"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Varian Produk
                    </label>
                    <label
                      htmlFor="qty"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Qty
                    </label>
                  </div>
                </div>
                {variants.map((variant, index) => (
                  <div key={index}>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="variant"
                        value={variant.name}
                        className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 col-span-4`}
                        onChange={(e) => handleVariantChange(e, index)}
                      />
                      <input
                        type="number"
                        name="qty"
                        autoComplete="quantity"
                        value={variant.qty}
                        className="rounded-md border-0 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 ring-1"
                        onChange={(e) => handleVariantChange(e, index)}
                      />
                    </div>
                    {variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteVariantInput(index)}
                        className="shadow bg-red-600 rounded-md text-white hover:bg-red-500 duration-150 px-4 py-1 mt-2"
                      >
                        -
                      </button>
                    )}
                  </div>
                ))}
                {variants.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleAddVariantInput()}
                    className="mt-2 shadow px-2 py-1 text-white rounded-md bg-blue-600 hover:bg-blue-500 duration-150"
                  >
                    Tambah Varian
                  </button>
                )}
              </div> */}

              <div isLoaded={isLoaded} className="rounded-lg">
                <Variant variants={variants} updateVariants={updateVariants}/>
              </div>

              <div isLoaded={isLoaded} className="rounded-lg">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Kategori Produk
                  </label>
                </div>
                <div className="mt-2">
                  <select
                    id="category"
                    name="category"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" hidden></option>
                    {categories &&
                      categories.map((category) => (
                        <option value={category.id}>
                          {category.name.replace(/(^\w|\s\w)/g, (m) =>
                            m.toUpperCase()
                          )}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              </div>

              <div isLoaded={isLoaded} className="rounded-lg">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Deskripsi Produk
                  </label>
                </div>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    autoComplete="description"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              </div>

              <div isLoaded={isLoaded} className="rounded-lg">
                {imageUrls.length === 0 && (
                  <Dropzone
                    updateImages={updateImages}
                    updateDragActive={updateDragActive}
                    images={images}
                    imageUrls={imageUrls}
                    dragActive={dragActive}
                    updateError={updateError}
                    updateImageUrls={updateImageUrl}
                  />
                )}
                {imageUrls.length > 0 && (
                  <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={`${imageUrls.length} file(s) uploaded successfully`} disabled/>
                )}
              </div>
              
              <div isLoaded={isLoaded} className="rounded-lg">
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default AddProduct;
