package com.example.ullasblomsterapp.Repository;

import com.example.ullasblomsterapp.Model.GiftBasket;
import com.example.ullasblomsterapp.Model.Occasion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface GiftBasketRepository extends JpaRepository<GiftBasket, Long> {
    List<GiftBasket> findByOccasion(Occasion occasion);
}