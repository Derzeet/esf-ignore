package com.example.backend.controller;
import com.example.backend.payload.request.LoginRequest;
import com.example.backend.payload.response.JwtResponse;
import com.example.backend.security.jwt.JwtTokenUtil;
import com.example.backend.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@RestController
//@AllArgsConstructor
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class LoginController {
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final JwtTokenUtil jwtTokenUtil;
    @Autowired
    private final UserDetailsServiceImpl userDetailsService;

    public LoginController(AuthenticationManager authenticationManager,
                           JwtTokenUtil jwtTokenUtil,
                           UserDetailsServiceImpl userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticate(loginRequest.getLogin(), loginRequest.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getLogin());
        String token = jwtTokenUtil.generateToken(userDetails);
        System.out.println(token);

        return ResponseEntity.ok(new JwtResponse(token, loginRequest.getLogin()));
    }

    private Authentication authenticate(String login, String password) {
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, password));
    }
}
