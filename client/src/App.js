import { useEffect } from "react";
import Signup from "./Components/Signup/Signup";
import { Switch, Route } from "react-router-dom";
import Dashbord from "./Components/Dashbord/Dashbord";
import PrivateRoute from "./Components/router/PrivateRoute";
import { current } from "./JS/actions/user";
import { useDispatch } from "react-redux";

import "./App.css";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(current());
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Signup} />
        <PrivateRoute path="/dashbord" component={Dashbord} />
      </Switch>
      {/* <h2>Authentification</h2> */}
    </div>
  );
}
export default App;
