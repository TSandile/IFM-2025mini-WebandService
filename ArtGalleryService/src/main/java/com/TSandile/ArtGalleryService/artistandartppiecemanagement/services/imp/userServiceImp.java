package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.User;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.LoginRequest;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.UserDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.userRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.userService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.InputMismatchException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class userServiceImp implements userService {

    private final userRepository userRepository;

    @Override
    public User login(LoginRequest loginRequest)  {
        Optional<User> user = userRepository.getByEmail(loginRequest.getEmail());
        User retUser = new User() ;
//        if(user.isEmpty() || loginRequest.getPassword() != user.get().getPassword()){
//           return Optional.empty();
//        }
        if(user.isPresent()){
            retUser = user.get();
            System.out.println("existing user " + retUser);
            if(!retUser.getPassword().equals(loginRequest.getPassword())){
                return null;
            }
        }
        return retUser;
    }

    @Override
    public String addUser(UserDto userDto) {
        if(userDto == null){
            throw new NullPointerException("Passed an empty entity");
        }
       Optional<User> temp = userRepository.getByEmail(userDto.getEmail());
        if(temp.isPresent()){
            return "Exist";
        }
        User newUser = new User( userDto.getName()
                              ,userDto.getSurname()
                                ,userDto.getEmail()
                                ,userDto.getPassword()
                                ,userDto.getType());
        userRepository.save(newUser);
        return "Success";
    }

    @Override
    public Optional<User> getUser(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public String updateUser(Long id, UserDto userDto) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new EntityNotFoundException();
        }else{
            User existingUser = user.get();
            existingUser.setName(userDto.getName());
            existingUser.setSurname(userDto.getSurname());
            existingUser.setEmail(userDto.getEmail());
            existingUser.setPassword(userDto.getPassword());
            existingUser.setType(userDto.getType());
            userRepository.save(existingUser);
        }
        return "Success";
    }

    @Override
    public String deleteUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()){
            throw new EntityNotFoundException("User with id" + id + " not found");
        }
            userRepository.deleteById(id);

        return "Success";
    }
}
