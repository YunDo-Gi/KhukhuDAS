package com.example.demo.controller;

import com.example.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Slf4j
public class UserController {

    private final UserService userService;


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal){
        return userService.getMyProfile(principal);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/profile")
    public ResponseEntity<?> modifyProfile (Principal principal,
                                       @RequestPart String updateRequest,
                                       @RequestPart(required = false) MultipartFile profileImg,
                                       HttpServletRequest httpServletRequest,
                                       HttpServletResponse httpServletResponse
    ) {
        try{
            return userService.modify(principal, updateRequest, profileImg, httpServletRequest, httpServletResponse);
        }
        catch (Exception e){
            log.info(e.getMessage());
            return ResponseEntity.status(204).build();
        }
    }






}
