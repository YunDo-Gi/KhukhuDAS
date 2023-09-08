package com.example.demo.service;

import com.example.demo.controller.converter.ObjectToDtoUtil;
import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.exception.auth.*;
import com.example.demo.model.Member;
import com.example.demo.model.Role;
import com.example.demo.repository.MemberRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    private final RedisService redisService;
    private final MediaService mediaService;

    //회원가입
    public ResponseEntity<?> register(Principal principal, String authenticationRequestStr, MultipartFile profileImg, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
        if (principal != null) { //SecurityContext에 없다면 예외처리
            throw new Exception("이미 로그인 됨");
        }
        try {
            RegisterRequest registerRequest = (RegisterRequest) new ObjectToDtoUtil().jsonStrToObj(authenticationRequestStr, RegisterRequest.class);
            String profileImgURL = null;

            if (profileImg != null) {
                profileImgURL = mediaService.uploadProfileImg(profileImg);
            }

            Member member = Member.builder()
                    .email(registerRequest.getEmail())
                    .job(registerRequest.getJob())
                    .realName(registerRequest.getRealName())
                    .password(passwordEncoder.encode(registerRequest.getPassword()))
                    .role(Role.USER)
                    .age(registerRequest.getAge())
                    .nickname(registerRequest.getNickname())
                    .phoneNumber(registerRequest.getPhoneNumber())
                    .profileImgURL(profileImgURL)
                    .build();


            memberRepository.save(member); //데이터베이스 저장

            HttpHeaders httpHeaders = new HttpHeaders();
            String jwtToken = jwtService.generateToken(member.getEmail());
            httpHeaders.add("Authorization", jwtToken);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse(member.getId(), member.getNickname(), member.getProfileImgURL());
            return new ResponseEntity<AuthenticationResponse>(authenticationResponse, httpHeaders, HttpStatus.CREATED);

        }catch(Exception exception){
            log.error(exception.getMessage());
            throw new Exception("회원가입 실패");
        }

    }



    public void validatePhoneNumber(Principal principal, String phoneNumber) {

        //회원 정보 수정시 기존과 동일하다면 무시
        if (principal != null) {
            String currentUserPhoneNumber = memberRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new).getPhoneNumber();
            if (currentUserPhoneNumber.equals(phoneNumber)) {
                return;
            }
        }
        //정규식 패턴과 불일치
        if (!Pattern.matches("^010\\d{8}$", phoneNumber)) {
            throw new InvalidPhoneNumberPatternException();
        }
        //이미 존재하여 중복
        Optional<Member> user = memberRepository.findByPhoneNumber(phoneNumber);
        if (user.isPresent()) {
            throw new DuplicatedPhoneNumberException();
        }
    }

    public void validateEmail(Principal principal, String email) {

        if (principal != null) {
            String currentUserEmail = memberRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new).getEmail();
            if (currentUserEmail.equals(email)) {
                return;
            }
        }

        if (!Pattern.matches("^[A-Za-z0-9._%+-]+@khu\\.ac\\.kr$", email)) {
            throw new InvalidEmailPatternException();
        }

        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new DuplicatedEmailException();
        }
    }


    public void validateNickname(Principal principal, String nickname){
        if(principal != null){
            String  currentNickname = memberRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new).getNickname();
            if(currentNickname.equals(nickname)){
                return;
            }
        }
        Optional<Member> user = memberRepository.findByNickname(nickname);
        if(user.isPresent()){
            throw new DuplicatedNicknameException();
        }

    }


    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException {
        Optional<String> getAccessToken = jwtService.extractAccessToken(httpServletRequest);
        if(getAccessToken.isPresent()){
            String userEmail = jwtService.extractUserEmail(getAccessToken.get());
            Long expiration = jwtService.getExpireTime(getAccessToken.get());
            redisService.setDataWithExpiration(getAccessToken.get(), "BLACKLIST_ACCESSTOKEN_" + userEmail, expiration);
        }else{
            throw new InvalidAccessTokenException();
        }
    }

    public AuthenticationResponse validateJwt(HttpServletRequest httpServletRequest) throws ServletException, IOException {
        String accessToken = jwtService.extractAccessToken(httpServletRequest).orElseThrow(InvalidAccessTokenException::new);
        jwtService.validateToken(accessToken);
        String email = jwtService.extractUserEmail(accessToken);
        Member member = memberRepository.findByEmail(email).orElseThrow(NotFoundMemberException::new);

        return AuthenticationResponse.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .profileImgURL(mediaService.getPathURL(member.getProfileImgURL()))
                .build();

    }
}
