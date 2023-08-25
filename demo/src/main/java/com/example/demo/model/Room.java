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


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "room")
    private List<MediaObject> objects = new ArrayList<>();


    @OneToMany(mappedBy = "room")
    private List<RoomLike> roomLikes = new ArrayList<>();

    @OneToMany(mappedBy = "room")
    private List<Comment> comments = new ArrayList<>();


    public void increaseViewCount(){this.view++;}



}
