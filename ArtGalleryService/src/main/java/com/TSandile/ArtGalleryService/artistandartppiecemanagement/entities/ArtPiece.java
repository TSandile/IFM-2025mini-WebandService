package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ArtPiece {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "artist_id",
    referencedColumnName = "id")
    private Artist artist;
    private String imageUrl;

    public ArtPiece(String title, String description, String imageUrl){
        this.title = title;
        this.description = description;
        this.artist = new Artist();
        this.imageUrl = imageUrl;
    }



}
