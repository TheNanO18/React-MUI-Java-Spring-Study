package com.example.login_backend.controller;

import com.example.login_backend.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "http://localhost:3000")
public class TableController {

    @Autowired
    private TableService tableService;

    // 테이블 목록 조회 API (List<String> 반환)
    @GetMapping
    public List<String> getTableList() {
        return tableService.getAvailableTables();
    }

    // 특정 테이블 데이터 조회 API (Page 객체 반환)
    @GetMapping("/{tableName}")
    public Page<Map<String, Object>> getTableData(@PathVariable String tableName, Pageable pageable) {
        return tableService.getTableData(tableName, pageable);
    }
}