'use client'

import React, { useState } from 'react'
import {storage} from "@/app/firebase"
import {getDownloadURL, ref, uploadBytes, uploadBytesResumable} from "firebase/storage"
import {v4} from "uuid"

const UploadFile = () => {
  const [imageUpload, setImageUpload] = useState([]);

  const handleChange = (e) => {
      const filelist = e.target.files;
      setImageUpload([...imageUpload, ...filelist]);
  }

  const uploadImage = (e) => {
    e.preventDefault();
    if(imageUpload == null) return;
    console.log(imageUpload);
    // imageUpload.forEach(image => {
    //   const fileName = image.name.split('.').slice(0, -1).join('.')
    //   const imageRef = ref(storage, `test/${fileName + '_' + v4()}`)
    //   uploadBytes(imageRef, imageUpload).then(() => {
    //     alert('Image uploaded successfully');
    //   })
    // });
    imageUpload.forEach((image, index) => {
      const fileName = image.name.split('.').slice(0, -1).join('.')
      const extension = image.name.split('.').slice(1, 2).join('.')
      const imageRef = ref(storage, `test/${fileName + '_' + v4() + '.' + extension}`)
      uploadBytes(imageRef, image).then((snapshot) => {
        alert('Image uploaded successfully')
        getDownloadURL(snapshot.ref).then((url) => {
          console.log('You can download the image at: ' + url);
        })
      })
      // const uploadTask = uploadBytesResumable(imageRef, image);
    //   uploadTask.on('state_changed', (snapshot) => {
    //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     console.log("Upload is " + progress + "% done");
    //     switch(snapshot.state){
    //       case 'paused':
    //         console.log("Upload is paused");
    //         break;
    //       case 'running':
    //         console.log("Upload is running");
    //         break;
    //     }
    //   }, (error) => {
    //     switch(error.code){
    //       case 'storage/unauthorized':
    //         console.log("User is unauthorized");
    //         break;
    //       case 'storage/canceled':
    //         console.log("Upload is canceled");
    //         break;
    //       case 'storage/unknown':
    //         console.log("Unknwon error occurred " + error.message);
    //         break;
    //     }
    //   }, () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       console.log("Download URL " + downloadURL);
    //     })
    //   })
    })
  }
  return (
    <div>
      <h1>Upload your files</h1>

      <form action="">
        <input type="file" onChange={handleChange} accept='image/jpeg, image/png' multiple/> 
        <button onClick={uploadImage}>Upload Image</button>
      </form>
    </div>
  )
}

export default UploadFile