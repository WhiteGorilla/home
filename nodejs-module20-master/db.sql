CREATE DATABASE JS29;

CREATE DATABASE JS30test;
DROP DATABASE JS30test;

SHOW DATABASES;

USE JS29;
CREATE TABLE Customers (
  PersonID int NOT NULL,
  LastName varchar(255) NOT NULL,
  FirstName varchar(255),
  Address varchar(255)
);

CREATE TABLE BadCustomers (
  PersonID int,
  LastName varchar(255),
  FirstName varchar(255),
  Address varchar(255)
);
DROP TABLE BadCustomers; 

ALTER TABLE Customers
ADD CustomerCity varchar(255); 

ALTER TABLE Customers
DROP COLUMN CustomerCity; 

ALTER TABLE Customers
ADD DateOfBirth date; 

ALTER TABLE Customers
MODIFY DateOfBirth year;

ALTER TABLE Customers
ADD UNIQUE (PersonID); 

SELECT FirstName, Address FROM Customers;

INSERT INTO Customers (PersonID, LastName, FirstName, Address, DateOfBirth)
VALUES(1, 'Ivanov', 'Ivan', 'Kharkiv', 1987),
(2, 'Petrov', 'Petr', 'Dnipro', 1986),
(3, 'Sidorov', 'Sidor', 'Sumy', 1988);

UPDATE Customers
SET LastName = 'Markov', FirstName = 'Mark', Address = 'Krakow'
WHERE PersonID = 1;

DELETE FROM Customers
WHERE Address = "Sumy";

CREATE TABLE Orders (
  PersonID int NOT NULL,
  ProductName varchar(255) NOT NULL,
  OrderDate date,
  Address varchar(255)
);

INSERT INTO Orders (PersonID, ProductName, OrderDate, Address)
VALUES(1, 'car', 19960918, 'Kharkiv'),
(2, 'ball', 19960918, 'Dnipro'),
(3, 'notebook', 19960918, 'Sumy');

SELECT Orders.PersonID, Orders.ProductName, Orders.OrderDate, Orders.Address
FROM Orders
INNER JOIN Customers ON Orders.PersonID=Customers.PersonID;