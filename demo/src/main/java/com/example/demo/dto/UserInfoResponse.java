package com.example.demo.dto;

import com.example.demo.model.InterestType;
import lombok.*;

import java.time.LocalDateTime;


@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserInfoResponse {
    private Long userId;

    private String realName;

    private String phoneNumber;

    private InterestType interestType;

    private String email;

    private LocalDateTime createdDateTime;

    private String statusMsg;

}
