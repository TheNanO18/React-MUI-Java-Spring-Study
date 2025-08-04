package com.example.login_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.login_backend.dto.DBConnDto;
import com.example.login_backend.entity.DBConn;
import com.example.login_backend.repository.DBRepository;
// ...

@Service
public class DBService {

    @Autowired
    private DBRepository dbRepository;

    public Page<DBConnDto> getAllUsers(Pageable pageable) {
        Page<DBConn> entityPage = dbRepository.findAll(pageable);
        return entityPage.map(DBConnDto::new);
    }
}