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
@RequestMapping("/api")
public class RoomController {

    private final RoomService roomService;


    @PreAuthorize("isAuthenticated()")
    @PostMapping(value ="/room", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> createRoom(@RequestPart(value = "roomFile", required= true) List<MultipartFile> roomFile,
                                       @RequestPart(value = "makeUpRoom", required = true) String makeUpRoom,
                                        Principal principal) throws IOException {
        return roomService.createRoom(principal, roomFile, makeUpRoom);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping(value = "/room/{roomId}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateDiary(@PathVariable(name = "roomId") Long roomId,
                                         @RequestPart(value = "modifyRoom", required = true) String modifyRoom,
                                         @RequestPart(value = "roomFile", required= true) List<MultipartFile> roomFile,
                                         Principal principal){
        return roomService.modifyRoom(roomId, principal, roomFile, modifyRoom);
    }

    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> getRoom(@PathVariable(name = "roomId") Long roomId, Principal principal){
        return roomService.getRoom(roomId, principal);
    }


    @PreAuthorize("isAuthenticated()")
    @GetMapping("/room/{roomId}/like")
    public ResponseEntity<Void> likeThisRoom(@PathVariable("roomId") Long roomId, Principal principal){
        return roomService.likeThisRoom(roomId, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/room/{roomId}/unlike")
    public ResponseEntity<Void> unlikeThisRoom(@PathVariable("roomId") Long roomId, Principal principal){
        return roomService.unlikeThisRoom(roomId, principal);
    }

    @GetMapping("/rooms")
    public ResponseEntity<?> getRooms( @RequestParam(value = "interest-type", required = false) String interestType, @RequestParam(value = "sort") String sort){
        return roomService.getRooms(interestType, sort);
    }

    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/room/{roomId}")
    public ResponseEntity<?> removeRoom(Principal principal, @PathVariable("roomId") Long roomId){
        return roomService.removeRoom(principal, roomId);
    }

}
