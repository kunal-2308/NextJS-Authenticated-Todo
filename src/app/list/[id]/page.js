"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ListUser({ params }) {
  let router = useRouter();
  // Unwrap params using React.use
  let { id } = React.use(params);
  const [userDetails, setUserDetails] = useState({});
  const [listData, setList] = useState([]);

  const [inputData, setInput] = useState({
    task: "",
  });

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await axios.get("/api/users/details");
        setUserDetails(response.data.user);
        setList(response.data.user.Notes);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    getDetails();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      var response = await axios.post("/api/users/task", inputData);
      console.log(response.data);
      setInput({ task: "" });
      setList(response.data.user.Notes);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInput((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleLogout = async(e)=>{
    e.preventDefault();
    try {
      let response = await axios.get('/api/users/logout');
      if(response){
        router.push('/login');
        console.log('Logged out successfully');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <div className="main-div-list w-screen flex flex-col justify-center items-center gap-y-10">
        <div className="user-detail-div mt-20">
          <h1 className="font-bold text-xl">{userDetails.userName}'s Todo List</h1>
        </div>
        <div className="div-input section">
          <form onSubmit={handleSubmit} className="flex flex-row gap-x-5">
            <input
              type="text"
              name="task"
              id="task"
              value={inputData.task}
              required
              placeholder="Add your new task..."
              className="px-10 py-3 text-black/65 rounded focus:border-slate-400 focus:border-[1px]"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="text-white font-semibold bg-orange-500 px-3 rounded hover:text-white hover:bg-orange-600"
            >
              Add Task
            </button>
          </form>
        </div>
        <div className="div-task-list bg-slate-200 w-[40%] rounded-xl">
          {listData.map((ele, index) => {
            return (
              <div
                className="div-list-item text-black py-2 border-b-[1px] border-black pl-3"
                key={index}
              >
                <span>{ele}</span>
              </div>
            );
          })}
        </div>
        <div className="div-logout-button">
          <button className="bg-red-600 p-4 rounded-full font-semibold" onClick={handleLogout}>Logout</button>
        </div>
        <Link href='/login'>Login</Link>
      </div>
    </>
  );
}
