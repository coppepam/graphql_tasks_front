import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { GuestRoute, PrivateRoute } from "./AuthRoute";
import Main from "./components/Main";
import NotFount from "./components/NotFound";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<GuestRoute children={<SignIn />} />} />
        <Route path="/signup" element={<GuestRoute children={<SignUp />} />} />
        <Route path="/" element={<PrivateRoute children={<Main />} />} />
        <Route path="*" element={<NotFount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
