import Button from "@mui/material/Button";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { fetchUser } from "../../context/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Login({ state }) {
  const user = useSelector((state) => state.user);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();
  const handleShowPassword = (e) => {
    e.target.checked ? setPasswordType("text") : setPasswordType("password");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    return dispatch(fetchUser(loginData));
  };
  const handleRegister = () => {
    state.setActivePage("Register");
  };

  return (
    <form className="loginForm" onSubmit={handleLogin}>
      <h1 className="pageTitle">Stock Overflow</h1>
      <h2 className="loginTitle">Sign in</h2>
      <div className="formInputs">
        <input
          type="email"
          placeholder="Email"
          className={"input email " + (user.error ? "error" : "")}
          value={loginData.email}
          required
          autoFocus
          onChange={(e) =>
            setLoginData((oldVal) => {
              return { ...oldVal, email: e.target.value };
            })
          }
        />
        <input
          type={passwordType}
          placeholder="Password"
          className={"input password " + (user.error ? "error" : "")}
          value={loginData.password}
          required
          onChange={(e) =>
            setLoginData((oldVal) => {
              return { ...oldVal, password: e.target.value };
            })
          }
        />
        <div className="sideAction">
          <span className="register" onClick={handleRegister}>
            Register
          </span>
          <label className="showPassword" title="Show Password">
            <Checkbox color="default" onClick={handleShowPassword} />
          </label>
        </div>
      </div>
      <Button
        variant="contained"
        size="large"
        style={{ border: "1px solid black" }}
        type="submit"
      >
        Login
      </Button>
      <span className={user.error ? "showError" : "hide"}>
        {user.errorMessage}
      </span>
    </form>
  );
}

export default Login;
