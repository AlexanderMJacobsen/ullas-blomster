package com.example.ullasblomsterapp.Model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class GiftBasket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private BigDecimal price;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Occasion occasion;

    // Tom konstruktør
    public GiftBasket() {
    }

    public GiftBasket(int id, String name, String description, BigDecimal price,
                      String imageUrl, Occasion occasion) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.occasion = occasion;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public String getImageUrl() { return imageUrl; }
    public Occasion getOccasion() { return occasion; }

    // Setters
    public void setId(int id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setOccasion(Occasion occasion) { this.occasion = occasion; }

    @Override
    public String toString() {
        return "GiftBasket{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}