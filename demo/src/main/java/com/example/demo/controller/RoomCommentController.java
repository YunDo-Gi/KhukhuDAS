package com.example.demo.controller;

import com.example.demo.dto.RoomCommentRequest;
import com.example.demo.dto.RoomCommentResponse;
import com.example.demo.service.RoomCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/")
public class RoomCommentController {

    private final RoomCommentService roomCommentService;



    @PreAuthorize("isAuthenticated()")
    @PostMapping("/room/{roomId}/comment")
    public ResponseEntity<?> createComment(Principal principal, @PathVariable(name = "roomId")Long roomId, @RequestBody RoomCommentRequest roomCommentRequest){
        roomCommentService.createComment(roomId, roomCommentRequest, principal);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/room/{roomId}/comment/{commentId}")
    public ResponseEntity<?> updateComment(Principal principal, @PathVariable(name = "roomId")Long roomId, @PathVariable(name = "commentId")Long commentId, @RequestBody RoomCommentRequest roomCommentRequest){
        roomCommentService.updateComment(roomId, commentId, roomCommentRequest, principal);
        return ResponseEntity.ok().build();
    }

}
