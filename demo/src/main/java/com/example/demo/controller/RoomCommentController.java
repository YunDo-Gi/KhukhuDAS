package com.example.demo.controller;

import com.example.demo.dto.RoomCommentRequest;
import com.example.demo.service.RoomCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/")
public class RoomCommentController {

    private final RoomCommentService roomCommentService;


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/room/{roomId}/comment")
    public ResponseEntity<?> createComment(Principal principal, @PathVariable(name = "roomId")Long roomId, @RequestBody RoomCommentRequest roomCommentRequest){
        return roomCommentService.createComment(roomId, roomCommentRequest, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/room/{roomId}/comment/{commentId}")
    public ResponseEntity<?> updateComment(Principal principal, @PathVariable(name = "roomId")Long roomId, @PathVariable(name = "commentId")Long commentId, @RequestBody RoomCommentRequest roomCommentRequest){
        return roomCommentService.updateComment(roomId, commentId, roomCommentRequest, principal);
    }


    @PreAuthorize("isAuthenticated()")
    @PostMapping("/room/{roomId}/comment/{commentId}/recomment")
    public ResponseEntity<?> createRecomment(Principal principal, @PathVariable("roomId") Long roomId, @PathVariable("commentId") Long commentId, @RequestBody RoomCommentRequest roomCommentRequest){
        return roomCommentService.createRecomment(principal, roomId, commentId, roomCommentRequest);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/room/{roomId}/comment/{commentId}/recomment/{recommentId}")
    public ResponseEntity<?> updateRecomment(Principal principal, @PathVariable("roomId") Long roomId, @PathVariable("commentId") Long commentId, @PathVariable("recommentId") Long recommentId , @RequestBody RoomCommentRequest roomCommentRequest){
        return roomCommentService.updateRecomment(principal, roomId, commentId, recommentId, roomCommentRequest);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/room/{roomId}/comment/{commentId}/recomment/{recommentId}")
    public ResponseEntity<?> removeRecomment(Principal principal, @PathVariable("roomId") Long roomId, @PathVariable("commentId") Long commentId, @PathVariable("recommentId") Long recommentId){
        return roomCommentService.removeRecomment(principal, roomId, commentId, recommentId);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/room/{roomId}/comment/{commentId}")
    public ResponseEntity<?> removeComment(Principal principal, @PathVariable("roomId") Long roomId, @PathVariable("commentId") Long commentId)/

    @GetMapping("/room/{roomId}/comment")
    public ResponseEntity<?> getComments(@PathVariable("roomId") Long roomId, Principal principal){
        return roomCommentService.getCommments(roomId, principal);
    }

}
