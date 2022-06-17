



CREATE TABLE users(user_id SERIAL PRIMARY KEY,
username VARCHAR(15) NOT NULL,
email VARCHAR (70) UNIQUE NOT NULL,
password VARCHAR (400) NOT NULL,
role VARCHAR (10) DEFAULT 'user',
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE game(game_id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
provider_id INT NOT NULL REFERENCES provider(provider_id),
cover TEXT NOT NULL,
createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE group(group_id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
games TEXT[]);

CREATE TABLE provider(provider_id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
logo TEXT NOT NULL,
);