package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum SortType {
    LIKE("LIKE"),
    VIEW("VIEW"),
    CHRONOLOGICAL("CHRONOLOGICAL");


    private String sortType;
}
