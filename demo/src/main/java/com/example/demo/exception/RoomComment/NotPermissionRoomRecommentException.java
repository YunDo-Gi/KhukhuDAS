package com.example.demo.exception.RoomComment;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class NotPermissionRoomRecommentException extends CustomException {
    public NotPermissionRoomRecommentException(){
        super(ErrCode.NO_PERMISSION_RECOMMENT, HttpStatus.FORBIDDEN);
    }
}
