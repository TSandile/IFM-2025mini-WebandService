package com.TSandile.ArtGalleryService.artistandartppiecemanagement.controllers;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Exhibition;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ExhibitionDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.repository.ImageRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.util.ImageUtils;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artPieceRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.exhibitionRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.exhibitionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/exhibition")
@RequiredArgsConstructor
public class exhibitionController {
    private final exhibitionService exhibitionService;
    @Autowired
    private final artPieceRepository artPieceRepository;
    @Autowired
    private final exhibitionRepository exhibitionRepository;
    @Autowired
    private final ImageRepository imageRepository;

    @PostMapping(value = "/uploadExhibition" ,consumes = {"multipart/form-data"})
    public ResponseEntity<?> uploadArtist(@RequestParam("title") String title,
                                          @RequestParam("description")String description,
                                          @RequestParam("startdate")LocalDate startdate,
                                          @RequestParam("enddate") LocalDate enddate,
                                          @RequestParam("status")String status,
                                          @RequestParam("image") MultipartFile file) throws Exception{

        //Create entity and save the database

        //imgData.setImageData(imageFile.getBytes());
        Exhibition exhibition = new Exhibition();
        exhibition.setTitle(title);
        exhibition.setDescription(description);
        exhibition.setStart_date(startdate);
        exhibition.setEnd_date(enddate);
        exhibition.setStatus(status);
        ImageData imgData = imageRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
        exhibition.setImageData(imgData);


        return ResponseEntity.status(HttpStatus.OK).body(exhibitionRepository.save(exhibition));
    }

    @PostMapping("/addExhibition")
    public ResponseEntity<?> addExhibition(@RequestBody ExhibitionDto exhibitionDto){
        String response = exhibitionService.addExhibition(exhibitionDto);;
        if(!response.equals("Success")){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getExhibitionCount/{id}")
    public ResponseEntity<?> getArtPieceCount(@PathVariable Long id) {
        int count ;
        if (!exhibitionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        Exhibition exhibition = exhibitionService.getExhibition(id);
        count = exhibition.getArtPieces().size();
        //Long count = exhibitionRepository.countArtPiecesByExhibitionId(id);
        return ResponseEntity.ok(count);
    }

    @GetMapping("/getExhibition/{id}")
    public ResponseEntity<?> getExhibition(@PathVariable Long id){
        Exhibition exhibition = exhibitionService.getExhibition(id);;
        if(exhibition == null){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(exhibition);
    }

    @PutMapping("/assignArtPiece/{exhId}/{artId}")
    public ResponseEntity<?> assignArtPiece(@PathVariable Long exhId,
                                            @PathVariable Long artId){
        Optional<Exhibition> exhibitionOptional = exhibitionRepository.findById(exhId);
        Optional<ArtPiece> artPieceOptional = artPieceRepository.findById(artId);
        if(exhibitionOptional.isEmpty() || artPieceOptional.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        Exhibition exhibition = exhibitionOptional.get();
        ArtPiece artPiece = artPieceOptional.get();

        exhibition.addArtPiece(artPiece);
        Exhibition updatedExhibition = exhibitionRepository.save(exhibition);
        return ResponseEntity.ok(updatedExhibition);

    }

    @DeleteMapping("/removeArtPiece/{exhId}/{artId}")
    public ResponseEntity<?> removeArtPiece(@PathVariable Long exhId,
                                            @PathVariable Long artId){
        return exhibitionRepository.findById(exhId)
                .flatMap(exhibition -> artPieceRepository.findById(artId)
                        .map(artPiece -> {
                            if(artPiece.getExhibition() != null &&
                                    artPiece.getExhibition().getId().equals(exhId)){
                                exhibition.removeArtPiece(artPiece);

                                artPiece.setExhibition(null);
                                artPieceRepository.save(artPiece);

                                return ResponseEntity.ok().build();
                            }
                            return ResponseEntity.badRequest().build();
                        })
                ).orElseGet(() -> ResponseEntity.notFound().build());
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
