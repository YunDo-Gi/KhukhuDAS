package com.example.demo.service;

import com.example.demo.controller.converter.ObjectToDtoUtil;
import com.example.demo.dto.RoomRequest;
import com.example.demo.dto.RoomResponse;
import com.example.demo.exception.auth.InternalServerException;
import com.example.demo.exception.auth.InvalidAccessTokenException;
import com.example.demo.exception.auth.NotFoundMemberException;
import com.example.demo.exception.room.AlreadyLikeException;
import com.example.demo.exception.room.NoExistLikeException;
import com.example.demo.exception.room.NoPermissionRoomException;
import com.example.demo.exception.room.NoSuchRoomException;
import com.example.demo.model.*;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.RoomLikeRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomService {

    private final MediaService mediaService;

    private final RoomRepository roomRepository;

    private final MemberRepository memberRepository;

    private final RoomLikeRepository roomLikeRepository;

    @Transactional
    public ResponseEntity<?> createRoom(Principal principal, List<MultipartFile> roomFiles, String makeUpRoom) {
        Member member = new Member();
        Long roomId = null;
        if (principal != null) {
            member = memberRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new);
        }
        try {

            RoomRequest roomRequest = (RoomRequest) new ObjectToDtoUtil().jsonStrToObj(makeUpRoom, RoomRequest.class);
            InterestType interestType = getInterestType(roomRequest.getInterestType().toString());
            Room room = Room.builder()
                    .title(roomRequest.getTitle())
                    .content(roomRequest.getContent())
                    .interestType(interestType)
                    .member(member)
                    .build();

            roomId = roomRepository.save(room).getId();

            List<String> uploadedFileUrl = mediaService.uploadRoomFile(roomFiles);
            mediaService.createMediaObject(uploadedFileUrl, room);

        } catch (Exception exception) {
            throw new InternalServerException(exception);
        }
        HashMap<String, Long> response = new HashMap<>();
        response.put("저장된 RoomID : ", roomId);
        return new ResponseEntity<HashMap>(response, HttpStatus.CREATED);
    }

    @Transactional
    public ResponseEntity<?> modifyRoom(Long roomId, Principal principal, List<MultipartFile> roomFiles, String modifyRoom) {
        Member member = new Member();
        if (principal != null) {
            member = memberRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new);
        }

        if (!roomRepository.findById(roomId).isPresent()) {
            throw new NoSuchRoomException();
        }

        if (!roomRepository.existsByIdAndMemberId(roomId, memberRepository.findByEmail(member.getEmail()).get().getId())) {
            throw new NoPermissionRoomException();
        }

        try {
            RoomRequest roomRequest = (RoomRequest) new ObjectToDtoUtil().jsonStrToObj(modifyRoom, RoomRequest.class);
            InterestType interestType = getInterestType(roomRequest.getInterestType().toString());
            Room room = roomRepository.findById(roomId).get();
            room.setTitle(roomRequest.getTitle());
            room.setContent(roomRequest.getContent());
            room.setInterestType(interestType);

            //기존에 저장되어 있는 엔티티 가져오기
            List<MediaObject> originalFile = mediaService.findAllByRoomObject(roomId);
            //새로 저장하려는 파일 저장.
            List<String> uploadedFileUrl = mediaService.uploadRoomFile(roomFiles);
            mediaService.createMediaObject(uploadedFileUrl, room);
            //최종적으로 저장되었다면
            //삭제 기존 파일 삭제.
            mediaService.removePreFile(originalFile);


        } catch (Exception exception) {
            throw new InternalServerException(exception);
        }
        HashMap<String, Long> response = new HashMap<>();
        response.put("수정된 RoomID : ", roomId);
        return new ResponseEntity<HashMap>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> getRoom(Long roomId, Principal principal) {

        Room room = roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);

        Boolean isMyRoom = false;
        if(principal != null){
            Member member = memberRepository.findByEmail(principal.getName()).orElse(null);
            isMyRoom = member == room.getMember();
        }
        List<String> fileURL = mediaService.findAllByRoomObject(roomId).stream().map(mediaObject -> mediaObject.getMediaObjectPath()).collect(Collectors.toList());

        room.increaseViewCount(); //조회수 증가
        RoomResponse roomResponse = RoomResponse.builder()
                .id(room.getId())
                .isMyRoom(isMyRoom)
                .title(room.getTitle())
                .content(room.getContent())
                .interestType(room.getInterestType().getInterest())
                .writer(room.getMember().getNickname())
                .createdDateTime(room.getCreatedAt())
                .modifiedDate(room.getLastModifiedAt())
                .viewCount(room.getView())
                .fileURLs(fileURL).build();

        return new ResponseEntity<RoomResponse>(roomResponse, HttpStatus.OK);
    }


    private InterestType getInterestType(String requestRoomType) {
        if (InterestType.EXCERSICE.getInterest().equalsIgnoreCase(requestRoomType)) {
            return InterestType.EXCERSICE;
        } else if (InterestType.GAMING.getInterest().equalsIgnoreCase(requestRoomType)) {
            return InterestType.GAMING;
        } else if (InterestType.READING.getInterest().equalsIgnoreCase(requestRoomType)) {
            return InterestType.READING;
        } else if (InterestType.PHOTO.getInterest().equalsIgnoreCase(requestRoomType)) {
            return InterestType.PHOTO;
        } else if (InterestType.PICTURE.getInterest().equalsIgnoreCase(requestRoomType)) {
            return InterestType.PICTURE;

        } else {
            return InterestType.ETC;
        }
    }

    public ResponseEntity<Void> likeThisRoom(Long roomId, Principal principal) {
        if(principal == null) throw new InvalidAccessTokenException();
        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        Room room = roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);
        if(!roomLikeRepository.existsByMemberIdAndRoomId(member.getId(), roomId)){
            RoomLike roomLike = RoomLike.builder()
                    .room(room).member(member).build();
            roomLikeRepository.save(roomLike);
        }else{
            throw new AlreadyLikeException();
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    public ResponseEntity<Void> unlikeThisRoom(Long roomId, Principal principal) {
        if(principal == null) throw new InvalidAccessTokenException();
        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        Room room = roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);
        RoomLike roomLike = roomLikeRepository.findByRoomIdAndMemberId(roomId, member.getId()).orElseThrow(NoExistLikeException::new);
        roomLikeRepository.delete(roomLike);

        return new ResponseEntity<Void>(HttpStatus.OK);
    }
}
