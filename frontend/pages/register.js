import React, { useState } from "react";
import { useRouter } from "next/router";
import "../styles/register.css";

export default function RegisterPage() {
const router = useRouter();
const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ENGINEER",
    department: "",
});

const [message, setMessage] = useState(""); // メッセージ状態
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を初期化

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true); // ローディング状態を開始
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("ユーザー登録できました!");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("ユーザー登録中にエラーが発生しました。");
    }
  };

  return (
  <div className="login-container">
    <div className="login-panel">
      <p className="panel-description">
        既に登録済みの方{" "}
        <a href="/login" className="login-link">
          ログイン
        </a>
      </p>
    </div>

    <div className="register-panel">
      <h2 className="panel-title">新規登録</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">名前:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">メールアドレス:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">パスワード:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">ロール:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="form-select"
          >
            <option value="ENGINEER">ENGINEER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">所属部署:</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          {isLoading ? "登録中..." : "登録"}
        </button>
      </form>
      
    </div>
  </div>
);
};




