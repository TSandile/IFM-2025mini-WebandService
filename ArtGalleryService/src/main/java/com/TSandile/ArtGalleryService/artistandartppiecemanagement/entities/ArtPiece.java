package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
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

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id",
    referencedColumnName = "id")
    private ImageData imageData;

//    @Lob
//    private byte[] imageUrl;


    public ArtPiece(String title, String description,Artist newArtist){
        this.title = title;
        this.description = description;
        this.artist = newArtist;
     //   this.imageUrl = imageUrl;
    }





}
