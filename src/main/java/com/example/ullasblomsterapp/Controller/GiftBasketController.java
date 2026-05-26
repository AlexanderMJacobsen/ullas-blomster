package com.example.ullasblomsterapp.Controller;

import com.example.ullasblomsterapp.Model.GiftBasket;
import com.example.ullasblomsterapp.Model.Occasion;
import com.example.ullasblomsterapp.Service.GiftBasketService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/giftbaskets")
@CrossOrigin
public class GiftBasketController {

    private final GiftBasketService service;

    public GiftBasketController(GiftBasketService service) {
        this.service = service;
    }

    @GetMapping
    public List<GiftBasket> getGiftBaskets(@RequestParam(required = false) Occasion occasion) {
        if (occasion != null) {
            return service.getGiftBasketsByOccasion(occasion);
        }
        return service.getAllGiftBaskets();
    }

    @PostMapping
    public GiftBasket createGiftBasket(@RequestBody GiftBasket giftBasket) {
        return service.saveGiftBasket(giftBasket);
    }
}