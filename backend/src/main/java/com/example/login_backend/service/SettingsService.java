package com.example.login_backend.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.springframework.stereotype.Service;

import com.example.login_backend.dto.DbConnectionRequest;

@Service
public class SettingsService {

    public boolean testDatabaseConnection(DbConnectionRequest request) {
        try (Connection connection = DriverManager.getConnection(request.getUrl(), request.getUsername(), request.getPassword())) {
            return connection.isValid(10); // 10초 동안 유효성 검사
        } catch (SQLException e) {
            System.err.println("DB Connection failed: " + e.getMessage());
            return false;
        }
    }
    
    public void saveDbSettings(DbConnectionRequest request) throws IOException {
        Properties props = new Properties();
        // JDBC URL에서 'jdbc:postgresql://' 부분을 제거하고 저장
        String cleanUrl = request.getUrl().replace("jdbc:postgresql://", "");

        props.setProperty("spring.datasource.url", "jdbc:postgresql://" + cleanUrl);
        props.setProperty("spring.datasource.username", request.getUsername());
        props.setProperty("spring.datasource.password", request.getPassword());
        
        // 기존 다른 설정들도 유지하기 위해 추가 (필요에 따라 추가)
        props.setProperty("spring.jpa.hibernate.ddl-auto", "validate");
        props.setProperty("spring.jpa.show-sql", "true");
        props.setProperty("management.endpoints.web.exposure.include", "restart");
        props.setProperty("management.endpoint.restart.enabled", "true");

        // application.properties 파일 경로를 찾아 덮어쓰기
        String path = Paths.get("src", "main", "resources", "application.properties").toString();
        try (FileOutputStream fos = new FileOutputStream(path)) {
            props.store(fos, "Database settings updated by user");
        }
    }
}