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

router.get('/',function(req,res){

	const shop = req.query.shop;

    var full_url = req.protocol + '://' + req.get('host') + req.originalUrl;
    // console.log(full_url);

    var sql = "SELECT id_customer, GROUP_CONCAT(id_prod ORDER BY id_prod ASC SEPARATOR ' - ') AS prod_likes FROM favorite_products WHERE id_shop = '" + shop + "' GROUP BY id_customer";
    conn.query(sql, function(err, results) {
        if (err) throw err;
        // console.log(results);
        res.render('stat-by-cus', { title: 'Statistic By Customer' , prod_likes : results , fullurl : full_url });
    });
});

module.exports = router;