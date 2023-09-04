package com.example.demo.dto;

import com.example.demo.exception.ErrCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class ErrResponse {

    private String code;

    private int status;

    private String message;

    public ErrResponse(ErrCode errCode) {
        this.code = errCode.getCode();
        this.message = errCode.getMessage();
        this.status = errCode.getStatus();
    }

}