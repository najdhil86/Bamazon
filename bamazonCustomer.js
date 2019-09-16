var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'secret',
    database : 'my_db'
  });
   
  connection.connect();