package com.example.demo.exception.RoomComment;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class NotPermissionRoomCommentException extends CustomException {
    public NotPermissionRoomCommentException(){
        super(ErrCode.NO_PERMISSION_COMMENT, HttpStatus.FORBIDDEN);
    }
}
