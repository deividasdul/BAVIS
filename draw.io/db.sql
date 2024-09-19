DROP TABLE IF EXISTS contact CASCADE;
DROP TABLE IF EXISTS dormitory CASCADE;
DROP TABLE IF EXISTS payment_history CASCADE;
DROP TABLE IF EXISTS room CASCADE;
DROP TABLE IF EXISTS stay CASCADE;
DROP TABLE IF EXISTS user CASCADE;

CREATE TABLE dormitory (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL
);

CREATE TABLE room (
    id SERIAL PRIMARY KEY,
    number INT NOT NULL,
    floor INT NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0),
    price FLOAT NOT NULL CHECK (price >= 0),
    dormitory_id INT NOT NULL,
    FOREIGN KEY (dormitory_id) REFERENCES dormitory(id)
);

CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id)
);

CREATE TABLE stay (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL CHECK (departure_date > arrival_date),
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE payment_history (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    amount FLOAT NOT NULL CHECK (amount >= 0),
    user_id INT NOT NULL,
    payment_date DATE NOT NULL,
    stay_id INT NOT NULL,
    FOREIGN KEY (room_id) REFERENCES room(id),
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (stay_id) REFERENCES stay(id)
);