package com.example.demo.service;


import com.example.demo.Repository.UserRepository;
import com.example.demo.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImp implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);

        User user = userRepository.findByEmail(username).get();
        System.out.println(user.getEmail());
        return User.builder().email(user.getEmail())
                .password(user.getPassword())
                .role(user.getRole())
                .build();
    }
}
