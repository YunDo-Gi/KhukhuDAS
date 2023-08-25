package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class InvalidEmailPatternException extends CustomException {
    public InvalidEmailPatternException(){
        super(ErrCode.INVALID_EMAIL_PATTERN, HttpStatus.BAD_REQUEST);
    }
}
