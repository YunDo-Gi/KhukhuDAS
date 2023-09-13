package com.example.demo.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomsResponse {
    private Long id;

    private String title;

    private String content;

    private String interestType;

    private AuthenticationResponse writer;

    private Integer commentCount;

    private LocalDateTime createdDateTime;

    private LocalDateTime modifiedDateTime;

    private Integer viewCount;

    private Integer likeCount;

    private List<String> fileURLs;

}
