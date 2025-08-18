package com.tracker.expense.Expense.Tracker.controller;

import com.tracker.expense.Expense.Tracker.dto.LoginResponse;
import com.tracker.expense.Expense.Tracker.entity.AuthRequest;
import com.tracker.expense.Expense.Tracker.entity.User;
import com.tracker.expense.Expense.Tracker.repository.UserRepository;
import com.tracker.expense.Expense.Tracker.service.UserService;
import com.tracker.expense.Expense.Tracker.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest request) throws AuthenticationException {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        if (authentication.isAuthenticated()) {
            User user = userRepository.findByUsername(request.getUsername()).get();
            String token = jwtUtil.generateToken(request.getUsername());
            return new LoginResponse(token, user);
        } else {
            throw new RuntimeException("Invalid login");
        }
    }
}


