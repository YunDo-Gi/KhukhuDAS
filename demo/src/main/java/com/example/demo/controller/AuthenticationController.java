package com.example.demo.controller;

import com.example.demo.dto.AuthenticationRequest;
import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.service.AuthenticationService;
import com.example.demo.dto.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> register (Principal principal,
                                       @RequestPart String signUpRequest,
                                       @RequestPart(required = false) MultipartFile profileImg,
                                       HttpServletRequest httpServletRequest,
                                       HttpServletResponse httpServletResponse
    ) {
        try{
            log.info("여기 진입");
            return authenticationService.register(principal, signUpRequest, profileImg, httpServletRequest, httpServletResponse);
        }
        catch (Exception e){
            log.info(e.getMessage());
            return ResponseEntity.status(204).build();
        }
    }

}
