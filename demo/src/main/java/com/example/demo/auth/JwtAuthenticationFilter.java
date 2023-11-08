package com.example.demo.auth;

import com.example.demo.service.JwtService;
import com.example.demo.service.RedisService;
import com.example.demo.service.UserDetailsServiceImp;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImp userDetailsServiceImp;

    private final RedisService redisService;

    @Override
    protected void doFilterInternal(
            @Nonnull HttpServletRequest request,
            @Nonnull HttpServletResponse response,
            @Nonnull FilterChain filterChain) throws ServletException, IOException {
        //Login 요청이라면 필터체인 패스
        if (request.getRequestURI().equals("/login")) {
            filterChain.doFilter(request, response); // "/login" 요청이 들어오면, 다음 필터 호출
            return; // return으로 이후 현재 필터 진행 막기 (안해주면 아래로 내려가서 계속 필터 진행시킴)
        }


        // 예외 처리 : 들어온 토큰 값이 올바르지 않은 경우 다른 체인으로 넘어감.
        final Optional<String> accessToken = jwtService.extractAccessToken(request);

        log.info("[doFilterInternal] token 값 유효성 체크 시작" + " 토큰 : " + accessToken);
        if (accessToken.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null
                && jwtService.validateToken(accessToken.get()) && !redisService.hasKey(accessToken.get())) {
            String email = jwtService.extractUserEmail(accessToken.get());
            UserDetails userDetails = userDetailsServiceImp.loadUserByUsername(email);
            Authentication authentication = jwtService.getAuthentication(userDetails); //Authentication 객체 생성

            //SecurityContext에 Authentication를 담는다.
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);

        }

        filterChain.doFilter(request, response);
    }
}
