import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../JS/actions/user";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";


const Dashbord = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
       <Button
        variant="contained"
        color="primary"
        color="primary"
        onClick={() => {
          dispatch(logout());
          history.push("/");
        }}
      >
        Logout
      </Button>
      Dashbord
    </div>
  );
};

export default Dashbord;
