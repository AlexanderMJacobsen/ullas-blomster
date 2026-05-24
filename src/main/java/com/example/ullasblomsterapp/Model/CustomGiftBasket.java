package com.example.ullasblomsterapp.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "custom_gift_basket")
public class CustomGiftBasket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double totalPrice;

    private String itemsText;

    public CustomGiftBasket() {
    }

    public CustomGiftBasket(Long id, double totalPrice, String itemsText) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.itemsText = itemsText;
    }

    public Long getId() {
        return id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public String getItemsText() {
        return itemsText;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setItemsText(String itemsText) {
        this.itemsText = itemsText;
    }
}