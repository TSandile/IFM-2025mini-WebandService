package com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.repository;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<ImageData, Long> {

    Optional<ImageData> findByName(String fileName);
}
