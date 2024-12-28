"use client";
import React,{useState} from 'react'
export default function login() {
    let [user,setUser] = React.useState({
        "email":"",
        "password":""
    });
    

    

  return (
    <>
      This is a login page <span>Welcome</span>
    </>
  );
}
