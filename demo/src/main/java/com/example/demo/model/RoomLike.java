package com.example.demo.model;

import com.example.demo.model.BaseTime.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RoomLike extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


}
