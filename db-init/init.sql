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
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       first_name VARCHAR(255),
                       last_name VARCHAR(255),
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       role VARCHAR(255)
);

INSERT INTO users (first_name, last_name, email, password, role)
VALUES
    ('Raya', 'Test', 'raya@test.dk', '123456rd', 'CUSTOMER'),
    ('Jihad', 'Test', 'jihad@test.dk', '123456ja', 'CUSTOMER'),
    ('Alex', 'Test', 'alex@test.dk', '123456ax', 'CUSTOMER'),
    ('Tobias', 'Test', 'tobias@test.dk', '123456tb', 'CUSTOMER');

INSERT INTO product (name, description, price, image_url, product_type, category, occasion)
VALUES
    ('Rød Elegance', 'Classic red roses bouquet', 299.00, 'https://images.unsplash.com/photo-1548013146-72479768bbaa?auto=format&fit=crop&w=800&q=80', 'BOUQUET', 'FLOWERS', 'ROMANCE'),
    ('Hvid Fred', 'Respectful funeral arrangement', 450.00, 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80', 'BOUQUET', 'FLOWERS', 'FUNERAL'),
    ('Birthday Joy', 'Colorful bouquet for celebrations', 199.50, 'https://images.unsplash.com/photo-1596073413206-fb8997380a0a?auto=format&fit=crop&w=800&q=80', 'BOUQUET', 'FLOWERS', 'BIRTHDAY'),
    ('Graduation Dream', 'Celebrate the big day', 350.00, 'https://images.unsplash.com/photo-1523694553227-ec114999ef90?auto=format&fit=crop&w=800&q=80', 'BOUQUET', 'FLOWERS', 'GRADUATION'),
    ('Wedding Bliss', 'White lilies and baby breath', 599.00, 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80', 'BOUQUET', 'FLOWERS', 'WEDDING'),
    ('For Mom', 'Pink peonies and eucalyptus', 325.00, 'https://images.unsplash.com/photo-1525263139841-f11ae5ad10fe?auto=format&fit=crop&w=800&q=80', 'BOUQUET', 'FLOWERS', 'MOTHERS_DAY');

UPDATE product SET image_url = 'https://picsum.photos/id/152/800/800' WHERE name = 'Rød Elegance';
UPDATE product SET image_url = 'https://picsum.photos/id/306/800/800' WHERE name = 'Hvid Fred';
UPDATE product SET image_url = 'https://picsum.photos/id/629/800/800' WHERE name = 'Birthday Joy';
UPDATE product SET image_url = 'https://picsum.photos/id/429/800/800' WHERE name = 'Graduation Dream';
UPDATE product SET image_url = 'https://picsum.photos/id/824/800/800' WHERE name = 'Wedding Bliss';
UPDATE product SET image_url = 'https://picsum.photos/id/106/800/800' WHERE name = 'For Mom';