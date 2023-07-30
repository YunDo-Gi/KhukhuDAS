package com.example.demo.controller;

import org.apache.commons.logging.LogFactory;
import org.apache.logging.log4j.spi.LoggerContextFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
public class UserLogin {
    Logger logger = LoggerFactory.getLogger(this.getClass());

    private static void accept(String key, String val) {
        System.out.println(key + " " + val);
    }

    @PostMapping("/api/login")
    public String getLoginRequest(@RequestBody HashMap<String,String> body) {

        body.forEach(UserLogin::accept);
        return body.toString();
    }
}
