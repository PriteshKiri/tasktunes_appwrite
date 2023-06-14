import { Route, Routes } from "react-router-dom";
import Login from "./features/SignIn";
import SignUp from "./features/SignUp";

import Dashboard from "./features/Dashboard";
import ForgetPassword from "./features/ForgetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />{" "}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />{" "}
      <Route path="/resetpassword" element={<ForgetPassword />} />{" "}
    </Routes>
  );
}

export default App;
