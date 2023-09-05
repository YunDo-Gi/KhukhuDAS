package com.example.demo.exception.room;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class NoExistLikeException extends CustomException {
    public NoExistLikeException(){
        super(ErrCode.NO_EXIST_LIKE, HttpStatus.BAD_REQUEST);
    }
}
