import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    alert("Login Successful!");

    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button
          onClick={handleLogin}
          style={{
             width: "100%",
              padding: "10px",
              cursor: "pointer",
        }}
      >
           Login
         </button>
      </div>
    </div>
  );
}

export default Login;