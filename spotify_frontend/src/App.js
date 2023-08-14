import "./output.css";
import LoginComponent from "./routes/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupComponent from "./routes/Signup";

function App() {
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="bye" element={<div className="bg-blue-500">bye</div>} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
