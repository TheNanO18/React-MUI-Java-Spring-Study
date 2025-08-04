package com.example.login_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.login_backend.dto.DBConnDto; // DTO 임포트
import com.example.login_backend.service.DBService;

@RestController
@RequestMapping("/api")
public class DBController {

    @Autowired
    private DBService dbService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/database")
    // 반환 타입을 반드시 List<DBConnDto>로 변경해야 합니다.
    public Page<DBConnDto> getAllUsers(Pageable pageable) {
        return dbService.getAllUsers(pageable);
    }
}