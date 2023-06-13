import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/Login";
import SignUp from "./features/SignUp";
import { Provider } from "react-redux";
import store from "./app/store";
import Dashboard from "./features/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />{" "}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />{" "}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
