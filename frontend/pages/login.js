import React, { useState } from "react";
import { useRouter } from "next/router";
import "../styles/login.css";

export default function LoginPage() {
const router = useRouter();

const [formData, setFormData] = useState({
email: "",
password: "",
});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        router.push("/dashboard"); // ← これが遷移
        console.log("Token:", data.token); // JWTトークンを確認
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        console.log("Error:", errorData.error);
      }
    } catch (error) {
      setMessage("Failed to fetch: " + error.message);
    }
  };

return ( <div className="login-wrapper">
{/* 左パネル */} 
<div className="login-left"> 
  <div className="left-content"> 
    <h1>Adventure start here</h1> 
    <p>Create an account to join our community</p> 
  </div> 
  </div>
  {/* 右パネル */}
  <div className="login-right">
    <div className="login-card">
      <h2>Hello! Welcome back</h2>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>

<div className="register-link">
  Don't have an account?{" "}
  <span onClick={() => router.push("/register")}>
    Create Account
  </span>
</div>

      </form>

      {message && <p className="error">{message}</p>}
    </div>
  </div>
</div>
);
}
