package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class InvalidAccessTokenException extends CustomException {

    public InvalidAccessTokenException(){
        super(ErrCode.INVALID_ACCESS_TOKEN, HttpStatus.FORBIDDEN);
    }
}
