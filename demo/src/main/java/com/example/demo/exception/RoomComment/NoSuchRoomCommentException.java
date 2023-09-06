package com.example.demo.exception.RoomComment;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class NoSuchRoomCommentException extends CustomException {
    public NoSuchRoomCommentException(){
        super(ErrCode.NO_SUCH_COMMENT, HttpStatus.BAD_REQUEST);
    }
}
