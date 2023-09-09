package com.example.demo.config;

// 보안 구성 클래스

import com.example.demo.auth.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity // spring security 사용을 어노테이션, 보통 configurer과 함께 사용
@RequiredArgsConstructor
@EnableMethodSecurity
@Slf4j
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;


    private final UserDetailsService userDetailsService;

    private final LoginSuccessHandler loginSuccessHandler;

    private final LoginFailureHandler loginFailureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic(HttpBasicConfigurer -> HttpBasicConfigurer.disable())
                .formLogin(formLogin -> formLogin.disable())
                .csrf(AbstractHttpConfigurer -> AbstractHttpConfigurer.disable())// csrf disable
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()))//headerOpetaion
                .authorizeHttpRequests(
                        req -> req
                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                .requestMatchers(request -> CorsUtils.isPreFlightRequest(request)).permitAll()
                                .anyRequest().permitAll()
                        // 나머지 경로는 전부 승인 받아야함
                )
                .sessionManagement(
                        // 세션을 stateless하게 만든다.
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .cors(httpSecurityCorsConfigurer -> corsConfigurationSource())
                .exceptionHandling(exceptionHanding -> exceptionHanding.accessDeniedHandler(new CustomAccessDeniedHandler()))
                .exceptionHandling(authenticationEntryPoint -> authenticationEntryPoint.authenticationEntryPoint(new CustomAuthenticationEntryPoint()))
                .addFilterAfter(jSONLoginFilter(), LogoutFilter.class)
                .addFilterBefore(jwtAuthFilter, JSONLoginFilter.class); // JWT Token 필터를 id/password 인증 필터 이전에 추가
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    //추후 필터 체인에 커스텀하여 리팩토링 할 예정

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(userDetailsService);
        return new ProviderManager(provider);
    }
    @Bean
    public JSONLoginFilter jSONLoginFilter() throws Exception {
        JSONLoginFilter jSONLoginFilter
                = new JSONLoginFilter();
        jSONLoginFilter.setAuthenticationManager(authenticationManager());
        jSONLoginFilter.setAuthenticationSuccessHandler(loginSuccessHandler);
        jSONLoginFilter.setAuthenticationFailureHandler(loginFailureHandler);
        return jSONLoginFilter;
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:3000", "http://localhost:8080"));
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedMethod("*");

        configuration.addAllowedHeader("authorization");
        configuration.addAllowedHeader("Content-Type");
        configuration.addExposedHeader("Cache-Control");

        configuration.addExposedHeader("authorization");
        configuration.addExposedHeader("Cache-Control");
        configuration.addExposedHeader("Content-Type");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }




}
