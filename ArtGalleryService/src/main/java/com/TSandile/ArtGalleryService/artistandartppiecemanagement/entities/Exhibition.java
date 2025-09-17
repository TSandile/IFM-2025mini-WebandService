package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities;

import jakarta.persistence.Entity;
import lombok.Data;
import org.hibernate.grammars.hql.HqlParser;

import java.time.LocalDate;


//@Entity
@Data
public class Exhibition {
    private Long id;
    // title,description, start_date, end_date, status
    private String title;

    // format: YYYY-MM-DD.
    private LocalDate start_date;
    private LocalDate end_date;
    private ExhibitionStatus status;

    public Exhibition(){};

    public Exhibition(String title, ExhibitionStatus status){
        this.title = title;
        this.start_date = LocalDate.now();
        this.status = status;
    };
}
