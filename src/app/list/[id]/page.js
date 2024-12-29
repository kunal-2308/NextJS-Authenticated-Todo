"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ListUser({ params }) {
  // Unwrap params using React.use
  let {id} = React.use(params);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get("/api/users/details");
        setUserDetails(response.data.user);
        console.log(response.data.user.email);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    getDetails();

  },[]);

  return (
    <>
      {/* <div className="div-center flex justify-center items-center mt-20">
        <span className="text-2xl bg-orange-500 rounded p-4">{id}</span>
      </div>
      <div className="div-2">
      <span>{userDetails.email}</span>
      </div> */}
      
    </>
  );
}
