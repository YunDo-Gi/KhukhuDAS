package com.example.demo.controller;

import com.example.demo.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;


    @PreAuthorize("isAuthenticated()")
    @PostMapping(value ="", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createRoom(@RequestPart(value = "roomFile", required= true) List<MultipartFile> roomFile,
                                       @RequestPart(value = "makeUpRoom", required = true) String makeUpRoom,
                                        Principal principal) throws IOException {
        return roomService.createRoom(principal, roomFile, makeUpRoom);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping(value = "/{roomId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateDiary(@PathVariable(name = "roomId") Long roomId,
                                         @RequestPart(value = "modifyRoom", required = true) String modifyRoom,
                                         @RequestPart(value = "roomFile", required= true) List<MultipartFile> roomFile,
                                         Principal principal){
        return roomService.modifyRoom(roomId, principal, roomFile, modifyRoom);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable(name = "roomId") Long roomId, Principal principal){
        return roomService.getRoom(roomId, principal);
    }


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{roomId}/like")
    public ResponseEntity<Void> likeThisRoom(@PathVariable("roomId") Long roomId, Principal principal){
        return roomService.likeThisRoom(roomId, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{roomId}/unlike")
    public ResponseEntity<Void> unlikeThisRoom(@PathVariable("roomId") Long roomId, Principal principal){
        return roomService.unlikeThisRoom(roomId, principal);
    }

}
