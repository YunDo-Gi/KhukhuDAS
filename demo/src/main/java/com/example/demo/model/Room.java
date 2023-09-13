package com.example.demo.model;


import com.example.demo.model.BaseTime.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Room extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 250)
    private String content;

    @Enumerated(EnumType.STRING)
    private InterestType interestType;

    @Builder.Default
    private int view = 0;

//    @Builder.Default
//    private int likeCount = 0;
//
//    @Builder.Default
//    private int commentCount = 0;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @ToString.Exclude
    private Member member;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<MediaObject> objects = new ArrayList<>();


    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<RoomLike> roomLikes = new ArrayList<>();

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Comment> comments = new ArrayList<>();


    public void increaseViewCount(){this.view++;}



}
