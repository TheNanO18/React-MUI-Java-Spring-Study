package com.example.login_backend.dto;

import com.example.login_backend.entity.DBConn;

// DTO는 DB와 상관없이 데이터 전송만을 위한 순수한 Java 객체입니다.
public class DBConnDto {

    private String employeeNumber;
    private String userName;
    private String userId;
    private String phoneNumber;
    private String address;

    // Entity의 데이터를 DTO로 복사하는 생성자
    public DBConnDto(DBConn entity) {
        this.employeeNumber = entity.getEmployeeNumber();
        this.userName = entity.getUserName();
        this.userId = entity.getUserId();
        this.phoneNumber = entity.getPhoneNumber();
        this.address = entity.getAddress();
    }

    // JSON 변환을 위해 Getter가 필수입니다.
    public String getEmployeeNumber() { return employeeNumber; }
    public String getUserName() { return userName; }
    public String getUserId() { return userId; }
    public String getPhoneNumber() { return phoneNumber; }
    public String getAddress() { return address; }
}