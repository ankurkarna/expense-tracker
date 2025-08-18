package com.tracker.expense.Expense.Tracker.service;

import com.tracker.expense.Expense.Tracker.dto.UserDTO;
import com.tracker.expense.Expense.Tracker.entity.User;
import com.tracker.expense.Expense.Tracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(UserDTO request){
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setName(request.getName());
        newUser.setAccessLevel("USER");
        return userRepository.save(newUser);
    }

    public User createAdmin(UserDTO request){
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        newUser.setAccessLevel("ADMIN");
        return userRepository.save(newUser);
    }

    public Optional<User> findUser(UUID userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
