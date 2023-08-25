package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class InvalidPhoneNumberPatternException extends CustomException {
    public InvalidPhoneNumberPatternException(){
        super(ErrCode.INVALID_PHONE_NUMBER_PATTERN, HttpStatus.BAD_REQUEST);
    }
}
