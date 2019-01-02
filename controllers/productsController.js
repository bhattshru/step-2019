var dbService= require("../services/dbService"),
STATUS_CODE = require("../constants/statusCodes").STATUS_CODE;

 exports.getAllProducts = function(req, res, next) {
   try {
     // Get the documents collection
     var db=dbService.database;
     var productsCollection = db.collection("products");
     productsCollection.find().toArray().then(result=>{
             res.json({
               isSuccess: true,
               data: result
             });
     }).catch(err=>{
       console.log(err);
       res.status(500).json({
         isSuccess: false,
         error: STATUS_CODE.DB_ERROR
       });
     });
   } catch (err) {
     res.status(400).json({
       isSuccess: false,
       error: STATUS_CODE.SERVER_ERROR
     });
   }
 };

 exports.addNewProduct = function(req, res, next) {
   try {
      var product = req.body;
      //add new conditions for product
      if (!product.name || !product.imageUrl || !product.brand ||
          !product.rating || !product.color ||
          !product.size || !product.category || !product.description ||  !product.price ) {
          res.status(400).json({
            isSuccess: false,
            error: STATUS_CODE.INSUFFICIENT_PARAMS
          });
        } else {
          var db=dbService.database;
          console.log(product);
          var productsCollection = db.collection("products");

          productsCollection.insert(product).then(save_data=>{
            console.log('isSuccess',save_data)
            return res.json({
              "isSuccess": true
            });
          }).catch(err=>{
            console.log('isnotSuccess DB_ERROR',err)

            return res.status(500).json({
              isSuccess: false,
              error: STATUS_CODE.DB_ERROR
            });
          });
        }
      } catch (err) {
        console.log('isnotSuccess SERVER_ERROR',err)

        res.status(500).json({
          isSuccess: false,
          error: STATUS_CODE.SERVER_ERROR
        });
      }
  };

  exports.getProductDetails = function(req, res, next) {
    try {
      console.log(decodeURIComponent(req.params.productName));
      var db=dbService.database;
      var productsCollection = db.collection("products");
      productsCollection.find({ name: req.params.productName.trim() }).toArray().then(result=>{
        if (result.length > 0) {
          res.json({
            isSuccess: true,
            data: result[0]
          });
        } else {
          res.status(400).json({
            isSuccess: false,
            error: STATUS_CODE.PRODUCT_NOT_FOUND
          });
        }
      }).catch(err=>{
        console.log(err);
        res.status(500).json({
          isSuccess: false,
          error: STATUS_CODE.DB_ERROR
        });
      });
    } catch (err) {
      res.status(500).json({
        isSuccess: false,
        error: STATUS_CODE.SERVER_ERROR
      });
    }
  };
