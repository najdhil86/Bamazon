var mysql = require('mysql');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tJvnjAtbMWtqW9HmmZBDGiZk',
  database : 'bamazon',
  port : 3306
});

connection.connect(function(err){
  if (err) throw err;

  showAllItems();
  whatDoWantToBuyByID()
});

// select everything from tables

function showAllItems() { 
  connection.query('SELECT item_id, product_name, price FROM product', function (error,results,fields) {
    if (error) throw error;

    for(let i = 0; i<results.length; i++){
      console.log("Product Name: " + results[i].product_name);
      console.log("Product ID Number: " + results[i].item_id);
    }
  });
}

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
    

    connection.query('SELECT item_id, product_name, price,stock_quantity FROM product WHERE item_id = ?',[user_item_id], function(error,results,fields) {

      // console.log(results);
      var product_quantity = results[0].stock_quantity;
      var product_price = results[0].price;
      var total_price = product_price*user_item_quantity;
      var new_quantity = product_quantity - user_item_quantity;
      
      if (product_quantity > user_item_quantity) {
        connection.query("UPDATE product SET stock_quantity = ? WHERE item_id = ?",[new_quantity,response.user_item_id],function (err,results){
          console.log("The total price of purchase is "+ total_price);
        })
      } else {
        console.log("Insufficient quantity!")
      }

    })
    connection.end();
  });
}
// connection.end();

