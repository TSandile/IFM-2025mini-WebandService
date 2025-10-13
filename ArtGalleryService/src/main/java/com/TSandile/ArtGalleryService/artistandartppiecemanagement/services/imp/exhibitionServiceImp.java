package com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.imp;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.Exhibition;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos.ExhibitionDto;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.reposistories.exhibitionRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.services.exhibitionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class exhibitionServiceImp implements exhibitionService {
    private final exhibitionRepository exhibitionRepository;
    @Override
    public String addExhibition(ExhibitionDto exhibitionDto) {
        if(exhibitionDto != null){
            Exhibition newExhibition = new Exhibition(
                    exhibitionDto.getTitle(),
                    exhibitionDto.getStart_date(),
                    exhibitionDto.getEnd_date(),
                    exhibitionDto.getStatus()
            );
            exhibitionRepository.save(newExhibition);
        }else{
            throw new NullPointerException("Entity passed is empty");
        }

        return "Success";
    }

    @Override
    public Exhibition getExhibition(Long id) {
        return exhibitionRepository.findById(id).orElse(null);
    }

    @Override
    public Exhibition updateExhibition(Long id, ExhibitionDto exhibitionDto) {
        Exhibition updated = new Exhibition();
        Optional<Exhibition> optionExhibition = exhibitionRepository.findById(id);
        if(optionExhibition.isPresent()){
            Exhibition existingExhibition = optionExhibition.get();

            existingExhibition.setTitle(exhibitionDto.getTitle());
            existingExhibition.setDescription(exhibitionDto.getDescription());
            existingExhibition.setStart_date(exhibitionDto.getStart_date());
            existingExhibition.setEnd_date(exhibitionDto.getEnd_date());
            existingExhibition.setStatus(exhibitionDto.getStatus());
            existingExhibition.setImageData(exhibitionDto.getImageData());
            exhibitionRepository.save(existingExhibition);
            updated = existingExhibition;
        }

        return updated;
    }

    @Override
    public List<Exhibition> getAllExhibitions() {
        return exhibitionRepository.findAll();
    }

    @Override
    public void deleteExhibition(Long id) {
        if(!exhibitionRepository.existsById(id)){
            throw new EntityNotFoundException("Exhibition with Id: " + id + " not found");
        }
        exhibitionRepository.deleteById(id);
    }
}
