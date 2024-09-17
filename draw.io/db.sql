CREATE TABLE dormitory(
    id SERIAL PRIMARY KEY,
    address TEXT
);

CREATE TABLE room(
    id SERIAL PRIMARY KEY,
    number INT,
    floor INT,
    capacity INT,
    price FLOAT,
    dormitory_id INT,
    FOREIGN KEY (dormitory_id) REFERENCES dormitory(id)
);

CREATE TABLE student(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT
);

CREATE TABLE payment_history(
    id SERIAL PRIMARY KEY,
    room_id INT,
    amount FLOAT,
    FOREIGN KEY (room_id) REFERENCES room(id)
);

CREATE TABLE info(
    id SERIAL PRIMARY KEY REFERENCES student(id),
    first_name TEXT,
    last_name TEXT,
    payment_history_id INT UNIQUE,
    FOREIGN KEY (payment_history_id) REFERENCES payment_history(id)
);