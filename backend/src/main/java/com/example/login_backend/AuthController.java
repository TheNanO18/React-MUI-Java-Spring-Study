package com.example.login_backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController // 이 클래스가 REST API 요청을 처리하는 컨트롤러임을 나타냅니다.
public class AuthController {

    // React 앱(http://localhost:3000 등)에서 오는 요청을 허용합니다.
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login") // "/login" 경로로 오는 POST 요청을 이 메소드가 처리합니다.
    public boolean handleLogin(@RequestBody LoginRequest loginRequest) {
        // @RequestBody: React가 보낸 JSON 데이터를 LoginRequest 객체로 자동 변환해줍니다.

        String id       = loginRequest.getId();
        String password = loginRequest.getPassword();

        // 서버 콘솔에 수신된 ID를 출력하여 확인
        System.out.println("서버가 받은 ID: " + id);

        // ID는 "test"이고, 비밀번호는 "1234"인지 확인합니다.
        // ⚠️ 중요: 문자열 비교는 '=='가 아닌 '.equals()'를 사용해야 합니다.
        if ("test".equals(id) && "1234".equals(password)) {
            System.out.println("로그인 성공");
            return true; // 일치하면 true 반환
        } else {
            System.out.println("로그인 실패");
            return false; // 일치하지 않으면 false 반환
        }
    }
}