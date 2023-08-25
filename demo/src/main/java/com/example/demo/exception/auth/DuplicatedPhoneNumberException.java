package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class DuplicatedPhoneNumberException extends CustomException {
    public DuplicatedPhoneNumberException(){
        super(ErrCode.DUPLICATED_PHONE_NUMBER, HttpStatus.BAD_REQUEST);
    }
}
