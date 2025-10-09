package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.grammars.hql.HqlParser;

import java.awt.*;
import java.time.LocalDate;


@Entity
@Data
public class Exhibition {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // title,description, start_date, end_date, status
    private String title;
    // format: YYYY-MM-DD.
    private LocalDate start_date;
    private LocalDate end_date;
    private ExhibitionStatus status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "image_id",
    referencedColumnName = "id")
    private ImageData imageData;

    public Exhibition(){};

    public Exhibition(String title, LocalDate startDate, LocalDate endDate, ExhibitionStatus status){
        this.title = title;
        this.start_date = startDate;
        this.end_date = endDate;
        this.status = status;
    };
}
