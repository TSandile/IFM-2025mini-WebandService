package com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface artPieceRepository extends JpaRepository<ArtPiece, Long> {
}
