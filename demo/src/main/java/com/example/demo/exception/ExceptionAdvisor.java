package com.example.demo.exception;

import com.example.demo.dto.ErrResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvisor {

        @ExceptionHandler(CustomException.class)
        protected ResponseEntity<ErrResponse> handleCustomException(CustomException exception) {
            log.info(exception.getMessage());
            return ResponseEntity
                    .status(exception.getStatus())
                    .body(new ErrResponse(exception.getErrorCode()));
        }

}
