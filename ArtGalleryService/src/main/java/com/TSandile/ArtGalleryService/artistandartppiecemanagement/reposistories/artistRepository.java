package com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface artistRepository extends JpaRepository<Artist, Long> {
    public Artist getByName(String name);
}
