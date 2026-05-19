package com.example.ullasblomsterapp.Model;
import jakarta.persistence.*;


@Entity
@Table(name = "cart_items")
    public class CartItem {

    @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart cart;


    private Integer productId;
    private Integer quantity;
    private double price;

    public CartItem() {}

    public CartItem(Integer id, Integer productId, Integer quantity, double price) {
            this.id = id;
            this.productId = productId;
            this.quantity = quantity;
            this.price = price;
        }

        public Integer getId() { return id; }
        public void setId(Integer id) { this.id = id; }

    public Cart getCart() { return cart; }
    public void setCart(Cart cart) { this.cart = cart; }


    public Integer getProductId() { return productId; }
        public void setProductId(int productId) { this.productId = productId; }

        public Integer getQuantity() { return quantity; }
        public void setQuantity(int quantity) { this.quantity = quantity; }

        public double getPrice() { return price; }
        public void setPrice(double price) { this.price = price; }
    }

