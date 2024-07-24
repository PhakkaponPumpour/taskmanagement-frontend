import React, { useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import axios from "axios";

const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `https://taskmanagement-backend-6znq.onrender.com/api/v2/update-complete-tasks/${id}`,
        {},
        { headers }
      );
    } catch (error) {}
  };
  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `https://taskmanagement-backend-6znq.onrender.com/api/v2/update-imp-tasks/${id}`,
        {},
        { headers }
      );
      console.log(response);
    } catch (error) {}
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `https://taskmanagement-backend-6znq.onrender.com/api/v2/delete-tasks/${id}`,
        { headers }
      );
    } catch (error) {}
  };
  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed");
    setUpdatedData({ id: id, title: title, desc: desc });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            key={i}
            className="flex flex-col justify-between bg-gray-800 rounded-xl p-4"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">
                {items.title}
              </h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 flex flex-col md:flex-row items-center">
              <button
                className={`${
                  items.complete === false ? "bg-red-400" : "bg-green-500"
                } p-2 rounded w-full md:w-3/6`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "In Completed"}
              </button>
              <div className="mt-2 md:mt-0 w-full md:w-3/6 text-white text-2xl font-semibold flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important === false ? (
                    <IoIosHeartEmpty />
                  ) : (
                    <IoIosHeart className="text-red-500" />
                  )}
                </button>
                {home === "true" && (
                  <button
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                  >
                    <FiEdit />
                  </button>
                )}
                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center text-gray-400 bg-gray-800 rounded-xl p-4 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoIosAddCircle className="text-4xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
