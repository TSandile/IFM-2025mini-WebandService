package com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface userRepository extends JpaRepository<User, Long> {
    Optional<User> getByEmail(String email);

}
