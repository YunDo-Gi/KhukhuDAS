package com.example.demo.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${secret.key}") // property를 주입시키는 역할, static이면 가져올 수 없다.
    private String secret_key;

    public String extractUserEmail(String jwt) {
        return extractClaims(jwt, Claims::getSubject);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<String, Object>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                //.setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24) )
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String jwt, UserDetails userDetails) {
        String userEmail = extractUserEmail(jwt);
        return userEmail.equals(userDetails.getUsername()); //&& !isTokenExpired(jwt);
    }

//    private boolean isTokenExpired(String jwt) {
//        return extractExpiration(jwt).before(new Date());
//    }

//    private Date extractExpiration(String jwt) {
//        return extractClaims(jwt, Claims::getExpiration);
//    }

    private Claims extractAllClaims(String jwt) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }

    public <T> T extractClaims(String jwt, Function<Claims, T> claimResolver){
        Claims claims = extractAllClaims(jwt);

        return claimResolver.apply(claims); // Function<T,R>은 함수형 인터페이스 T->R, apply()는 우리가 정의
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret_key);

        return Keys.hmacShaKeyFor(keyBytes); // secret_key 인스턴스 생성
    }

}
