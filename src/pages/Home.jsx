import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className=" flex flex-col md:flex-row h-full gap-4">
      <div className="w-full md:w-1/6 border border-gray-500 rounded p-4 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6 border border-gray-500 rounded p-4 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
