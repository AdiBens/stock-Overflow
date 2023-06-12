import "../../assets/loginForm.css";
import BackGroundParticles from "../../components/particles/BackGroundParticles";
import Register from "./register";
import Login from "./login";
import { useState } from "react";

function LoginRegister() {
  const [activePage, setActivePage] = useState("Login");

  return (
    <>
      <BackGroundParticles />
      {activePage === "Login" ? (
        <Login state={{ activePage, setActivePage }} />
      ) : (
        <Register state={{ activePage, setActivePage }} />
      )}
    </>
  );
}

export default LoginRegister;
