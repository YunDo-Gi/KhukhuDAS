package com.example.demo.dto;


import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@Getter
public class MyProfileResponse {

    private Long userId;
    private String realName;
    private String phoneNumber;
    private String nickname;
    private String email;
    private String profileImgURL;
    private LocalDateTime createdDateTime;
    private String job;
    private int age;
}
