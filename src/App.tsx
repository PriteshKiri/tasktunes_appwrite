import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/SignIn";
import SignUp from "./features/SignUp";
import { Provider } from "react-redux";
import store from "./app/store";
import Dashboard from "./features/Dashboard";
import ForgetPassword from "./features/ForgetPassword";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />{" "}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route path="/resetpassword" element={<ForgetPassword />} />{" "}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
