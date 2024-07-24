import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authAction } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required you stoopid !");
      } else {
        const response = await axios.post(
          "https://taskmanagement-backend-6znq.onrender.com/api/v1/log-in",
          Data
        );
        setData({ username: "", password: "" });
        console.log(response);
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        dispatch(authAction.login());
        history("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 w-full max-w-sm bg-gray-800 rounded-lg shadow-lg">
        <div className="text-2xl font-semibold text-white mb-6">LOGIN</div>
        <input
          type="username"
          placeholder="Username"
          className="bg-gray-700 text-white px-4 py-2 my-2 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 text-white px-4 py-2 my-2 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex flex-col md:flex-row items-center justify-between mt-4 space-y-4 md:space-y-0 md:space-x-4">
          <button
            className="bg-blue-600 text-xl font-semibold text-white px-7 py-3 rounded hover:bg-blue-700 transition "
            onClick={submit}
          >
            LOGIN
          </button>

          <Link
            to="/signup"
            className="text-gray-400 hover:text-gray-50 text-center"
          >
            Not having an account? Register Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
