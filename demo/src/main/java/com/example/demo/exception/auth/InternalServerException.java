package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class InternalServerException extends CustomException {
    public InternalServerException(RuntimeException exception){
        super(exception.getMessage(), ErrCode.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
