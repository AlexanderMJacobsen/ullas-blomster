package com.example.ullasblomsterapp.Model;

import jakarta.persistence.*;

@Entity
public class CustomerPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    private User user;

    private String favoriteOccasion;

    private String favoriteFlowerType;

    private String favoriteColor;

    private boolean newsletterConsent;

    public CustomerPreference() {
    }

    public int getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFavoriteOccasion() {
        return favoriteOccasion;
    }

    public void setFavoriteOccasion(String favoriteOccasion) {
        this.favoriteOccasion = favoriteOccasion;
    }

    public String getFavoriteFlowerType() {
        return favoriteFlowerType;
    }

    public void setFavoriteFlowerType(String favoriteFlowerType) {
        this.favoriteFlowerType = favoriteFlowerType;
    }

    public String getFavoriteColor() {
        return favoriteColor;
    }

    public void setFavoriteColor(String favoriteColor) {
        this.favoriteColor = favoriteColor;
    }

    public boolean isNewsletterConsent() {
        return newsletterConsent;
    }

    public void setNewsletterConsent(boolean newsletterConsent) {
        this.newsletterConsent = newsletterConsent;
    }
}
