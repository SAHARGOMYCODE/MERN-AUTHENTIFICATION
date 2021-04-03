import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../JS/actions/user";
import { useHistory } from "react-router-dom";

const Dashbord = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(logout());
          history.push("/");
        }}
      >
        Logout
      </button>
      Dashbord
    </div>
  );
};

export default Dashbord;
