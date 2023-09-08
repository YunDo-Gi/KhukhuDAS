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

    private String writer;

    private LocalDateTime createdDateTime;

    private LocalDateTime modifiedDate;

    private Integer viewCount;

    private Integer likeCount;

    private Boolean isMyRoom;

    private List<String> fileURLs;

}
