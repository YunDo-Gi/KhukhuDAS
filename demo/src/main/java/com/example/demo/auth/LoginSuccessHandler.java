package com.example.demo.auth;

import com.example.demo.repository.MemberRepository;
import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.model.Member;
import com.example.demo.service.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        String email = extractUsername(authentication);
        String jwtToken = jwtService.generateToken(email);


        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Authorization", jwtToken);
        Member member = memberRepository.findByEmail(email).get();
        ObjectMapper objectMapper = new ObjectMapper();
        AuthenticationResponse authenticationResponse = new AuthenticationResponse(member.getId(), member.getNickname(), member.getProfileImgURL());
        response.getWriter().write(objectMapper.writeValueAsString(authenticationResponse));


    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}
