package com.example.login_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.login_backend.entity.DBConn;

@Repository
public interface DBRepository extends JpaRepository<DBConn, String> {
    // JpaRepository를 상속받는 것만으로 기본적인 DB 작업 메소드
    // (findAll(), findById(), save(), delete() 등)가 자동으로 생성됩니다.
    // 복잡한 쿼리가 필요할 경우 여기에 메소드를 추가합니다.
}