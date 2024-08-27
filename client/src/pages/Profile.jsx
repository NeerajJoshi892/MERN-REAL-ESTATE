import React from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold my-7 text-center">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.avtar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover self-center cursor-pointer  mt-2"
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-bg"
          id="username"
        ></input>
        <input
          type="text"
          placeholder="emial"
          className="border p-3 rounded-bg"
          id="emial"
        ></input>
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-bg"
          id="password"
        ></input>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 
        disabled:opacity-80">
          Update
        </button>
      </form>
<div className="flex justify-between mt-5">
  <span className='text-red-500 cursor-pointer text-center'> Delete Account</span>
  <span className='text-red-500 cursor-pointer text-center'> Sign out</span>
</div>

    </div>
  );
};

export default Profile;
