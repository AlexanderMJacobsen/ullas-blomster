package com.example.ullasblomsterapp.Controller;

import com.example.ullasblomsterapp.Model.CustomGiftBasket;
import com.example.ullasblomsterapp.Service.CustomGiftBasketService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/custom-gift-baskets")
public class CustomGiftBasketController {

    private final CustomGiftBasketService customGiftBasketService;

    public CustomGiftBasketController(CustomGiftBasketService customGiftBasketService) {
        this.customGiftBasketService = customGiftBasketService;
    }

    @PostMapping
    public CustomGiftBasket createGiftBasket(
            @RequestBody CustomGiftBasket giftBasket
    ) {
        return customGiftBasketService.saveGiftBasket(giftBasket);

    }
}