import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import client from "./apolloCliennt";
import "./App.css";
import { GuestRoute, PrivateRoute } from "./AuthRoute";
import Main from "./components/Main";
import NotFount from "./components/NotFound";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={<GuestRoute children={<SignIn />} />}
          />
          <Route
            path="/signup"
            element={<GuestRoute children={<SignUp />} />}
          />
          <Route path="/" element={<PrivateRoute children={<Main />} />} />
          <Route path="*" element={<NotFount />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
