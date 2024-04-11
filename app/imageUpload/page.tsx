"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useState } from "react";

const ImageUpload = () => {
  const [imgUrl, setImgUrl] = useState("");

  return (
    <div>
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
          setImgUrl(res[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      {imgUrl.length ? (
        <div>
          <Image
            src={imgUrl}
            alt="Image"
            width={500}
            height={500}
            className="w-52"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ImageUpload;
