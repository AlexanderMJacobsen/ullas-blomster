DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS product;

CREATE TABLE product (
                         id SERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         description TEXT,
                         price DECIMAL(10, 2) NOT NULL,
                         image_url VARCHAR(500),
                         product_type VARCHAR(50),
                         category VARCHAR(50),
                         occasion VARCHAR(50)
);

INSERT INTO product (name, description, price, image_url, product_type, category, occasion)
VALUES
    ('Rød Elegance', 'Classic red roses bouquet', 299.00, 'https://picsum.photos/id/152/800/800', 'BOUQUET', 'FLOWERS', 'ROMANCE'),
    ('Hvid Fred', 'Respectful funeral arrangement', 450.00, 'https://picsum.photos/id/306/800/800', 'BOUQUET', 'FLOWERS', 'FUNERAL'),
    ('Birthday Joy', 'Colorful bouquet for celebrations', 199.50, 'https://picsum.photos/id/629/800/800', 'BOUQUET', 'FLOWERS', 'BIRTHDAY'),
    ('Graduation Dream', 'Celebrate the big day', 350.00, 'https://picsum.photos/id/429/800/800', 'BOUQUET', 'FLOWERS', 'GRADUATION'),
    ('Wedding Bliss', 'White lilies and baby breath', 599.00, 'https://picsum.photos/id/824/800/800', 'BOUQUET', 'FLOWERS', 'WEDDING'),
    ('For Mom', 'Pink peonies and eucalyptus', 325.00, 'https://picsum.photos/id/106/800/800', 'BOUQUET', 'FLOWERS', 'MOTHERS_DAY');

INSERT INTO users (name, email, password, role) VALUES ('Test User', 'test@test.com', 'password', 'customer');
INSERT INTO carts (user_id, total_price) VALUES (1, 0.0);