package com.example.demo.controller;


import com.example.demo.service.MediaService;
import lombok.RequiredArgsConstructor;
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
}
