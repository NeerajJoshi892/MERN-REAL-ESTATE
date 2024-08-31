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
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [percentage, setPercentage] = useState(0);
  const [fileUploadErr, setFileUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess,setUpdateSuccess]=  useState(false)
  const dispatch = useDispatch();
  // console.log(formData);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(res);
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          src={formData?.avtar || currentUser.avtar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center cursor-pointer  mt-2"
        />

        <p className="text-sm text-center">
          {fileUploadErr ? (
            <span className="text-red-400">
              Error while uploading image(should be less than 2MB)
            </span>
          ) : percentage > 0 && percentage < 100 ? (
            <span className="text-slate-600">{`Uploading ${percentage}%`}</span>
          ) : percentage === 100 ? (
            <span className="text-green-500">
              {" "}
              Image Successfully uploaded!
            </span>
          ) : null}
        </p>

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          className="border p-3 rounded-bg"
          onChange={handleChange}
          id="username"
        ></input>
        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-bg"
          onChange={handleChange}
          id="emial"
        ></input>
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-bg"
          onChange={handleChange}
          id="password"
        ></input>
        <button disabled ={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 
        disabled:opacity-80"
        >
         {loading ? 'Loading...':'Update'}
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
      <p className="text-red-700 mt-5">{error?error:" "}</p>
      <p className= 'text-green-500 mt-5'>{updateSuccess? 'Updated Successfully':' '}</p>
    </div>
  );
};

export default Profile;
