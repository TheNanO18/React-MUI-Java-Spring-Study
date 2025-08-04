package com.example.login_backend.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.login_backend.dto.DbConnectionRequest;
import com.example.login_backend.service.SettingsService;

@RestController
@RequestMapping("/api/settings")
public class DBConnectsetting {

    @Autowired
    private SettingsService settingsService;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/test-connection")
    public Map<String, Object> testConnection(@RequestBody DbConnectionRequest request) {
        boolean isSuccess = settingsService.testDatabaseConnection(request);
        if (isSuccess) {
            return Map.of("success", true, "message", "데이터베이스 연결에 성공했습니다!");
        } else {
            return Map.of("success", false, "message", "연결 실패: 정보를 다시 확인해주세요.");
        }
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/save")
    public Map<String, Object> saveSettings(@RequestBody DbConnectionRequest request) {
        try {
            settingsService.saveDbSettings(request);
            return Map.of("success", true, "message", "설정이 저장되었습니다. 앱을 재시작하세요.");
        } catch (IOException e) {
            return Map.of("success", false, "message", "설정 파일 저장에 실패했습니다.");
        }
    }
}