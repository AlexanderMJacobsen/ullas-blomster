package com.example.ullasblomsterapp.Service;

import com.example.ullasblomsterapp.Model.Product;
import com.example.ullasblomsterapp.Model.ProductType;
import com.example.ullasblomsterapp.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    // 1. Hent alle produkter
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    // 2. Filtrer produkter efter type
    public List<Product> getProductsByType(ProductType type) {
        return repository.findAll()
                .stream()
                .filter(product -> product.getProductType() == type)
                .collect(Collectors.toList());
    }
}
