package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.CustomGiftBasket;
import com.example.ullasblomsterapp.Repository.CustomGiftBasketRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomGiftBasketService {

    private final CustomGiftBasketRepository customGiftBasketRepository;

    public CustomGiftBasketService(CustomGiftBasketRepository customGiftBasketRepository) {
        this.customGiftBasketRepository = customGiftBasketRepository;
    }

    public CustomGiftBasket saveGiftBasket(CustomGiftBasket giftBasket) {
        return customGiftBasketRepository.save(giftBasket);
    }
}