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

  // connection.query('SELECT * FROM product', function (error,results,fields) {
  //   if (error) throw error;
  //     console.log(results);
  // });
  // function showAllItems() { 
  //   connection.query('SELECT item_id, product_name, price FROM product', function (error,results,fields) {
  //     if (error) throw error;
  //       console.log(results);
  //   });
  // }
  function showAllItems() { 
    connection.query('SELECT item_id, product_name, price FROM product', function (error,results,fields) {
      if (error) throw error;
        console.log(results);
    });
  }
  
  // showAllItems();
  
  function SelectItemByID(id) { 
    connection.query('SELECT item_id, product_name, price FROM product WHERE item_id = ?',[id], function (error,results,fields) {
      if (error) throw error;
        console.log(results);
    });
  }

  function whatDoWantToBuyByID() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the product id you would like to buy? ",
          name: "user_item_id"
        }
      ])
      .then(function(response) {
        SelectItemByID(response.user_item_id);
      });
  }

  whatDoWantToBuyByID();

  function HowManyUnits() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "How many units of the product they would like to buy? ",
          name: "user_item_unit"
        }
      ])
  }


  
  connection.end();

