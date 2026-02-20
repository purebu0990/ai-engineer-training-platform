package com.example.backend.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtService {

    private final String SECRET_KEY = "aiengineertrainingplatformhsk1233333787856gdydcvgdvchcvgdsvcgdvcgd65656"; // 秘密鍵（適切に管理してください）

    public String generateToken(Long userId, String email, String name) {

        return Jwts.builder()
                .setSubject(userId.toString()) // ★ userIdを入れる
                .claim("email", email) // emailは追加情報
                .claim("name", name)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
    
    public Long extractUserId(String token) {

        return Long.parseLong(
            Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject()
        );
    }

}
