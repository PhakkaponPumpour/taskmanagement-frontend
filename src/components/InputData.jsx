import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv, UpdatedData, setUpdatedData }) => {
  
  ///state to hold the current form input values, initialized as an object with empty title and desc fields.
  const [Data, setData] = useState({ title: "", desc: "" });

  //s hook runs whenever the UpdatedData prop changes. 
  //It updates the Data state with the title and description of the task to be updated.
  useEffect(() => {
    setData({ title: UpdatedData.title, desc: UpdatedData.desc });
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  //function handles changes to the input fields (title and desc). It updates the Data state with the new values.

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  ///sends a POST request to the backend to create a new task using the input values in Data.
  const submitData = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("Please fill all the fields");
    } else {
      await axios.post(
        "https://taskmanagement-backend-6znq.onrender.com/api/v2/create-task",
        Data,
        {
          headers,
        }
      );
      setData({ title: "", desc: "" });
      setInputDiv("hidden"); //// hides the input form after submission
    }
  };

  // sends a PUT request to the backend with the updated task data.
  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("Please fill all the fields");
    } else {
      await axios.put(
        `https://taskmanagement-backend-6znq.onrender.com/api/v2/update-tasks/${UpdatedData.id}`,
        Data,
        {
          headers,
        }
      );
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
      });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div
        className={`${InputDiv} fixed top-0 left-0 bg-gray-500 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-full  max-w-md bg-gray-900 p-6 rounded-lg relative">
          <div className="flex justify-end">
            <button
              className="text-3xl"
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  id: "",
                  title: "",
                  desc: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <IoIosClose />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3 text-white"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="6"
            placeholder="Description"
            className="px-2 py-2 rounded w-full bg-gray-700 my-3 text-white"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {UpdatedData.id === "" ? (
            <button
              className="px-4 py-2 bg-blue-600 rounded text-white text-xl font-semibold hover:bg-blue-500 transition"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 rounded text-white text-xl font-semibold hover:bg-blue-500 transition"
              onClick={UpdateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
