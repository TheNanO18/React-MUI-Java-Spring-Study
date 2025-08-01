package com.example.login_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.login_backend.entity.DBConn;
import com.example.login_backend.repository.DBRepository;

@Service
public class DBService {

    @Autowired // Spring이 UserRepository의 구현체를 자동으로 주입해 줌
    private DBRepository dbRepository;

    public Page<DBConn> getAllUsers(Pageable pageable) {
        // 모든 사용자 목록을 조회하여 반환
        return dbRepository.findAll(pageable);
    }
}