import Home from "./pages/Home";
import Alltasks from "./pages/Alltasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompleteTasks from "./pages/IncompleteTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAction } from "./store/auth";

function App() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authAction.login());
    } else if (isLoggedIn === false) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="bg-gray-900 text-white h-screen p-2 relative overflow-auto">
        <Routes>
          <Route exact path="/" element={<Home />}>
            <Route index element={<Alltasks />}></Route>
            <Route path="/ImportantTasks" element={<ImportantTasks />}></Route>
            <Route path="/CompletedTasks" element={<CompletedTasks />}></Route>
            <Route
              path="/InCompletedTasks"
              element={<IncompleteTasks />}
            ></Route>
          </Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
