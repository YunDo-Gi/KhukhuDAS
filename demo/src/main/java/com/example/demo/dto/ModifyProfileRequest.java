package com.example.demo.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ModifyProfileRequest {
    private String email;
    private String realName;
    private String job;
    private String password;
    private String phoneNumber;
    private String nickname;
    private int age;
    private Boolean isChangedProfileImg;
}