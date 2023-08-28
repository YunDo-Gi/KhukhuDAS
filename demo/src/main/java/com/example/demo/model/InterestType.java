package com.example.demo.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@ToString
@RequiredArgsConstructor
@Getter
public enum InterestType {
    READING("READING"),
    PICTURE("PICTURE"),
    PHOTO("PHOTO"),
    EXCERSICE("EXCERSICE"),
    GAMING("GAMING"),

    ETC("ETC");

    private final String interest;


}
