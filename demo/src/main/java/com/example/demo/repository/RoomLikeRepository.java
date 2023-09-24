package com.example.demo.repository;

import com.example.demo.model.RoomLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomLikeRepository extends JpaRepository<RoomLike, Long > {
    Boolean existsByMemberIdAndRoomId(Long userId, Long roomId);


    Optional<RoomLike> findByRoomIdAndMemberId(Long roomId, Long userId);

    Optional<List<RoomLike>> findAllByRoomId(Long roomId);


    List<RoomLike> findAllByMemberId(Long memberId);
}
