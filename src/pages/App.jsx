import React from "react";
import {
  SignUp,
  LogIn,
  Dashboard,
  PrivateRoute,
  ForgotPassword,
  UpdateProfile,
} from "../components";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute
                exact
                path="/update-profile"
                component={UpdateProfile}
              />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={LogIn} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
