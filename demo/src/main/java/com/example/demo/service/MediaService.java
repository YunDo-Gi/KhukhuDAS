package com.example.demo.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService {
    private final String MAIN_DIR_NAME = System.getProperty("user.dir") +  "/demo/src/main/resources";

    private final String SUB_DIR_NAME = "/static";

    public String uploadProfileImg(MultipartFile media) throws Exception {
        log.info(MAIN_DIR_NAME);
        String mediaURL = "";
        try {
            //추후 게시글 관련 파일이 올 시, 리팩토링 필요
            File folder = new File(MAIN_DIR_NAME + SUB_DIR_NAME + "/profileImg");

            if (!folder.exists()) {
                folder.mkdirs();
            }

            String fileName = media.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
            String generateFileName;
            MediaType mediaType = findMediaType(extension);
            if (mediaType.equals(MediaType.IMAGE)) {
                generateFileName = UUID.randomUUID().toString() + "." + extension;
            } else {
                throw new Exception();
            }
            mediaURL = "/profileImg" + File.separator + generateFileName;
            String destinationPath = MAIN_DIR_NAME +  SUB_DIR_NAME + mediaURL;
            File destination = new File(destinationPath);
            media.transferTo(destination);


        } catch (Exception e) {
            throw new Exception("사진 형식이 아님");
        }
        return mediaURL;

    }


    public ResponseEntity<?> responseProfileImg(String imgURL) throws IOException {
        System.out.println("test");
        InputStream imageStream = new FileInputStream(MAIN_DIR_NAME + SUB_DIR_NAME + "/profileImg/" + imgURL);
//		InputStream imageStream = new FileInputStream("/home/ubuntu/images/feed/" + imagename);
        byte[] imageByteArray = IOUtils.toByteArray(imageStream);
        imageStream.close();
        return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
    }


    public MediaType findMediaType(String fileName) {

        String extension = fileName.substring(fileName.lastIndexOf(".") + 1);

        if (extension.equals("png") || extension.equals("jpeg") || extension.equals("gif") || extension.equals("jpg") || extension.equals("PNG") || extension.equals("JPEG") || extension.equals("GIF") || extension.equals("JPG")) {
            return MediaType.IMAGE;
        } else {
            return MediaType.RAW;
        }
    }

    enum MediaType{
        IMAGE, RAW;
    }

}
