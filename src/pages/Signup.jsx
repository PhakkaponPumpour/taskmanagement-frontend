import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {

  //redirects users to the home page if they are already logged in
  const history = useNavigate();

  /// If the user is logged in, they are redirected to the home page.
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }

  ///Data: Manages the form inputs for username, email, and password.
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  //It checks if all required fields are filled, 
  //sends a POST request to the signup API, and handles the response.
  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required you stoopid !");
      } else {
        const response = await axios.post(
          "https://taskmanagement-backend-6znq.onrender.com/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        alert(response.data.message);
        history("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="p-6 w-full max-w-md bg-gray-800 rounded-lg shadow-lg">
        <div className="text-2xl font-semibold text-white mb-4 ">REGISTER</div>
        <input
          type="username"
          placeholder="Username"
          className="bg-gray-700 text-white px-4 py-2 my-2 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-700 text-white px-4 py-2 my-2 w-full rounded"
          name="email"
          value={Data.email}
          required
          onChange={change}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 px-3 py-3 my-3 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex items-center justify-between space-x-4">
          <button
            className="bg-blue-600 text-xl font-semibold text-white px-6 py-2 rounded hover:bg-blue-700 transition "
            onClick={submit}
          >
            REGISTER
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-50">
            Already having an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
