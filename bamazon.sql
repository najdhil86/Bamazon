drop database bamazon;
create database bamazon;

use bamazon;

create table product (
    item_id INT NOT NULL auto_increment,
    product_name varchar(255),
    department_name varchar(255),
    price INT not NULL,
    stock_quantity INT not NULL,

    primary key(item_id)
);

insert into product (product_name,department_name,price,stock_quantity) values ('headphones','audio',199.99,100), ('macbook pro','computers',1999.99,200), ('Nike HyperDunks','Shoes',139.99,1000),('foam roller','sports',19.99,500),('SanDisk 128 USB Drives','computers',19.99,300),('logitech mouse','computers',199.99,100),('vizio 60" tv','entertainment',599.99,9000),('vizio soundbar','entertainment',69.99,900), ('headphones','audio',199.99,100), ('headphones with extra bass','audio',399.99,100);