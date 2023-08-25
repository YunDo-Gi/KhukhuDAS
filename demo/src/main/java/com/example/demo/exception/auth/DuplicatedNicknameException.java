package com.example.demo.exception.auth;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class DuplicatedNicknameException extends CustomException {
    public DuplicatedNicknameException(){
        super(ErrCode.DUPLICATED_NICKNAME, HttpStatus.BAD_REQUEST);
    }
}
