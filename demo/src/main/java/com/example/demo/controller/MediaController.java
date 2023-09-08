package com.example.demo.controller;


import com.example.demo.service.MediaService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MediaController {

    private final MediaService mediaService;

    @GetMapping(value = "/profileImg/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<?> userSearch(@PathVariable("imagename") String imagename) throws IOException {
        return mediaService.responseProfileImg(imagename);
    }
    @GetMapping(value = "/room/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<?> roomSearch(@PathVariable("imagename") String imagename) throws IOException {
        return mediaService.responseRoomImg(imagename);
    }

    @Deprecated //사용 안함
    @GetMapping(value = "/room-object/{roomId}")
    public void roomObject(@PathVariable(value = "roomId") Long roomId, HttpServletResponse httpServletResponse) throws IOException {
        mediaService.responseMediaFile(roomId, httpServletResponse);
    }

}
