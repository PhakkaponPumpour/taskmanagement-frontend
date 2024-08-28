import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdOutlineLabelImportant } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { MdOutlineAutoStories } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom"; //navigate through different routes.
import { useDispatch } from "react-redux"; // dispatch actions to the Redux store.
import { authAction } from "../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  //data array 
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icon: <MdOutlineLabelImportant />,
      link: "/ImportantTasks",
    },
    {
      title: "Completed tasks",
      icon: <SiGoogletasks />,
      link: "/CompletedTasks",
    },
    {
      title: "Incompleted tasks",
      icon: <MdOutlineAutoStories />,
      link: "/IncompletedTasks",
    },
  ];

  //tasks fetched from the backend.
  const [Data, setData] = useState();

  //logout action to Redux (assuming authAction.logout() is an action creator that handles user logout).
  //Clears authentication-related data from localStorage.
  //Navigates user to the login page.
  const logout = () => {
    dispatch(authAction.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/login");
  };
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  //Fetches all tasks from the backend
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://taskmanagement-backend-6znq.onrender.com/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data); //and updates the Data state with the response.
    };
    fetch();
  }, []);

  return (
    <div className=" p-4 space-y-4 md:space-y-6">
      {Data && (
        <div className="mb-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-white truncate">
            {Data.username}
          </h2>
          <h4 className="my-1 text-gray-400 truncate text-sm md:text-base lg:text-lg">
            {Data.email}
          </h4>
          <hr className="my-2 border-gray-600" />
        </div>
      )}

      <div className="space-y-2">
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="flex items-center p-2 rounded hover:bg-gray-600 transition-all truncate text-sm md:text-base lg:text-lg"
          >
            {items.icon}&nbsp;{items.title}
          </Link>
        ))}
      </div>

      <div>
        <button
          className="bg-gray-600 text-white w-full p-2 rounded hover:bg-gray-700 transition-all text-sm md:text-base lg:text-lg"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
