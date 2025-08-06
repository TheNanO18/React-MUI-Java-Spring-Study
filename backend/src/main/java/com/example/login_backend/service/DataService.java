package com.example.login_backend.service;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class DataService {

    public void processData(List<Map<String, Object>> data) {
        System.out.println("--- React로부터 받은 데이터 ---");
        // 받아온 데이터를 한 행씩 콘솔에 출력 (실제로는 DB 저장 등의 로직 구현)
        data.forEach(row -> {
            System.out.println(row.toString());
        });
        System.out.println("--------------------------");
    }
}