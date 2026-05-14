package com.example.ullasblomsterapp.Controller;// denne version bruger repository

import com.example.ullasblomsterapp.Model.Product;
import com.example.ullasblomsterapp.Repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        repository.save(product);
        return product;
    }
}

// denne version bruger service
// jeg kan ikke helt bedømme hvad er bedre så tager dem begge med og i må afgøre

//package com.example.ullasdemo.controller;
//
//import com.example.ullasdemo.model.Product;
//import com.example.ullasdemo.model.ProductType;
//import com.example.ullasdemo.service.ProductService;
//import org.springframework.web.bind.annotation.*;
//
//        import java.util.List;
//
//@RestController
//@RequestMapping("/api/products")
//public class ProductController {
//
//    private final ProductService service;
//
//    public ProductController(ProductService service) {
//        this.service = service;
//    }
//
//    // Hent alle produkter
//    @GetMapping
//    public List<Product> getAllProducts() {
//        return service.getAllProducts();
//    }
//
//    // Opret produkt
//    @PostMapping
//    public Product createProduct(@RequestBody Product product) {
//        return service.saveProduct(product);
//    }
//
//    // Hent produkter efter type
//    @GetMapping("/type/{type}")
//    public List<Product> getByType(@PathVariable ProductType type) {
//        return service.getProductsByType(type);
//    }
//}