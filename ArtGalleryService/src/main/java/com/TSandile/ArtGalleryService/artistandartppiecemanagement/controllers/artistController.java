package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtistDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp.artistServiceImp;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/artist")
public class artistController {
    private final artistServiceImp artistServiceImp;

    @PostMapping("/addArtist")
    public ResponseEntity<?> addArtist(@RequestBody ArtistDto artistDto){
        String response = artistServiceImp.addArtist(artistDto);
        if(!response.equals("SUCCESS")){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getArtist/{id}")
    public ResponseEntity<?> getArtist(@PathVariable Long id){
       Artist artist = artistServiceImp.getArtist(id);
       if(artist == null){
           return ResponseEntity.noContent().build();
       }
        return ResponseEntity.ok(artist);
    }

    @PatchMapping("/updateArtist/{id}")
    public ResponseEntity<?> updateArtist(@PathVariable Long id, @RequestBody ArtistDto artistDto){
        Artist updatedArtist = artistServiceImp.updateArtist(id,artistDto);
        if(updatedArtist == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updatedArtist);
    }

    @DeleteMapping("/removeArtist/{id}")
    public ResponseEntity<?> deleteArtist(@PathVariable Long id){
        try{
            artistServiceImp.deleteArtist(id);
            return new ResponseEntity<>("Artist with id: " + id + " deleted", HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
