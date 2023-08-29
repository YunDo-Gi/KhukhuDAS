package com.example.demo.service;


import com.example.demo.model.Member;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
@Slf4j
public class UserDetailsServiceImp implements UserDetailsService {

    private final MemberRepository memberRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        Member member = Member.builder().build();
        try {
            member = memberRepository.findByEmail(username).orElseThrow();
            log.info("사용자 이메일 정보: " + member.getEmail());
        }catch (Exception exception){
            log.info("사용자 인증 실패");
            throw exception;
        }

        return Member.builder().email(member.getEmail())
                .password(member.getPassword())
                .role(member.getRole())
                .build();
    }
}
