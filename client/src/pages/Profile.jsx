import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [percentage, setPercentage] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(Math.round(progress));
      },
      (error) => {
        // Error function
        setFileUploadErr(true);
        console.error("File upload failed: ", error);
      },
      () => {
        // Complete function
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: downloadURL,
          }));
        });
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          hidden
          accept="image/.*"
          ref={fileRef}
        ></input>

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avtar|| currentUser.avtar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center cursor-pointer  mt-2"
        />

        <p className="text-sm text-center">
          {fileUploadErr ? (
            <span className="text-red-400">Error while uploading image(should be less than 2MB)</span>
          ) : percentage > 0 && percentage < 100 ? (
            <span className="text-slate-600">{`Uploading ${percentage}%`}</span>
          ) : percentage === 100 ? (
            <span className="text-green-500"> Image Successfully uploaded!</span>
          ) : null}
        </p>

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-bg"
          id="username"
        ></input>
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-bg"
          id="emial"
        ></input>
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-bg"
          id="password"
        ></input>
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 
        disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer text-center">
          {" "}
          Delete Account
        </span>
        <span className="text-red-500 cursor-pointer text-center">
          {" "}
          Sign out
        </span>
      </div>
    </div>
  );
};

export default Profile;
