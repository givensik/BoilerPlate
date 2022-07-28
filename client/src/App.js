import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

//import route path
import LandingPage from './components/view/LandingPage/LandingPage'
import LoginPage from './components/view/LoginPage/LoginPage'
import NavBar from './components/view/NavBar/NavBar'
import RegisterPage from './components/view/RegisterPage/RegisterPage'



export default function App() {
  return (
    <Router>
      <div>
          <Routes>
              <Route path="/login" element = {<LoginPage />}>
            </Route>
            <Route path="/" element = {<LandingPage />}>
            </Route>
            <Route path="/register" element = {<RegisterPage />}>
            </Route>
          </Routes>
      </div>
    </Router>
  );
}
