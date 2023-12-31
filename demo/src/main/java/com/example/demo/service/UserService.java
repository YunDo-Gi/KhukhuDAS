package com.example.demo.service;

import com.example.demo.controller.converter.ObjectToDtoUtil;
import com.example.demo.dto.ModifyProfileRequest;
import com.example.demo.dto.MyProfileResponse;
import com.example.demo.dto.UserProfileResponse;
import com.example.demo.exception.auth.InvalidAccessTokenException;
import com.example.demo.exception.auth.NotFoundMemberException;
import com.example.demo.model.*;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.MemberRepository;
import com.example.demo.repository.RoomLikeRepository;
import com.example.demo.repository.RoomRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final MemberRepository memberRepository;

    private final MediaService mediaService;

    private final RoomRepository roomRepository;

    private final RoomLikeRepository roomLikeRepository;

    private final CommentRepository commentRepository;

    //자신의 프로필일 경우
    public ResponseEntity<?> getMyProfile(Principal principal) {
        if (principal == null) throw new InvalidAccessTokenException();
        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);
        MyProfileResponse myProfileResponse = MyProfileResponse.builder()
                .age(member.getAge())
                .userId(member.getId())
                .realName(member.getRealName())
                .phoneNumber(member.getPhoneNumber())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImgURL(mediaService.getPathURL(member.getProfileImgURL()))
                .createdDateTime(member.getCreatedAt())
                .job(member.getJob())
                .build();

        return new ResponseEntity<MyProfileResponse>(myProfileResponse, HttpStatus.OK);
    }


    @Transactional
    public ResponseEntity<?> modify(Principal principal, String updateRequest, MultipartFile profileImg, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        if (principal == null) {
            throw new InvalidAccessTokenException();
        }

        Member member = memberRepository.findByEmail(principal.getName()).orElseThrow(NotFoundMemberException::new);

        ModifyProfileRequest modifyProfileRequest = (ModifyProfileRequest) new ObjectToDtoUtil().jsonStrToObj(updateRequest, ModifyProfileRequest.class);
        String toSetProfileImgURL = null;
        String currentProfileImgUrl = member.getProfileImgURL();

        //기존과 변경되었다면.
        if (modifyProfileRequest.getIsChangedProfileImg()) {
            if (currentProfileImgUrl != null && profileImg == null) {
                List<String> url = new ArrayList<>();
                url.add(currentProfileImgUrl);
                mediaService.deleteFile(url, "profileImg");
            } else if (currentProfileImgUrl == null && profileImg != null) {
                toSetProfileImgURL = mediaService.uploadProfileImg(profileImg);
            } else if (currentProfileImgUrl != null && profileImg != null) {
                List<String> url = new ArrayList<>();
                url.add(currentProfileImgUrl);
                toSetProfileImgURL = mediaService.uploadProfileImg(profileImg);
                mediaService.deleteFile(url, "profileImg");
                log.info(toSetProfileImgURL);
            }

        } else {
            toSetProfileImgURL = currentProfileImgUrl;

        }
        member.setProfileImgURL(toSetProfileImgURL);

        HashMap<String, String> response = new HashMap<>();
        response.put("url", member.getProfileImgURL());
        return new ResponseEntity<HashMap>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> getUserProfile(Long userId) {
        Member member = memberRepository.findById(userId).orElseThrow(NotFoundMemberException::new);
        UserProfileResponse userProfileResponse = UserProfileResponse.builder()
                .age(member.getAge())
                .userId(member.getId())
                .realName(member.getRealName())
                .phoneNumber(member.getPhoneNumber())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImgURL(mediaService.getPathURL(member.getProfileImgURL()))
                .createdDateTime(member.getCreatedAt())
                .job(member.getJob())
                .build();
        return new ResponseEntity<UserProfileResponse>(userProfileResponse, HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<HashMap> deleteUser(Principal principal) {
        Member member = new Member();
        if (principal != null) {
            member = memberRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new);
        }


        List<Room> rooms = roomRepository.findAllByMemberId(member.getId());
        for (Room room : rooms) {

            List<MediaObject> originalFile = room.getObjects();

            mediaService.removePreFile(originalFile);

            List<RoomLike> roomLikes = room.getRoomLikes();
            if (!roomLikes.isEmpty()) {
                roomLikeRepository.deleteAll(roomLikes);
            }

            List<Comment> comments = room.getComments();

            if (!comments.isEmpty()) {
                commentRepository.deleteAll(comments);
            }

            roomRepository.delete(room);
        }

        List<Comment> comments = commentRepository.findAllByMemberId(member.getId());
        commentRepository.deleteAll(comments);


        List<RoomLike> roomLikes = roomLikeRepository.findAllByMemberId(member.getId());
        roomLikeRepository.deleteAll(roomLikes);
        long userId = member.getId();
        memberRepository.delete(member);

        HashMap<String, Long> response = new HashMap<>();
        response.put("삭제된 userId", userId);
        return new ResponseEntity<HashMap>(response, HttpStatus.OK);


    }
}
