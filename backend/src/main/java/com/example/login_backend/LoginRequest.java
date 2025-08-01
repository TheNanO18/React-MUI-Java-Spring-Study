package com.example.login_backend;

public class LoginRequest {
    private String id;
    private String password;

    // Getters와 Setters는 Spring이 JSON 데이터를 객체에 담기 위해 필수적으로 사용합니다.
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}