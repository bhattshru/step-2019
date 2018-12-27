$(document).ready(function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "products/all",
    success: function(response) {
      if (response.data.length > 0) {
        constructDOM(formObject(response.data));
      }
    },
    error: function(err) {
      constructDOM(formObject(err));

    }
  });

  function formObject(response) {
    //remove this once API is ready
    /*-----------remove from here---------------*/
    response = [{
        "name": "Blue Lehenga",
        "imageUrl": "https://rukminim1.flixcart.com/image/880/1056/jm573ww0/lehenga-choli/4/w/n/free-mdl19-define-jewellery-original-imaf948fythg85yp.jpeg?q=50",
        "brand": "Saara",
        "category": "Women",
        "rating": "4",
        "price": "370",
        "description": "This is a blue and pink lehenga with 3/4th sleeve and round neck, suitable for women under 5.5 feet",
        "size": "M",
        "color": "Blue"
      },{
        "name": "Embroidered red Saree",
        "imageUrl": "https://rukminim1.flixcart.com/image/880/1056/j3agya80/shirt/c/h/j/s-ropemc-rope-original-imaeufp4w8g7hpfv.jpeg?q=50",
        "brand": "Biba",
        "category": "Men",
        "rating": "4.5",
        "price": "2370",
        "description": "This is a silk saree with intricate golden embroidery with a royal look.",
        "size": "Free",
        "color": "Red"
      }, {
        "name": "Embroidered red Saree",
        "imageUrl": "https://rukminim1.flixcart.com/image/880/880/jjabekw0/kids-ethnic-set/b/v/t/3-4-years-digibc001-digimart-original-imaffh6mtrzdefhx.jpeg?q=50",
        "brand": "Biba",
        "category": "Kids",
        "rating": "4.5",
        "price": "2370",
        "description": "This is a silk saree with intricate golden embroidery with a royal look.",
        "size": "Free",
        "color": "Red"
      }
    ];
    /*-----------remove till here---------------*/
    let flags = [],
      categoryObject = [],
      length = response.length,
      i;
    for (i = 0; i < length; i++) {
      let index = flags.indexOf(response[i].category);
      if (index >= 0) {
        categoryObject[index].products.push(response[i]);
        continue;
      }

      flags.push(response[i].category);
      let objectSchema = {
        category: response[i].category,
        products: []
      }
      objectSchema.products.push(response[i]);
      categoryObject.push(objectSchema);
    }
    return categoryObject;
  }

  function constructDOM(data) {
    let content = [];
    for (let i = 0; i < data.length; i++) {
      let categoryContent = []
      let categoryDOM = $('<div class="clearfix category"></div>');
      let categoryTitle = $('<h3 class="categoryName">' + data[i].category + '</h3>');
      categoryContent.push(categoryTitle);

      if (data) {
        let productsList = data[i].products;
        for (let j = 0; j < productsList.length; j++) {
          let productDOM =
            '<div class="product fleft">' +
            '<a href="/productDetail.html#' + productsList[j].name + '">' +
            '<div class="poster">' +
            '<img src="' + productsList[j].imageUrl + '" alt="">' +
            '</div></a>' +
            '<div class="details">' +
            '<p class="brand">' + productsList[j].brand + '</p>' +
            '<h4 class="name">' + productsList[j].name + '</h4>' +
            '<div class="stars">';
          productDOM += setRating(productsList[j]);
          categoryContent.push($(productDOM));
        }
        categoryDOM.html(categoryContent);
        content.push(categoryDOM);
      }
    }
    $('section.content').html(content);
  }

  function setRating(product) {
    let isDecimal = false;
    let ratingWidget = '';

    if (product.rating) {
      let rating = parseFloat(product.rating);
      isDecimal = ((rating % 1) != 0) ? true : false;
      let roundedRating = Math.floor(rating);

      for (let i = 1; i <= 5; i++) {
        if (roundedRating <= 0) {
          ratingWidget += '<div class="star star-empty"></div>';
        } else {
          if (i < roundedRating) {
            ratingWidget += '<div class="star star-full"></div>';
          } else if (i == roundedRating) {
            if (isDecimal) {
              ratingWidget += '<div class="star star-full"></div><div class="star star-half"></div>';
            } else {
              ratingWidget += '<div class="star star-full"></div>';
            }
          } else if (i > roundedRating && !isDecimal) {
            ratingWidget += '<div class="star star-empty"></div>';
          }
        }
      }
    }
    ratingWidget +
      '</div>' +
      '</div>' +
      '</div>';

    return ratingWidget;
  }
});
