package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtistDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.repository.ImageRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.util.ImageUtils;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artistRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp.artistServiceImp;
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
@RequiredArgsConstructor
@RequestMapping("/api/v1/artists")
public class artistController {
    private final artistServiceImp artistServiceImp;
    private final artistRepository artistRepository;
    @Autowired
    private final ImageRepository imageRepository;
//    @Autowired
//    private final FileStorageService fileStorageService;  //inject the service

    @PostMapping("/addArtist")
    public ResponseEntity<?> addArtist(@RequestBody ArtistDto artistDto){
        String response = artistServiceImp.addArtist(artistDto);
        if(!response.equals("SUCCESS")){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/uploadArtist" ,consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadArtist(@RequestParam("name") String name,
                                          @RequestParam("biography")String biography,
                                          @RequestParam("image") MultipartFile file) throws Exception{



        //Create entity and save the database

        //imgData.setImageData(imageFile.getBytes());
        Artist artist = new Artist();
        artist.setName(name);
        artist.setBiography(biography);
        ImageData imgData = imageRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        artist.setImageData(imgData);

        //working version
      /*  Artist artist = new Artist();
        artist.setName(name);
        artist.setBiography(biography);
        ImageData imgData = new ImageData(imageFile.getBytes());
        artist.setImageData(imgData);*/
      //  artist.setImageData(imageFile.getBytes());
       // artist.setImageD(ImageUtils.compressImage(file.getBytes()));
        //  artistRepository.save(artist);
       // artist.setImageD(file.getBytes());
        return ResponseEntity.status(HttpStatus.OK).body(artistRepository.save(artist));
//        String response = artistServiceImp.addArtist(artistDto);
//        if(!response.equals("SUCCESS")){
//            return ResponseEntity.badRequest().build();
//        }
//        return ResponseEntity.ok().build();
    }

    @GetMapping("/getArtist/{id}")
    public ResponseEntity<?> getArtist(@PathVariable Long id){
       Artist artist = artistServiceImp.getArtist(id);
       if(artist == null){
           return ResponseEntity.noContent().build();
       }
        return ResponseEntity.ok(artist);
    }

    @GetMapping("/getAllArtists")
    public List<Artist> getAllArtist(){
        return artistServiceImp.getAllArtist();
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
