package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.grammars.hql.HqlParser;

import java.awt.*;
import java.time.LocalDate;

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


    public Exhibition(String title, LocalDate startDate, LocalDate endDate, String status){
        this.title = title;
        this.start_date = startDate;
        this.end_date = endDate;
        this.status = status;
    };
}
