package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Setter
public class RoomResponse {

    private Long id;

    private String title;

    private String content;

    private String interestType;

    private AuthenticationResponse writer;

    private LocalDateTime createdDateTime;

    private LocalDateTime modifiedDateTime;

    private Integer viewCount;

    private Integer likeCount;

    private Boolean isMyRoom;

    private Boolean isLike;

    private List<String> fileURLs;

    private List<RoomCommentResponse> roomCommentResponses;

}
