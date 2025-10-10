package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ExhibitionStatus;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExhibitionDto {
    private String title;
    // format: YYYY-MM-DD.
    private LocalDate start_date;
    private LocalDate end_date;
    private String status;
    private ImageData imageData;
}
