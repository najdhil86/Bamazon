var mysql = require('mysql');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tJvnjAtbMWtqW9HmmZBDGiZk',
  database : 'bamazon',
  port : 3306
});

connection.connect();

// select everything from tables

function showAllItems() { 
  connection.query('SELECT item_id, product_name, price FROM product', function (error,results,fields) {
    if (error) throw error;
    console.log(results);
  });
}
//select the item_id, product_name, and price columns of the product table based off of ID

// update query based off of id
function UpdateQuantityofProduct(id,quantity) { 
  connection.query('UPDATE product SET stock_quantity = stock_quantity - ? WHERE item_id = ?;',[id,quantity], function (error,results,fields) {
    if (error) throw error;
    console.log(results);
  });
}

// SELECT item_id, product_name, price FROM product WHERE item_id = ?
function whatDoWantToBuyByID() {
  var questions = [
    {type: "input",message: "What is the product id you would like to buy? ",name: "user_item_id"},
    {type: "input",message: "How many would you like  to buy ? ",name: "user_item_quantity"},
  ];
  
  inquirer
  .prompt(questions)
  .then(function(response) {
    var user_item_id = response.user_item_id;
    var user_item_quantity = response.user_item_quantity;
    console.log(response);
    SelectItemByID(user_item_id);
  });
}

function SelectItemByID(id,quantity) { 
  connection.query('SELECT item_id, product_name, price,stock_quantity FROM product WHERE item_id = ?',[id], function (error,results,fields) {
    if (error) throw error;
    console.log(results[0]);
  });
}

whatDoWantToBuyByID();



// connection.end();

