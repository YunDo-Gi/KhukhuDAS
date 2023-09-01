package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class NotFoundMemberException extends CustomException {
    public NotFoundMemberException(){
        super(ErrCode.NOT_FOUND_MEMBER, HttpStatus.NOT_FOUND);
    }
}
