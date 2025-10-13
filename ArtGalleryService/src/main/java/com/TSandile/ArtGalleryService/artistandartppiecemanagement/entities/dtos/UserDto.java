package com.TSandile.ArtGalleryService.artistandartppiecemanagement.entities.dtos;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private String name;
    private String surname;
    private String email;
    private String password;
    private String type;
}
