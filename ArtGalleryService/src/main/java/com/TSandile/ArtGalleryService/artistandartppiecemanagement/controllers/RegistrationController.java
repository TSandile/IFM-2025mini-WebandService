package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Exhibition;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Registration;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.User;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.RegistrationRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.exhibitionRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.userRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//DTO for registration
class RegistrationRequest{
    public Long exhibitionId;
    public Long visitorId;
    public int numberOfPeople;

}

@RestController
@RequestMapping("/api/v1/registration")
@RequiredArgsConstructor
@CrossOrigin
public class RegistrationController {
    @Autowired
    private final RegistrationRepository registrationRepository;
    @Autowired
    private final userRepository userRepository;
    @Autowired
    private final exhibitionRepository exhibitionRepository;

    // new registration from user
    @PostMapping("/register/{exhId}/{visId}/{people}")
    public ResponseEntity<?> register(@PathVariable Long exhId,
                                      @PathVariable Long visId,
                                      @PathVariable int people){

        Optional<Exhibition> optExhibition = exhibitionRepository.findById(exhId);
        Optional<User> optVisitor = userRepository.findById(visId);
        try{
            if(optExhibition.isEmpty() || optVisitor.isEmpty()){
                return ResponseEntity.badRequest().build();
            }

               Exhibition exhibition =  optExhibition.get();
               User visitor = optVisitor.get();

                Registration newRegistration = new Registration(exhibition,visitor,people);
                registrationRepository.save(newRegistration);
                return ResponseEntity.ok().body(newRegistration);

        }catch(RuntimeException ex){
            return ResponseEntity.badRequest().build();
        }
    }

    //get all registration by clerk
    @GetMapping("/getAllRegistrations")
    public ResponseEntity<List<Registration>> getAllRegistrations(){
        return ResponseEntity.ok().body(registrationRepository.findAll());
    }

    @GetMapping("/getRegistration/{id}")
    public ResponseEntity<?> getRegistration(@PathVariable Long id){
        try{
           Optional<Registration> registration =  registrationRepository.findById(id);
           if(registration.isEmpty()){
               return ResponseEntity.noContent().build();
           }
            return ResponseEntity.ok(registration.get());
        }catch(EntityNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/deleteRegistration/{id}")
    public ResponseEntity<?> deleteRegistration(@PathVariable Long id){
        try{
            registrationRepository.deleteById(id);
            return new ResponseEntity<>("Registration with id: " + id + " deleted", HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }



}
