package com.example.demo.exception.room;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ErrCode;
import org.springframework.http.HttpStatus;

public class NoSuchRoomException extends CustomException {
    public NoSuchRoomException() {
            super(ErrCode.NO_SUCH_ROOM, HttpStatus.NOT_FOUND);
    }
}
