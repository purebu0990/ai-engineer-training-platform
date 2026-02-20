package com.example.backend.dto;

public class UserDto {

    private String name;
    private String email;
    private String password; // フロントエンドから受け取る生パスワード
    private String role; // USER / ADMIN
    private String department; // 所属部署（任意）

    // コンストラクタ
    public UserDto() {
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}
