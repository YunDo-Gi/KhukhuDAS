package com.example.demo.exception.room;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class AlreadyLikeException extends CustomException {
    public AlreadyLikeException(){
        super(ErrCode.ALREADY_LIKE, HttpStatus.BAD_REQUEST);
    }
}
