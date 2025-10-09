package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Artist;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ArtistDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.artistRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.artistService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class artistServiceImp implements artistService {
    private final artistRepository artistRepository;

    @Override
    public String addArtist(ArtistDto artistDto) {
        if(artistDto != null){
            Artist newArtist = new Artist(
                    artistDto.getName(),
                    artistDto.getBiography()
                //    artistDto.getImageURL()
            );
            artistRepository.save(newArtist);
        }else{
            throw new NullPointerException("Entity passed is empty");
        }
        return "SUCCESS";
    }

    @Override
    public Artist getArtist(Long id) {
        return artistRepository.findById(id).orElse(null);
    }

    @Override
    public Artist updateArtist(Long id, ArtistDto artistDto) {
        Artist updated = new Artist();
        Optional<Artist> optionalArtist = artistRepository.findById(id);
        if(optionalArtist.isPresent()){
            Artist existingArtist = optionalArtist.get();

            existingArtist.setName(artistDto.getName());
            existingArtist.setBiography(artistDto.getBiography());
          //  existingArtist.setImageURL(artistDto.getImageURL());
            artistRepository.save(existingArtist);
            updated =  existingArtist;
           // System.out.println("Updated artist: " + updated);
        }
        return updated;

    }

    @Override
    public void deleteArtist(Long id) {
        if(!artistRepository.existsById(id)){
            throw new EntityNotFoundException("Artist with id: " + id + " not found");
        }
        artistRepository.deleteById(id);
    }
}
