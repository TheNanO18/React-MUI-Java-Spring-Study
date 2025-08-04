package com.example.login_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class TableService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // DB에서 직접 모든 테이블 목록을 동적으로 조회하는 메소드
    public List<String> getAvailableTables() {
        // PostgreSQL에서 public 스키마의 모든 테이블 이름을 조회하는 쿼리
        String sql = "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'";
        return jdbcTemplate.queryForList(sql, String.class);
    }

    // 특정 테이블 데이터를 페이징하여 반환하는 메소드
    public Page<Map<String, Object>> getTableData(String tableName, Pageable pageable) {
        // ⚠️ 동적 테이블 이름 사용 시 SQL 인젝션 방지를 위해 간단한 검증 추가
        if (!tableName.matches("^[a-zA-Z0-9_]+$")) {
            throw new IllegalArgumentException("Invalid table name");
        }

        // 1. 페이징을 위한 COUNT 쿼리 실행
        String countSql = "SELECT COUNT(*) FROM " + tableName;
        long total = jdbcTemplate.queryForObject(countSql, Long.class);

        // 2. 실제 데이터를 가져오는 페이징 쿼리 실행
        String dataSql = "SELECT * FROM " + tableName + " LIMIT ? OFFSET ?";
        List<Map<String, Object>> content = jdbcTemplate.queryForList(dataSql, pageable.getPageSize(), pageable.getOffset());

        // 3. 데이터 목록과 페이징 정보를 Page 객체로 만들어 반환
        return new PageImpl<>(content, pageable, total);
    }
}