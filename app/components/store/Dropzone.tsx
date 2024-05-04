"use client";

import { storage } from "@/app/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 } from "uuid";

const Dropzone = ({
  updateDragActive,
  updateImage,
  updateError,
  updateImageUrl,
  dragActive,
  image,
  imageUrl,
}: {
  updateDragActive: any;
  updateImage: any;
  updateError: any;
  updateImageUrl: any;
  dragActive: any;
  image: any;
  imageUrl: any;
}) => {
  const [isImageBig, setIsImageBig] = useState(false);

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    updateDragActive(true);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    updateDragActive(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    updateDragActive(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    updateDragActive(false);
    const img = e.dataTransfer.files[0];
    console.log(img);
      if (img.size > 2097152) {
        updateError("Size gambar terlalu besar");
        e.target.value = null;
        return;
      }
    updateImage(img);
  };

  const handleChange = (e: any) => {
    const img = e.target.files[0];
    if (img.size > 2097152) {
      updateError("Size gambar terlalu besar");
      e.target.value = null;
      return;
    }
    updateImage(img);
  };

  const uploadImage = () => {
    console.log(image); 
      const fileName = image.name.split(".").slice(0, -1).join(".");
      const extension = image.name.split(".").slice(1, 2).join(".");
      const imageRef = ref(
        storage,
        `img/store/${fileName}` + "_" + v4() + "." + extension
      );
      uploadBytes(imageRef, image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log("URL: " + url);
          updateImageUrl(url);
        });
      });
  };

  useEffect(() => {
    console.log(image);
  });

  return (
    <div>
      <p className="block text-sm font-medium leading-6 text-gray-900 mb-2">
        Image
      </p>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ${
            dragActive ? "bg-gray-100" : "bg-gray-50"
          }`}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {image !== null ? (
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"    
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 ">
                  Image selected
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 ">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 ">
                  PNG, JPG, or JPEG (Max 2MB)
                </p>
              </div>
            )}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleChange}
            accept="image/jpeg, image/png"
          />
        </label>
      </div>
      <button
        type="button"
        className="bg-indigo-600 rounded-md w-full text-center mt-2 py-1 font-semibold text-sm text-white"
        onClick={uploadImage}
      >
        Upload Image
      </button>
    </div>
  );
};

export default Dropzone;
