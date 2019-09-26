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

  ShowAllProduct();
  buyProduct();
});

// select everything from tables

function ShowAllProduct() { 
  connection.query('SELECT item_id, product_name, price FROM product', function (error,results,fields) {
    if (error) throw error;
    console.table(results);
  }
  );
}
//main function. Here we use inquirer to
function buyProduct() {
  var questions = [
    {type: "input",message: "What is the product id you would like to buy? ",name: "user_item_id"},
    {type: "input",message: "How many would you like to buy ? ",name: "user_item_quantity"}
  ];
  
  inquirer
  .prompt(questions)
  .then(function(response) {
    var user_item_id = response.user_item_id;
    var user_item_quantity = response.user_item_quantity;
    

    connection.query('SELECT item_id, product_name, price,stock_quantity FROM product WHERE item_id = ?',[user_item_id], function(error,results,fields) {

      
      var product_quantity = results[0].stock_quantity;
      var product_price = results[0].price;
      var total_price = product_price* user_item_quantity;
      var new_quantity = product_quantity - user_item_quantity;
      var user_item_id_parse = parseInt(response.user_item_id);
      
      if (user_item_quantity <= product_quantity){
        
        connection.query("UPDATE product SET stock_quantity = ? WHERE item_id = ?",[new_quantity,user_item_id_parse],function (err,results){
          console.log("The total price of purchase is "+ total_price);
          console.log("New Quantity of the product left "+ new_quantity);
        })
      } else {
        console.log("Insufficient quantity!")
      }

    })
    connection.end();
  });
}

