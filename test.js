var mysql = require('mysql');
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'bamazon',
  port : 3306
});

connection.connect();

connection.query('SELECT * FROM product', function(error, results, fields) {
  if (error) throw error;

  
  results[0].item_id
  results[0].price

  for(let i = 0; i < results.length; i++) {

    console.log('---------')
    console.log("~Product ID~: " + results[i].item_id + " ~Product Name~: " + results[i].product_name + " ~Product Price~: " + results[i].price);
    console.log('---------')


  }
});


function buyProduct(id,user_quantity){
  connection.query('SELECT * FROM product WHERE item_id = ?',[id],function(error,buy_results,fields){
    
    var item_id = buy_results[0].item_id;
    var stock_quantity = buy_results[0].stock_quantity;
    var updated_quantity = stock_quantity - user_quantity;
    var price = buy_results[0].price;
    var user_pricetotal = price * user_quantity;

    if (user_quantity > stock_quantity){
      console.log("Insufficient quantity");
      connection.end();
    } else{
      
      connection.query('UPDATE product SET stock_quantity = ? WHERE item_id = ?',[updated_quantity,item_id],function(error,update_results,fields){
        
        console.log("Product has been bought!!!")
        console.log("Your total is " + user_pricetotal);
  
      })

      connection.end();
    }

  })
}

function AskUsers(){
  var question = [
    {type: "input",message: "What is the product id you would like to buy? ",name: "user_item_id"},
    {type: "input",message: "How many would you like  to buy ? ",name: "user_item_quantity"},
  ];
  inquirer
  .prompt(question)
  .then(function(uresp){
    var item_id = parseInt(uresp.user_item_id)
    var item_quantity = parseInt(uresp.user_item_quantity)

    buyProduct(item_id,item_quantity);
  })
}

AskUsers();