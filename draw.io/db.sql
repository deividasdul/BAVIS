CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
);

CREATE TABLE contact (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    user_id INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE dormitory (
    id SERIAL PRIMARY KEY,
    address TEXT NOT NULL
);

CREATE TABLE room (
    id SERIAL PRIMARY KEY,
    number TEXT NOT NULL,
    floor INT NOT NULL,
    capacity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    dormitory_id INT,
    FOREIGN KEY (dormitory_id) REFERENCES dormitory(id) ON DELETE CASCADE
);

CREATE TABLE stay (
    id SERIAL PRIMARY KEY,
    user_id INT,
    room_id INT,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES room(id) ON DELETE CASCADE
);

CREATE TABLE payment_history (
    id SERIAL PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    stay_id INT,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY (stay_id) REFERENCES stay(id) ON DELETE CASCADE
);