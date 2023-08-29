package com.example.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
@AllArgsConstructor
public enum ErrCode {
    INVALID_ACCESS_TOKEN("KKDAS000", "엑세스 토큰이 잘못되어 인증이 실패하였습니다.", HttpStatus.FORBIDDEN.value()),
    INVALID_PHONE_NUMBER_PATTERN("KKDAS001", "전화번호 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST.value()),
    INVALID_EMAIL_PATTERN("KKDAS002", "이메일 형식이 잘못되었습니다.", HttpStatus.BAD_REQUEST.value()),
    DUPLICATED_PHONE_NUMBER("KKDAS003", "사용중인 전화번호입니다.", HttpStatus.BAD_REQUEST.value()),
    DUPLICATED_EMAIL("KKDAS004", "사용중인 이메일입니다.", HttpStatus.BAD_REQUEST.value()),
    DUPLICATED_NICKNAME("KKDAS005", "이미 사용중인 닉네임입니다.", HttpStatus.BAD_REQUEST.value()),


    INTERNAL_SERVER_ERROR("KKDAS500", "서버 요청 처리 실패.", HttpStatus.INTERNAL_SERVER_ERROR.value()),
    NO_SUCH_ROOM("KKDAS006","해당 ROOM이 없습니다." , HttpStatus.BAD_REQUEST.value() ),
    NO_PERMISSION_ROOM("KKDAS007", "해당 ROOM을 접근할 권리가 없습니다.", HttpStatus.FORBIDDEN.value());


    private final String code;
    private final String message;
    private final int status;



}
