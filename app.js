var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',function(req,res){
  res.send('This is the Home Page');
});

app.post('/add',function(req, res, next) {
  try {
    console.log("Add this product: ",req.body);
    return res.json({
      "isSuccess": true
    });
  } catch (err) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});

app.get('/products/:productName',function(req,res){
  try {
    console.log("product name: ",req.params.productName);
    return res.json({
      "isSuccess": true
    });
  } catch (err) {
    res.status(400).json({
      isSuccess: false,
    });
  }
});


app.listen(3000);
console.log("Server running at port: 3000");