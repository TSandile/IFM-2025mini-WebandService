package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtPieceDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artPieceRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.artPieceService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ArtPieceServiceImp implements artPieceService {
    private final artPieceRepository artPieceRepository;

    @Override
    public String addArtPiece(ArtPieceDto artPieceDto) {
        if(artPieceDto != null){
            ArtPiece newArtPiece = new ArtPiece(
                    artPieceDto.getTitle(),
                    artPieceDto.getDescription()
            );
            artPieceRepository.save(newArtPiece);
        }
        return "SUCCESS";
    }

    @Override
    public ArtPiece getArtPiece(Long id) {
        return artPieceRepository.findById(id).orElse(null);
    }

    @Override
    public ArtPiece updateArtPiece(Long id, ArtPieceDto artPiece) {
        ArtPiece updated = new ArtPiece();
        Optional<ArtPiece> optionArtP = artPieceRepository.findById(id);
        if(optionArtP.isPresent()){
            ArtPiece existing = optionArtP.get();
            existing.setTitle(artPiece.getTitle());
            existing.setDescription(artPiece.getDescription());
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
    }
}
