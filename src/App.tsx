import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./features/SignIn";
import Dashboard from "./features/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/start" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
