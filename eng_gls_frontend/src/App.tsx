import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import MainGls from './GlsComponents/MainGlsComponent';
import SignIn from './SignComponents/SignIn';
import SignUp from './SignComponents/SignUp';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/signup">
            <div className="base">
              <SignUp/>
            </div>
          </Route>
          <Route exact path="/signin">
            <div className="base">
              <SignIn/>
            </div>
          </Route>
          <Route exact path="/glossaries">
            <div className="base">
              <MainGls/>
            </div>
          </Route>
          <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Redirect to="/signin" />
                    )

                }}
              />
        </Switch>
      </Router>
  );
}

export default App;
