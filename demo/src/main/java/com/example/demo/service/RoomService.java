package com.example.demo.service;

import com.example.demo.controller.converter.ObjectToDtoUtil;
import com.example.demo.dto.*;
import com.example.demo.exception.auth.InternalServerException;
import com.example.demo.exception.auth.InvalidAccessTokenException;
import com.example.demo.exception.auth.NotFoundMemberException;
import com.example.demo.exception.room.AlreadyLikeException;
import com.example.demo.exception.room.NoExistLikeException;
import com.example.demo.exception.room.NoPermissionRoomException;
import com.example.demo.exception.room.NoSuchRoomException;
import com.example.demo.model.*;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.RoomLikeRepository;
import com.example.demo.repository.RoomRepository;
import com.sun.jdi.IntegerType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class RoomService {

    private final MediaService mediaService;

    private final RoomRepository roomRepository;

    private final CommentRepository commentRepository;

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

        boolean isMyRoom = false;
        boolean isLike = false;
        Long currentUserId = null;

        if (principal != null) {
            Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
            currentUserId = member.getId();
            isMyRoom = member.getId().equals(room.getMember().getId());
            isLike = roomLikeRepository.existsByMemberIdAndRoomId(member.getId(), roomId);
        }
        List<String> fileURL = mediaService.findAllByRoomObject(roomId).stream().map(mediaObject -> mediaService.getPathURL(mediaObject.getMediaObjectPath())).collect(Collectors.toList());

        final Long finalCurrentUserId = currentUserId;
        List<RoomCommentResponse> roomCommentResponses = room.getComments().stream().filter(comment -> comment.getParent() == null).map(comment -> {
            return RoomCommentResponse.builder()
                    .commentId(comment.getId())
                    .content(comment.getContent())
                    .recommentCount(comment.getChildren().size())
                    .user(AuthenticationResponse.builder()
                            .memberId(comment.getMember().getId())
                            .nickname(comment.getMember().getNickname())
                            .profileImgURL(comment.getMember().getProfileImgURL())
                            .build())
                    .isMyComment(comment.getMember().getId().equals(finalCurrentUserId))
                    .createdDate(comment.getLastModifiedAt())
                    .recomments(comment.getChildren().stream().map(recomment -> {
                        return RoomRecommentResponse.builder()
                                .recommentId(recomment.getId())
                                .content(recomment.getContent())
                                .user(AuthenticationResponse.builder()
                                        .memberId(recomment.getMember().getId())
                                        .nickname(recomment.getMember().getNickname())
                                        .profileImgURL(recomment.getMember().getProfileImgURL())
                                        .build())
                                .createdDate(recomment.getLastModifiedAt())
                                .isMyComment(recomment.getMember().getId().equals(finalCurrentUserId))
                                .build();
                    }).collect(Collectors.toList()))
                    .build();
        }).toList();
        room.increaseViewCount(); //조회수 증가


        RoomResponse roomResponse = RoomResponse.builder()
                .id(room.getId())
                .isMyRoom(isMyRoom)
                .title(room.getTitle())
                .content(room.getContent())
                .interestType(room.getInterestType().getInterest())
                .writer(AuthenticationResponse.builder()
                        .memberId(room.getMember().getId())
                        .nickname(room.getMember().getNickname())
                        .profileImgURL(room.getMember().getProfileImgURL())
                        .build())
                .createdDateTime(room.getCreatedAt())
                .modifiedDate(room.getLastModifiedAt())
                .viewCount(room.getView())
                .isLike(isLike)
                .roomCommentResponses(roomCommentResponses)
                .likeCount(room.getRoomLikes().size())
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

    @Transactional
    public ResponseEntity<Void> likeThisRoom(Long roomId, Principal principal) {
        if (principal == null) throw new InvalidAccessTokenException();
        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        Room room = roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);
        if (!roomLikeRepository.existsByMemberIdAndRoomId(member.getId(), roomId)) {
            RoomLike roomLike = RoomLike.builder()
                    .room(room).member(member).build();
            roomLikeRepository.save(roomLike);
            //room.increaseLikeCount();

        } else {
            throw new AlreadyLikeException();
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<Void> unlikeThisRoom(Long roomId, Principal principal) {
        if (principal == null) throw new InvalidAccessTokenException();
        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        Room room = roomRepository.findById(roomId).orElseThrow(NoSuchRoomException::new);
        RoomLike roomLike = roomLikeRepository.findByRoomIdAndMemberId(roomId, member.getId()).orElseThrow(NoExistLikeException::new);
        roomLikeRepository.delete(roomLike);
        //room.decreaseLikeCount();

        return new ResponseEntity<Void>(HttpStatus.OK);
    }


    public ResponseEntity<?> getRooms(String interestType, String sort) {

        List<Room> rooms = interestType == null ? roomRepository.findAll(getSortType(sort)) : roomRepository.findAllByInterestType(getInterestType(interestType), getSortType(sort));

        List<RoomsResponse> roomsResponses = rooms.stream().map(room -> {
            return RoomsResponse.builder()
                    .id(room.getId())
                    .title(room.getTitle())
                    .content(room.getContent())
                    .interestType(room.getInterestType().getInterest())
                    .writer(AuthenticationResponse.builder()
                            .memberId(room.getMember().getId())
                            .nickname(room.getMember().getNickname())
                            .profileImgURL(room.getMember().getProfileImgURL())
                            .build())
                    .commentCount(commentRepository.countByRoomId(room.getId()))
                    .createdDateTime(room.getCreatedAt())
                    .modifiedDate(room.getLastModifiedAt())
                    .viewCount(room.getView())
                    .likeCount(room.getRoomLikes().size())
                    .fileURLs(room.getObjects().stream().map(url -> url.getMediaObjectPath()).collect(Collectors.toList()))
                    .build();
        }).toList();
        return new ResponseEntity<List<RoomsResponse>>(roomsResponses,HttpStatus.OK );
    }


    private Sort getSortType(String sort){
        if(SortType.VIEW.getSortType().equals(sort)){
            return Sort.by(Sort.Order.desc("view"));
        }
        else if(SortType.LIKE.getSortType().equals(sort)){
            return Sort.by(Sort.Order.desc("roomLikes"));
        }
        else{
            return Sort.by(Sort.Order.desc("lastModifiedAt"));
        }
    }

}
