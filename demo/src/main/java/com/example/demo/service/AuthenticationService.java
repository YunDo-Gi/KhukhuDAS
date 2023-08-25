package com.example.demo.service;

import com.example.demo.controller.converter.ObjectToDtoUtil;
import com.example.demo.dto.AuthenticationResponse;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.exception.ErrCode;
import com.example.demo.exception.auth.*;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
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

import javax.xml.bind.ValidationException;
import java.security.Principal;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

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

            User user = User.builder()
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


            userRepository.save(user); //데이터베이스 저장

            HttpHeaders httpHeaders = new HttpHeaders();
            String jwtToken = jwtService.generateToken(user.getEmail());
            httpHeaders.add("Authorization", jwtToken);

            AuthenticationResponse authenticationResponse = new AuthenticationResponse(user.getId(), user.getNickname(), user.getProfileImgURL());
            return new ResponseEntity<AuthenticationResponse>(authenticationResponse, httpHeaders, HttpStatus.CREATED);

        }catch(Exception exception){
            log.error(exception.getMessage());
            throw new Exception("회원가입 실패");
        }

    }



    public void validatePhoneNumber(Principal principal, String phoneNumber) {

        //회원 정보 수정시 기존과 동일하다면 무시
        if (principal != null) {
            String currentUserPhoneNumber = userRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new).getPhoneNumber();
            if (currentUserPhoneNumber.equals(phoneNumber)) {
                return;
            }
        }
        //정규식 패턴과 불일치
        if (!Pattern.matches("^010\\d{8}$", phoneNumber)) {
            throw new InvalidPhoneNumberPatternException();
        }
        //이미 존재하여 중복
        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);
        if (user.isPresent()) {
            throw new DuplicatedPhoneNumberException();
        }
    }

    public void validateEmail(Principal principal, String email) {

        if (principal != null) {
            String currentUserEmail = userRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new).getEmail();
            if (currentUserEmail.equals(email)) {
                return;
            }
        }

        if (!Pattern.matches("^[A-Za-z0-9._%+-]+@khu\\.ac\\.kr$", email)) {
            throw new InvalidEmailPatternException();
        }

        Optional<User> member = userRepository.findByEmail(email);
        if (member.isPresent()) {
            throw new DuplicatedEmailException();
        }
    }


    public void validateNickname(Principal principal, String nickname){
        if(principal != null){
            String  currentNickname = userRepository.findByEmail(principal.getName()).orElseThrow(InvalidAccessTokenException::new).getNickname();
            if(currentNickname.equals(nickname)){
                return;
            }
        }
        Optional<User> user = userRepository.findByNickname(nickname);
        if(user.isPresent()){
            throw new DuplicatedNicknameException();
        }

    }




}
