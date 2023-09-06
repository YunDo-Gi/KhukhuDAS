package com.example.demo.dto;

import java.time.LocalDateTime;
import java.util.List;

public class RoomCommentResponse {
    private Long commentId;
    private String content;
    private int recommentCount;
    private List<RoomCommentResponse> recomments;
    private AuthenticationResponse user;
    private LocalDateTime createdDate;
}
