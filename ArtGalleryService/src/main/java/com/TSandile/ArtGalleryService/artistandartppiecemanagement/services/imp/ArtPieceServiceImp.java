package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtPieceDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artPieceRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artistRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.artPieceService;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.artistService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtPieceServiceImp implements artPieceService {
    private final artPieceRepository artPieceRepository;
    private final artistRepository artistRepository;
    private final artistService artistService;

    @Override
    public String addArtPiece(ArtPieceDto artPieceDto) {

        if(artPieceDto != null){
            Artist newArtist = new Artist(
                    artPieceDto.getArtist().getName(),
                    artPieceDto.getArtist().getBiography());
            //        artPieceDto.getArtist().getImageURL());
            ArtPiece newArtPiece = new ArtPiece(
                    artPieceDto.getTitle(),
                    artPieceDto.getDescription(),
                     newArtist
                 //   artPieceDto.getImageUrl()
            );

            artistRepository.save(newArtist);
            artPieceRepository.save(newArtPiece);
        }
        return "SUCCESS";
    }

//    @Override
//    public ArtPiece saveArtPiece(MultipartFile file) throws IOException {
//        ArtPiece artPiece = new ArtPiece();
//        artPiece.setTitle(file.getOriginalFilename());
//        artPiece.setImageUrl(file.getBytes());
//        return artPieceRepository.save();
//    }

    @Override
    public ArtPiece getArtPiece(Long id) {
        ArtPiece retArtPiece = new ArtPiece();
        Artist retArtist = new Artist();
        ArtPiece tempArtpiece = artPieceRepository.findById(id).orElse(null);
        if(tempArtpiece != null){
            Artist tempArtist = artistRepository.findById(tempArtpiece.getArtist().getId()).orElse(null);
            if(tempArtist != null){
                retArtPiece = new ArtPiece(
//                        tempArtpiece.getId(),
                        tempArtpiece.getTitle(),
                        tempArtpiece.getDescription(),
                         artistService.getArtist(tempArtpiece.getArtist().getId())
                        /*tempArtpiece.getImageUrl()*/);
            }
        }
        return retArtPiece;
    }

    @Override
    public ArtPiece updateArtPiece(Long id, ArtPieceDto artPiece) {
        ArtPiece updated = new ArtPiece();
        Optional<ArtPiece> optionArtP = artPieceRepository.findById(id);
        if(optionArtP.isPresent()){
            ArtPiece existing = optionArtP.get();
            existing.setTitle(artPiece.getTitle());
            existing.setDescription(artPiece.getDescription());
          //  existing.setImageUrl(artPiece.getImageUrl());
            artPieceRepository.save(existing);
            updated = existing;
        }else{
            return null;
        }
        return updated;
    }

    @Override
    public List<ArtPiece> getAllArtPieces() {
        return artPieceRepository.findAll();
    }

    @Override
    public void deleteArtPiece(Long id) {
        if(!artPieceRepository.existsById(id)){
            throw new EntityNotFoundException("Art Piece not found, id: " + id);
        }
        artPieceRepository.deleteById(id);
    }
}
