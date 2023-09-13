package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class RoomRecommentResponse {
    private Long recommentId;
    private String content;
    private AuthenticationResponse user;
    private LocalDateTime createdDateTime;
    private Boolean isMyComment;
}
