package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.Cart;
import com.example.ullasblomsterapp.Model.CartItem;
import com.example.ullasblomsterapp.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart getCart(int userId) {
        return cartRepository.findByUserId(userId);
    }

    public Cart addItem(int cartId, CartItem item) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        cart.getCartItems().add(item);
        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart removeItem(int cartId, int itemId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        cart.getCartItems().removeIf(item -> item.getId() == itemId);
        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    public Cart updateQuantity(int cartId, int itemId, int newQuantity) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        cart.getCartItems().stream()
                .filter(item -> item.getId() == itemId)
                .findFirst()
                .ifPresent((CartItem item) -> item.setQuantity(newQuantity));
        recalculateTotal(cart);
        return cartRepository.save(cart);
    }

    public void clearCart(int cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        cart.getCartItems().clear();
        cart.setTotalPrice(0.0);
        cartRepository.save(cart);
    }

    private void recalculateTotal(Cart cart) {
        double total = cart.getCartItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        cart.setTotalPrice(total);
    }
}
