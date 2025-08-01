package com.example.login_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.login_backend.entity.DBConn;
import com.example.login_backend.service.DBService;

@RestController
@RequestMapping("/api") // 이 컨트롤러의 모든 API는 /api 경로 하위에 위치함
public class DBController {

    @Autowired
    private DBService dbService;

    // React의 fetch 요청 URL과 정확히 일치시켜야 함 ('http://.../api/database')
    @CrossOrigin(origins = "http://localhost:3000") // React 개발 서버의 요청을 허용 (CORS)
    @GetMapping("/database")
    public Page<DBConn> getAllUsers(Pageable pageable) {
        // UserService를 통해 모든 사용자 데이터를 가져와 반환
        // Spring이 List<User>를 JSON 배열로 자동 변환하여 응답해 줌
        return dbService.getAllUsers(pageable);
    }
}