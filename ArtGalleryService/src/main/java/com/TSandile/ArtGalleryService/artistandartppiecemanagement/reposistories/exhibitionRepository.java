package com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Exhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface exhibitionRepository extends JpaRepository<Exhibition, Long> {
    @Query("SELECT COUNT(ap) FROM ArtPiece ap WHERE ap.exhibition.id = :exhibitionId")
    Long countArtPiecesByExhibitionId(Long id);
}
