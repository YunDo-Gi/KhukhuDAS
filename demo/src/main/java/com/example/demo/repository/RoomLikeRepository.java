package com.example.demo.repository;

import com.example.demo.model.RoomLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomLikeRepository extends JpaRepository<RoomLike, Long > {
    Boolean existsByMemberIdAndRoomId(Long userId, Long roomId);


    Optional<RoomLike> findByRoomIdAndMemberId(Long roomId, Long userId);
}
