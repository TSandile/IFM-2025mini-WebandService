package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Registration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne      //many registration to a sing exhibition
    @JoinColumn(name = "exhibition_id",
    referencedColumnName = "id")
    private Exhibition exhibition;

    @ManyToOne
    @JoinColumn(name = "visitor_id",
    referencedColumnName = "id")
    private User actualVisitor;

    private int numberOfPeople;     // 1 or more

    public Registration(Exhibition exhibition, User visitor, int numberOfPeople){
        this.exhibition = exhibition;
        this.actualVisitor = visitor;
        this.numberOfPeople = numberOfPeople;
    }

}
