const express = require('express');
const router = express.Router();
const session = require('express-session');
const request = require('request-promise');
const app = express();
const Store = require('data-store');
const store = new Store({ path: 'config.json' });

const mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "favorite_shopify"
});

// setting gena 
router.get('/',function(req,res){

    const shop = req.query.shop;

    var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(full_url);

    // var sql_add = "INSERT INTO favorite_products VALUE('1234567', 'Chân váy LD', 9.28, 1)";
    // conn.query(sql_add, function(err, results) {
    //     if (err) throw err;
    //     console.log(results);
    // });

    // var sql_update = "UPDATE favorite_products SET likes = 2 WHERE id = '1234567'";
    // conn.query(sql_add, function(err, results) {
    //     if (err) throw err;
    //     console.log(results);
    // });

    var sql = "SELECT id_prod, COUNT(id_prod) AS likes FROM favorite_products WHERE id_shop = '" + shop + "' GROUP BY id_prod ORDER BY likes DESC";
    conn.query(sql, function(err, results) {
        if (err) throw err;

        res.render('statistic-favorite', { title: 'Favorite Products' , favorite_prod : results , fullurl : full_url });
    });
});

router.get('/stat-by-cus',function(req,res){

    var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(full_url);

    var sql = "SELECT id_customer, GROUP_CONCAT(id_prod ORDER BY id_prod ASC) AS prod_likes FROM favorite_products WHERE id_shop = 'cowell-gec.myshopify.com' GROUP BY id_customer";
    conn.query(sql, function(err, results) {
        if (err) throw err;
        // console.log(results);
        res.render('stat-by-cus', { title: 'Statistic By Customer' , prod_likes : results , fullurl : full_url });
    });
});

module.exports = router;