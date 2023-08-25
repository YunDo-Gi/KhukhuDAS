package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class DuplicatedEmailException extends CustomException {
    public DuplicatedEmailException(){
        super(ErrCode.DUPLICATED_EMAIL, HttpStatus.BAD_REQUEST);
    }
}
