package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.User;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.LoginRequest;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface userService {
    public User login(LoginRequest loginRequest);
    public String addUser(UserDto userDto);
    public Optional<User> getUser(Long id);
    public List<User> getUsers();
    public String updateUser(Long id,UserDto userDto);
    public String deleteUser(Long id);
}
