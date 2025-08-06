package com.example.login_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "myapp_user_login_info")
public class DBConn {

    @Id
    @Column(name = "employee_number")
    private String employeeNumber; 

    private String userName;     
    private String userId;       
    private String password;
    private String phoneNumber;   
    private String residentNumber;
    private String mobileCarrier; 
    private String address;

    // --- Getters and Setters ---
    // 필드 이름 변경에 따라 파라미터 이름도 camelCase로 통일
    public String getEmployeeNumber()                    { return employeeNumber; }
    public void setEmployeeNumber(String employeeNumber) { this.employeeNumber = employeeNumber; }
    
    public String getUserName()                          { return userName; }
    public void setUserName(String userName)             { this.userName = userName; }
    
    public String getUserId()                            { return userId; }
    public void setUserId(String userId)                 { this.userId = userId; }
    
    public String getPassword()                          { return password; }
    public void setPassword(String password)             { this.password = password; }
    
    public String getPhoneNumber()                       { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber)       { this.phoneNumber = phoneNumber; }
    
    public String getResidentNumber()                    { return residentNumber; }
    public void setResidentNumber(String residentNumber) { this.residentNumber = residentNumber; }
    
    public String getMobileCarrier()                     { return mobileCarrier; }
    public void setMobileCarrier(String mobileCarrier)   { this.mobileCarrier = mobileCarrier; }
    
    public String getAddress()                           { return address; }
    public void setAddress(String address)               { this.address = address; }
}