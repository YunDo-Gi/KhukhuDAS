package com.example.demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class UserSignUp {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    private static void accept(String key, String val) {
        System.out.println(key + " " + val);
    }

    @PostMapping("/api/login")
    public String LoginRequestHandler(@RequestBody HashMap<String,String> body) {

        body.forEach(UserSignUp::accept);
        return body.toString();
    }

    @PostMapping("/api/signup")
    public String SignUpRequestHandler(@RequestBody HashMap<String,String> body) {
        body.forEach(UserSignUp::accept);
        return body.toString();
    }
}
