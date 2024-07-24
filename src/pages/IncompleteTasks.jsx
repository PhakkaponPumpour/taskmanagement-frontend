import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import axios from "axios";

const IncompleteTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://taskmanagement-backend-6znq.onrender.com/api/v2/get-incomplete-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });
  return (
    <div>
      <Cards home={"fasle"} data={Data} />
    </div>
  );
};

export default IncompleteTasks;
