package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtistDto;

import java.util.List;

public interface artistService {
    public String addArtist(ArtistDto artistDto);
    public Artist getArtist(Long id);
    public Artist updateArtist(Long id, ArtistDto artistDto);
    public void deleteArtist(Long id);
    public List<Artist> getAllArtist();

   // public List<Artist> getAllArtists();
}
