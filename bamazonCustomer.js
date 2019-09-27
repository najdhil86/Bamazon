var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon",
  port: 3306
});

connection.connect();

connection.query("SELECT * FROM product", function(error, results, fields) {
  if (error) throw error;

  results[0].item_id;
  results[0].price;

<<<<<<< HEAD
  ShowAllProduct();
  buyProduct();
=======
  for (let i = 0; i < results.length; i++) {
    console.log("---------");
    console.log(
      "~Product ID~: " +
        results[i].item_id +
        " ~Product Name~: " +
        results[i].product_name +
        " ~Product Price~: " +
        results[i].price
    );
    console.log("---------");
  }
>>>>>>> 7cabcb650b101e0664ed9e8c675d0798e90cd5ca
});

function buyProduct(id, user_quantity) {
  connection.query("SELECT * FROM product WHERE item_id = ?", [id], function(
    error,
    buy_results,
    fields
  ) {
    var item_id = buy_results[0].item_id;
    var stock_quantity = buy_results[0].stock_quantity;
    var updated_quantity = stock_quantity - user_quantity;
    var price = buy_results[0].price;
    var user_pricetotal = price * user_quantity;

<<<<<<< HEAD
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
=======
    if (user_quantity > stock_quantity) {
      console.log("Insufficient quantity");
      connection.end();
    } else {
      connection.query(
        "UPDATE product SET stock_quantity = ? WHERE item_id = ?",
        [updated_quantity, item_id],
        function(error, update_results, fields) {
          console.log("Product has been bought!!!");
          console.log("Your total is " + user_pricetotal);
        }
      );

      connection.end();
    }
  });
}

function AskUsers() {
  var question = [
    {
      type: "input",
      message: "What is the product id you would like to buy? ",
      name: "user_item_id"
    },
    {
      type: "input",
      message: "How many would you like  to buy ? ",
      name: "user_item_quantity"
    }
  ];
  inquirer.prompt(question).then(function(uresp) {
    var item_id = parseInt(uresp.user_item_id);
    var item_quantity = parseInt(uresp.user_item_quantity);
>>>>>>> 7cabcb650b101e0664ed9e8c675d0798e90cd5ca

    buyProduct(item_id, item_quantity);
  });
}

AskUsers();
