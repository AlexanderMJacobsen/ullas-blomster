package com.example.ullasblomsterapp.Repository;

import com.example.ullasblomsterapp.Model.CustomGiftBasket;
import org.springframework.data.jpa.repository.JpaRepository;

//Interface repository med JPA
public interface CustomGiftBasketRepository
        extends JpaRepository<CustomGiftBasket, Long> {
}