package com.example.demo.exception.RoomComment;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class NoSuchRoomRecommentException extends CustomException {
    public NoSuchRoomRecommentException(){
        super(ErrCode.NO_SUCH_RECOMMENT, HttpStatus.BAD_REQUEST);
    }
}
