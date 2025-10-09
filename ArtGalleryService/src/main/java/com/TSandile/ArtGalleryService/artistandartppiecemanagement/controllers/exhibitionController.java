package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Exhibition;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ExhibitionDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.exhibitionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/exhibition")
@RequiredArgsConstructor
public class exhibitionController {
    private final exhibitionService exhibitionService;

    @PostMapping("/addExhibition")
    public ResponseEntity<?> addExhibition(@RequestBody ExhibitionDto exhibitionDto){
        String response = exhibitionService.addExhibition(exhibitionDto);;
        if(!response.equals("Success")){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getExhibition/{id}")
    public ResponseEntity<?> getExhibition(@PathVariable Long id){
        Exhibition exhibition = exhibitionService.getExhibition(id);;
        if(exhibition == null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exhibition);
    }

    @GetMapping("/getAllExhibitions")
    public List<Exhibition> getAllExhibition(){
        return exhibitionService.getAllExhibitions();
    }

    @PatchMapping("/updateExhibition/{id}")
    public ResponseEntity<?> updateExhibition(@PathVariable Long id, @RequestBody ExhibitionDto exhibitionDto){
        Exhibition updatedExhibition = exhibitionService.updateExhibition(id,exhibitionDto);
        if(updatedExhibition == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updatedExhibition);
    }

    @DeleteMapping("/deleteExhibition/{id}")
    public ResponseEntity<?> deleteExhibition(@PathVariable Long id){
        try{
            exhibitionService.deleteExhibition(id);
            return new ResponseEntity<>("Exhibition with id: " + id + " deleted", HttpStatus.OK);
        }catch(EntityNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
