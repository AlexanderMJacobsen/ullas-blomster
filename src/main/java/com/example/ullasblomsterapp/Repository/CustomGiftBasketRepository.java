package com.example.ullasblomsterapp.Repository;

import com.example.ullasblomsterapp.Model.CustomGiftBasket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomGiftBasketRepository
        extends JpaRepository<CustomGiftBasket, Long> {
}