package com.example.demo.service;

import com.example.demo.dto.RoomCommentRequest;
import com.example.demo.exception.RoomComment.NoSuchRoomCommentException;
import com.example.demo.exception.RoomComment.NoSuchRoomRecommentException;
import com.example.demo.exception.RoomComment.NotPermissionRoomCommentException;
import com.example.demo.exception.RoomComment.NotPermissionRoomRecommentException;
import com.example.demo.exception.auth.InvalidAccessTokenException;
import com.example.demo.exception.auth.NotFoundMemberException;
import com.example.demo.exception.room.NoSuchRoomException;
import com.example.demo.model.Comment;
import com.example.demo.model.Member;
import com.example.demo.model.Room;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.HashMap;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomCommentService {

    private final MemberRepository memberRepository;

    private final RoomRepository roomRepository;


    private final CommentRepository commentRepository;


    @Transactional
    public ResponseEntity<?> createComment(Long roomId, RoomCommentRequest roomCommentRequest, Principal principal) {
        if(principal == null) throw new InvalidAccessTokenException();
        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        Room room = roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);

        Comment comment = Comment.builder()
                .room(room)
                .member(member)
                .Content(roomCommentRequest.getContent()).build();

        Long CommentId = commentRepository.save(comment).getId();

        HashMap<String, Long> response = new HashMap<>();
        response.put("저장된 CommentId : ", CommentId);
        return new ResponseEntity<HashMap>(response, HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<?> updateComment(Long roomId, Long commentId, RoomCommentRequest roomCommentRequest, Principal principal) {
        if(principal == null) throw new InvalidAccessTokenException();
        memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);
        Comment comment = commentRepository.findByIdAndRoomId(commentId, roomId).orElseThrow(NoSuchRoomCommentException::new);
        if(!comment.getMember().getEmail().equals(principal.getName())) throw new NotPermissionRoomCommentException();
        comment.setContent(roomCommentRequest.getContent());
        HashMap<String, Long> response = new HashMap<>();
        response.put("수정된 CommentId : ", comment.getId());
        return ResponseEntity.ok(response);
    }

    @Transactional
    public ResponseEntity<?> createRecomment(Principal principal, Long roomId, Long commentId, RoomCommentRequest roomCommentRequest) {
        if(principal == null) throw new InvalidAccessTokenException();
        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        Room room = roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);
        Comment comment = commentRepository.findByIdAndRoomId(commentId, roomId).orElseThrow(NoSuchRoomCommentException::new);
        Comment recomment = Comment.builder()
                .room(room)
                .member(member)
                .parent(comment)
                .Content(roomCommentRequest.getContent()).build();

        commentRepository.save(recomment);
        HashMap<String, Long> response = new HashMap<>();
        response.put("저장된 RecommentId : ", recomment.getId());
        return new ResponseEntity<HashMap>(response, HttpStatus.CREATED);

    }

    @Transactional
    public ResponseEntity<?> updateRecomment(Principal principal, Long roomId, Long commentId, Long recommentId, RoomCommentRequest roomCommentRequest) {
        if(principal == null) throw new InvalidAccessTokenException();
        memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);
        Optional<Comment> recomment = commentRepository.findByIdAndRoomId(commentId, roomId).orElseThrow(NoSuchRoomCommentException::new).getChildren().stream().filter(child -> child.getId().equals(recommentId)).findFirst();
        if(recomment.isPresent()){
            if(!recomment.get().getMember().getEmail().equals(principal.getName())) throw new NotPermissionRoomRecommentException();
            recomment.get().setContent(roomCommentRequest.getContent());
            HashMap<String, Long> response = new HashMap<>();
            response.put("수정된 RecommentId : ", recommentId);
            return new ResponseEntity<HashMap>(response, HttpStatus.OK);
        }else{
            throw new NoSuchRoomRecommentException();
        }
    }
}
