import Button from "@mui/material/Button";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../context/userSlice";

function Register({ state }) {
  const user = useSelector((state) => state.user);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    nickName: "",
  });
  const [passwordType, setPasswordType] = useState("password");
  const dispatch = useDispatch();
  const handleShowPassword = (e) => {
    e.target.checked ? setPasswordType("text") : setPasswordType("password");
  };
  const handleRegister = (e) => {
    e.preventDefault();
    setTimeout(() => dispatch(signUpUser(registerData)), 400);
  };

  const handleLogin = () => {
    state.setActivePage("Login");
  };

  return (
    <form className="loginForm" onSubmit={handleRegister}>
      <h1 className="pageTitle">Stock Overflow</h1>
      <h2 className="loginTitle">Sign Up</h2>
      <div className="formInputs">
        <input
          type="text"
          placeholder="Name"
          className={"input " + (user.error ? "error" : "")}
          value={registerData.nickName}
          maxLength={9}
          required
          onChange={(e) =>
            setRegisterData((oldVal) => {
              return { ...oldVal, nickName: e.target.value };
            })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className={"input email " + (user.error ? "error" : "")}
          value={registerData.email}
          required
          autoFocus
          onChange={(e) =>
            setRegisterData((oldVal) => {
              return { ...oldVal, email: e.target.value };
            })
          }
        />
        <input
          type={passwordType}
          placeholder="Password"
          className={"input password " + (user.error ? "error" : "")}
          value={registerData.password}
          required
          onChange={(e) =>
            setRegisterData((oldVal) => {
              return { ...oldVal, password: e.target.value };
            })
          }
        />
        <div className="sideAction">
          <span className="register" onClick={handleLogin}>
            Login
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
        Register
      </Button>
      <span className={user.error ? "showError" : "hide"}>
        {user.errorMessage}
      </span>
    </form>
  );
}

export default Register;
