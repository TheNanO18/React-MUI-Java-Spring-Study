package com.example.login_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.login_backend.service.DataService;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "http://localhost:3000")
public class DataController {

    @Autowired
    private DataService dataService;

    // React로부터 JSON 배열 데이터를 받기 위한 POST 엔드포인트
    @PostMapping("/send")
    public Map<String, Object> receiveData(@RequestBody List<Map<String, Object>> data) {
        // 데이터를 서비스 계층으로 넘겨 처리
        dataService.processData(data);

        // 성공 응답 반환
        return Map.of("success", true, "message", "데이터를 성공적으로 받았습니다.");
    }
}