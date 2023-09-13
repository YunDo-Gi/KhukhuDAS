package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomCommentResponse {
    private Long commentId;
    private String content;
    private int recommentCount;
    private List<RoomRecommentResponse> recomments;
    private AuthenticationResponse user;
    private Boolean isMyComment;
    private LocalDateTime createdDateTime;
}
