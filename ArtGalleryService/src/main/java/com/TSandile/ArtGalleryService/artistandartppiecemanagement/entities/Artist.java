package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;

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
    private String imageURL;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "artP_id",
                referencedColumnName = "id")
    private List<ArtPiece> artPieces;

    public Artist(){}
    public Artist(String name, String biography){
        this.name = name;
        this.biography = biography;
        artPieces = new ArrayList<>();
    }

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
