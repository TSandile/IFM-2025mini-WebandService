package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Exhibition;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ExhibitionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface exhibitionService {
    public String addExhibition(ExhibitionDto exhibitionDto);
    public Exhibition getExhibition(Long id);
    public Exhibition updateExhibition(Long id, ExhibitionDto exhibitionDto);
    public List<Exhibition> getAllExhibitions();
    public void deleteExhibition(Long id);
}
