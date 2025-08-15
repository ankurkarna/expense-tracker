package com.tracker.expense.Expense.Tracker.service;

import com.tracker.expense.Expense.Tracker.entity.User;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.UUID;

public class MyUserDetails implements UserDetails {

    @Getter
    private UUID id;
    private final String username;
    private final String password;
//    private Collection<? extends GrantedAuthority> authorities;

    public MyUserDetails(User user) {
        this.id = user.getUserId();
        this.username = user.getUsername(); // match your entity method
        this.password = user.getPassword();
//        this.authorities = Collections.emptyList(); // No roles yet
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
