package com.example.ullasblomsterapp.Controller;

import com.example.ullasblomsterapp.Model.Cart;
import com.example.ullasblomsterapp.Model.CartItem;
import com.example.ullasblomsterapp.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/{userId}")
    public ResponseEntity<Cart> getCart(@PathVariable int userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/{cartId}/items")
    public ResponseEntity<Cart> addItem(@PathVariable int cartId, @RequestBody CartItem item) {
        return ResponseEntity.ok(cartService.addItem(cartId, item));
    }

    @DeleteMapping("/{cartId}/items/{itemId}")
    public ResponseEntity<Cart> removeItem(@PathVariable int cartId, @PathVariable int itemId) {
        return ResponseEntity.ok(cartService.removeItem(cartId, itemId));
    }

    @PutMapping("/{cartId}/items/{itemId}")
    public ResponseEntity<Cart> updateQuantity(@PathVariable int cartId, @PathVariable int itemId, @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(cartId, itemId, quantity));
    }

    @DeleteMapping("/{cartId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable int cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.noContent().build();
    }
}
