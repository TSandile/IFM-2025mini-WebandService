package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArtPieceDto {
    private String title;
    private String description;
    private Artist artist;
}
