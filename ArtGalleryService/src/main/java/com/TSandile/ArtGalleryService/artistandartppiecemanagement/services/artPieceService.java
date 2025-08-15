package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtPieceDto;

import java.util.List;

public interface artPieceService {
    public String addArtPiece(ArtPieceDto artPieceDto);
    public ArtPiece getArtPiece(Long id);
    public ArtPiece updateArtPiece(Long id, ArtPieceDto artPiece );
    public List<ArtPiece> getAllArtPieces();
    public void deleteArtPiece(Long id);
}
