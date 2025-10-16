package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Exhibition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private  String description ;
    private String title;
    // format: YYYY-MM-DD.
    private LocalDate start_date;
    private LocalDate end_date;
    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id",
    referencedColumnName = "id")
    private ImageData imageData;

    //one-to-many relationship to art piece
    @OneToMany(
            mappedBy = "exhibition",
            cascade = CascadeType.ALL,
            orphanRemoval = false   // artPieces removed from the list should not be deleted right on that event
    )
    @JsonManagedReference       //serialize collection
    private List<ArtPiece> artPieces = new ArrayList<ArtPiece>();



    public Exhibition(String title, LocalDate startDate, LocalDate endDate, String status){
        this.title = title;
        this.start_date = startDate;
        this.end_date = endDate;
        this.status = status;
    };

    public void addArtPiece(ArtPiece artPiece){
        artPieces.add(artPiece);
        artPiece.setExhibition(this);
    }

    public void removeArtPiece(ArtPiece artPiece) {
        artPieces.remove(artPiece);
        artPiece.setExhibition(null);
    }


}
