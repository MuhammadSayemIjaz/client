import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import CreateUser from "../pages/CreateUser";
import Error from "../pages/Error";
import GetUsers from "../pages/GetUsers";
const Routing = () => {
  return (
    <div>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route exact path="/" element={<CreateUser />}></Route>
            <Route exact path="/getUsers" element={<GetUsers />}></Route>
            <Route path="/*" element={<Error />}></Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default Routing;
