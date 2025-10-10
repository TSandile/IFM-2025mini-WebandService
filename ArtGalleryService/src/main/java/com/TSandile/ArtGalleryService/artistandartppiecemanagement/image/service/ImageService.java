package com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.service;

import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.entity.ImageData;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.repository.ImageRepository;
import com.TSandile.ArtGalleryService.artistandartppiecemanagement.image.util.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    public String uploadImage(MultipartFile file) throws IOException {
       ImageData imageData =  imageRepository.save(ImageData.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .imageData(ImageUtils.compressImage(file.getBytes())).build());
       if(imageData != null){
           return "file uploaded successfully : " + file.getOriginalFilename();
       }
       return null;
    }

    public byte[] downloadImage(String fileName){
        Optional<ImageData> dbImageData = imageRepository.findByName(fileName);
        byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
        return images;
    }

    public byte[] downloadById(Long id){
        Optional<ImageData> dbImageData = imageRepository.findById(id);
            byte[] images = ImageUtils.decompressImage(dbImageData.get().getImageData());
            return images;
        }
    }



