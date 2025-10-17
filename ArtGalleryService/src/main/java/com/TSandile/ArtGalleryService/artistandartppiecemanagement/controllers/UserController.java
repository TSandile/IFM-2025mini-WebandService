package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.User;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.LoginRequest;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.UserDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.userRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.userService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/user")
public class UserController {
    private final userService userService;
    @Autowired
    private final userRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDto userDto){
        String response = userService.addUser(userDto);
        if(!response.equals("Success")){
            return  ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
        User response = userService.login(loginRequest);
        if(response == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        try{
            userRepository.deleteById(id);
            return new ResponseEntity<>("Registration with id: " + id + " deleted", HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }


}
