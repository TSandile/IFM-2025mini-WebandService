package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtPieceDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp.ArtPieceServiceImp;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/artPiece")
@RequiredArgsConstructor
public class artPieceController {
    private final ArtPieceServiceImp artPieceServiceImp;

    @PostMapping("/addArtPiece")
    public ResponseEntity<?> addArtPiece(@RequestBody ArtPieceDto artPieceDto){
        String response = artPieceServiceImp.addArtPiece(artPieceDto);
        if(!response.equals("SUCCESS")){
            return ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.ok().build();
        }
    }

    @PatchMapping("/updateArtPiece/{id}")
    public ResponseEntity<?> updateArtPiece(@PathVariable Long id, @RequestBody ArtPieceDto artPieceDto){
        ArtPiece updated = artPieceServiceImp.updateArtPiece(id,artPieceDto);
        if(updated == null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/getArtPiece/{id}")
    public ResponseEntity<?> getArtPiece(@PathVariable Long id){
        ArtPiece artP = artPieceServiceImp.getArtPiece(id);
        if(artP == null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(artP);
    }

    @GetMapping("/getAllArtPieces")
    public List<ArtPiece> getAll(){
        return artPieceServiceImp.getAllArtPieces();
    }

    @DeleteMapping("/deleteArtPiece/{id}")
    public ResponseEntity<?> deleteArtPiece(@PathVariable long id){
        try{
            artPieceServiceImp.deleteArtPiece(id);
            return new ResponseEntity<>("Art Piece with id: " + id + " deleted", HttpStatus.OK);
        }catch (EntityNotFoundException ex){
            return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

 }
