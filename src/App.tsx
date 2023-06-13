import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./features/Login";
import SignUp from "./features/SignUp";
import Profile from "./features/Dashboard";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route path="/profile" element={<Profile />} />{" "}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
