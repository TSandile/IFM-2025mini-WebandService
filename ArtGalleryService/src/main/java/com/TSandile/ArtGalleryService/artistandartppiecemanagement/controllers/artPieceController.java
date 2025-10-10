package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtPieceDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.repository.ImageRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.util.ImageUtils;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artPieceRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artistRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp.ArtPieceServiceImp;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/artPiece")
@RequiredArgsConstructor
public class artPieceController {
    private final ArtPieceServiceImp artPieceServiceImp;
    private final artistRepository artistRepository;
    private final artPieceRepository artPieceRepository;

    @Autowired
    private final ImageRepository imageRepository;

    @PostMapping("/addArtPiece")
    public ResponseEntity<?> addArtPiece(@RequestBody ArtPieceDto artPieceDto){
        String response = artPieceServiceImp.addArtPiece(artPieceDto);
        if(!response.equals("SUCCESS")){
            return ResponseEntity.badRequest().build();
        }else{
            return ResponseEntity.ok().build();
        }
    }

    @PostMapping(value = "/uploadArtPiece" ,consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadArtist(@RequestParam("title") String title,
                                          @RequestParam("description")String description,
                                          @RequestParam("image") MultipartFile pFile,
                                          @RequestParam("name") String name,
                                          @RequestParam("biography")String biography,
                                          @RequestParam("image") MultipartFile aFile) throws Exception{



        //Create entity and save the database

        //imgData.setImageData(imageFile.getBytes());
        ArtPiece artPiece = new ArtPiece();
        artPiece.setTitle(title);
        artPiece.setDescription(description);
        ImageData imgData = imageRepository.save(ImageData.builder()
                .name(pFile.getOriginalFilename())
                .type(pFile.getContentType())
                .imageData(ImageUtils.compressImage(pFile.getBytes())).build());
        artPiece.setImageData(imgData);
        // create artist enity
        Artist artist = new Artist();
        artist.setName(name);
        artist.setBiography(biography);
        ImageData imgeData = imageRepository.save(ImageData.builder()
                .name(aFile.getOriginalFilename())
                .type(aFile.getContentType())
                .imageData(ImageUtils.compressImage(aFile.getBytes())).build());
        artist.setImageData(imgeData);
        artistRepository.save(artist);
        artPiece.setArtist(artist);

        return ResponseEntity.status(HttpStatus.OK).body(artPieceRepository.save(artPiece));
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
