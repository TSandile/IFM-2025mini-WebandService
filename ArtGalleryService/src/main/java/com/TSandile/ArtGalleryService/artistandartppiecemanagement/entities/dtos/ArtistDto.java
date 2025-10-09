package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtistDto {
    private String name;
    private String biography;
    private ImageData imageData;
    private List<ArtPiece> artPieces;
}
