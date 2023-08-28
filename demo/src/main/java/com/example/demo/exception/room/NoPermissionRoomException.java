package com.example.demo.exception.room;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

import javax.naming.NoPermissionException;

public class NoPermissionRoomException extends CustomException {
    public NoPermissionRoomException(){
        super(ErrCode.NO_PERMISSION_ROOM, HttpStatus.FORBIDDEN);
    }
}
