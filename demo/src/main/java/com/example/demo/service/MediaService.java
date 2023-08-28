package com.example.demo.service;

import com.example.demo.exception.auth.InternalServerException;
import com.example.demo.model.MediaObject;
import com.example.demo.model.Room;
import com.example.demo.repository.MediaObjectRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MediaService {

    private final MediaObjectRepository mediaObjectRepository;

    private final String MAIN_DIR_NAME = System.getProperty("user.dir") +  "/demo/src/main/resources";

    private final String SUB_DIR_NAME = "/static";

    public String uploadProfileImg(MultipartFile media) throws Exception {
        log.info(MAIN_DIR_NAME);
        try {
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
            String mediaURL = "/profileImg" + File.separator + generateFileName;
            String destinationPath = MAIN_DIR_NAME +  SUB_DIR_NAME + mediaURL;
            File destination = new File(destinationPath);
            media.transferTo(destination);

            return mediaURL;
        } catch (Exception e) {
            throw new Exception("사진 형식이 아님");
        }
    }



    public List<String> uploadRoomFile(List<MultipartFile> files) throws Exception {
        log.info(MAIN_DIR_NAME);
        try {
            List<String> fileNameList = new ArrayList<>();
            File folder = new File(MAIN_DIR_NAME + SUB_DIR_NAME + "/room");

            if (!folder.exists()) {
                folder.mkdirs();
            }

            for (MultipartFile media : files) {
                String fileName = media.getOriginalFilename();
                String extension = fileName.substring(fileName.lastIndexOf(".") + 1);
                String generateFileName = null;
                MediaType mediaType = findMediaType(extension); //파일 확장자를 고려함.
                if (mediaType.equals(MediaType.RAW)) {
                    generateFileName = UUID.randomUUID().toString() + "." + extension;
                }

                String fileURL = "/room" + File.separator + generateFileName;
                String destinationPath = MAIN_DIR_NAME + SUB_DIR_NAME + fileURL;
                File destination = new File(destinationPath);
                media.transferTo(destination);

                fileNameList.add(fileURL);

            }
            return fileNameList;
            } catch(Exception e){
                log.info("error : " + e.getMessage());
                throw new InternalServerException(e);
            }
    }


    @Transactional //혹여나, 실패 시 자동 롤백 하기 위해.
    public void createMediaObject(List<String> fileNameList, Room room) {

        for (String fileName : fileNameList) {
            MediaObject mediaObject = MediaObject.builder().mediaObjectPath(fileName).room(room).build();

            mediaObjectRepository.save(mediaObject);
        }
    }



    public List<MediaObject> findAllByRoomObject(Long roomId){
        return mediaObjectRepository.findAllByRoomId(roomId);
    }


    public void deleteFile(List<String> fileNames) {
        for (String fileName : fileNames) {
            File savedFile = new File(MAIN_DIR_NAME + SUB_DIR_NAME + "/room/" + fileName);
            log.info("savedFile url : " + savedFile);
            if (savedFile.exists()) {
                if (savedFile.delete()) {
                    log.info("파일삭제 성공. filename : {}", fileName);
                } else {
                    log.info("파일삭제 실패. filename : {}", fileName);
                }
            } else {
                log.info("파일이 존재하지 않습니다. filename : {}", fileName);
            }
        }
    }

    public ResponseEntity<?> responseProfileImg(String imgURL) throws IOException {
        InputStream imageStream = new FileInputStream(MAIN_DIR_NAME + SUB_DIR_NAME + "/profileImg/" + imgURL);
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


    public ResponseEntity<List<FileSystemResource>> responseMediaFile(List<String> fileNames) throws IOException {
        HttpHeaders header = new HttpHeaders();
        List<FileSystemResource> fsrs = new ArrayList<>();
        for(String fileName : fileNames) {
            String file = MAIN_DIR_NAME + SUB_DIR_NAME + "/room/" + fileName;
            FileSystemResource fsr = new FileSystemResource(file);

            Path filePath = Paths.get(fileName);
            header.add("Content-Type", Files.probeContentType(filePath));
            header.setContentType(org.springframework.http.MediaType.APPLICATION_OCTET_STREAM);
            header.add("Content-Disposition", "attachment; filename=" + fsr.getFilename());
        }
        return new ResponseEntity<List<FileSystemResource>>(fsrs, header, HttpStatus.OK);

    }

    public void removePreFile(List<MediaObject> originalFile) {
        List<String> fileUrl = originalFile.stream().map(file -> file.getMediaObjectPath()).collect(Collectors.toList());
        deleteFile(fileUrl);
        mediaObjectRepository.deleteAll(originalFile);
    }

    enum MediaType{
        IMAGE, RAW;
    }

}
