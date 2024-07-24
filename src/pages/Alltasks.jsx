import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import { IoIosAddCircle } from "react-icons/io";
import InputData from "../components/InputData";
import axios from "axios";

const Alltasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://taskmanagement-backend-6znq.onrender.com/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });

  return (
    <>
      <div className=" bg-gray-900 ">
        <div className="flex justify-end items-end mb-4">
          <button
            onClick={() => setInputDiv("fixed")}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300"
          >
            <IoIosAddCircle className="text-3xl text-gray-500 hover:text-gray-100" />
          </button>
        </div>
        {Data && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={Data.task}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>

      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
};

export default Alltasks;
