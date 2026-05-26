package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.GiftBasket;
import com.example.ullasblomsterapp.Model.Occasion;
import com.example.ullasblomsterapp.Repository.GiftBasketRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GiftBasketService {

    private final GiftBasketRepository repository;

    public GiftBasketService(GiftBasketRepository repository) {
        this.repository = repository;
    }

    public List<GiftBasket> getAllGiftBaskets() {
        return repository.findAll();
    }

    public List<GiftBasket> getGiftBasketsByOccasion(Occasion occasion) {
        return repository.findByOccasion(occasion);
    }

    public GiftBasket saveGiftBasket(GiftBasket giftBasket) {
        return repository.save(giftBasket);
    }
}