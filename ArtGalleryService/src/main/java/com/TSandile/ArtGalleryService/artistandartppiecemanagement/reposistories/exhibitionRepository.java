package com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Exhibition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface exhibitionRepository extends JpaRepository<Exhibition, Long> {
}
