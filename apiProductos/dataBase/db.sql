CREATE DATABASE Comercializadora;

USE Comercializadora;


CREATE TABLE users (
  id INT(30) NOT NULL PRIMARY KEY,
  description TEXT,
  valor_unitario DOUBLE NOT NULL,
  estado INT(2)
);