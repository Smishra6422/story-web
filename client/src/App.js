import React from "react";
import "./App.css";
import Home from "./components/Home/Home.component";
import Navbar from "./components/Navbar/Navbar.component";
import { Switch, Route } from "react-router-dom";
import SignUp from "./components/Signup/Signup.component";
import SignIn from "./components/Signin/Signin.component";
import PrivateRoute from "./components/Auth/PrivateRoutes";
import AddStory from "./components/AddStory/AddStory.component";
import Story from "./components/Story/Story.component";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <PrivateRoute exact path="/addstory" component={AddStory} />
        <PrivateRoute exact path="/story/:userId/:storyId" component={Story} />
      </Switch>
    </div>
  );
}

export default App;
