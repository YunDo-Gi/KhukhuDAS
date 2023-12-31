package com.example.demo.repository;

import com.example.demo.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findByIdAndRoomId(Long commentId, Long roomId);

    Integer countByRoomId(Long roomId);

    List<Comment> findAllByMemberId(Long memberId);
}
