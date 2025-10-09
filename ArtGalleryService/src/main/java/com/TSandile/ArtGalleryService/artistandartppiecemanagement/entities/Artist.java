package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.ArtPiece;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Data
@Entity
public class Artist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String biography;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "imageId",
    referencedColumnName = "id")
    private ImageData imageData;

//    @Lob
//    private byte[] imageURL;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "artP_id",
                referencedColumnName = "id")
    private List<ArtPiece> artPieces;

    public Artist(){}
    public Artist(String name, String biography){
        this.name = name;
        this.biography = biography;
       // artPieces = new ArrayList<>();
    }

    public Artist(String name,String biography, ImageData imageData){
        this.name = name;
        this.biography = biography;
        this.imageData = imageData;
    }

//    public Artist(String name, String biography, byte[] image){
//        this.name = name;
//        this.biography = biography;
//        this.imageURL = image;
//    }

    protected void addArtPiece(ArtPiece artPiece){
        artPieces.add(artPiece);
    }
    /*
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    } */


}
