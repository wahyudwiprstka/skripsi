"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const AddStore = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [success, setSuccess] = useState("");

  const {data: session, status} = useSession();

  const router = useRouter();

  // Check if user already have a store
  useEffect(() => {
    if(status == 'unauthenticated'){
      setIsLoaded(false);
      router.push('/unauthorized');
    }else if(status == 'authenticated'){
      setIsLoaded(true);
    }
  }, [session, status])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !address || !description || !phonenumber || !image) {
      setError("Field tidak boleh kosong");
      return;
    }

    const res = await fetch("http://localhost:3000/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        address,
        description,
        phonenumber,
        image,
      }),
    });

    if (res.ok) {
      router.push('/store/add/success');
    } else {
      setError("Gagal membuat store");
    }
  };

  return (
    <div className={`${!isLoaded ? 'justify-center' : ''} min-h-[100vh] flex flex-col items-center mb-10`}>
      {!isLoaded ? <span className="loading loading-spinner loading-lg"></span> :
    <div className="min-h-[100vh] flex flex-col items-center">
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
              className="h-[100px] w-auto mx-auto "
            />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Buat Toko
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="/api/user"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nama Toko
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

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="text"
                    autoComplete="address"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="phonenumber"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="text"
                    autoComplete="phonenumber"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Deskripsi Toko
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

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="image"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Image
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="image"
                    name="image"
                    type="text"
                    autoComplete="image"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    }
    </div>
  );
};

export default AddStore;
