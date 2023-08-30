package com.example.demo.controller;

import com.example.demo.dto.AuthenticationRequest;
import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.service.AuthenticationService;
import com.example.demo.dto.RegisterRequest;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
            return authenticationService.register(principal, signUpRequest, profileImg, httpServletRequest, httpServletResponse);
        }
        catch (Exception e){
            log.info(e.getMessage());
            return ResponseEntity.status(204).build();
        }
    }
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws IOException, ServletException {
        authenticationService.logout(httpServletRequest, httpServletResponse);
        return ResponseEntity.ok().build();
    }





    @GetMapping("/validate-phone-number/{phoneNumber}")
    public ResponseEntity<Void> validatePhoneNumber(Principal principal, @PathVariable String phoneNumber) {
        authenticationService.validatePhoneNumber(principal, phoneNumber);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate-email/{email}")
    public ResponseEntity<Void> validateEmail(Principal principal, @PathVariable String email) {
        authenticationService.validateEmail(principal, email);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/validate-nickname/{nickname}")
    public ResponseEntity<Void> validateNickanme(Principal principal, @PathVariable String nickname){
        authenticationService.validateNickname(principal, nickname);
        return ResponseEntity.ok().build();
    }

}
