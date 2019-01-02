$(document).ready(function() {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "https://api.myjson.com/bins/1d47ac",
    success: function(response) {
      if (response.length > 0) {
        constructDOM(formObject(response));
      }
    },
    error: function(err) {
      constructDOM(formObject(err));
      alert(JSON.parse(err.responseText).error.MESSAGE);
    }
  });

  function formObject(response) {
    //remove this once API is ready
    /*-----------remove from here---------------*/

    /*-----------remove till here---------------*/
    let flags = [],
      categoryObject = [],
      length = response.length,
      i;
    for (i = 0; i < length; i++) {
      let index = flags.indexOf(response[i].category.toLowerCase());
      if (index >= 0) {
        categoryObject[index].products.push(response[i]);
        continue;
      }

      flags.push(response[i].category.toLowerCase());
      let objectSchema = {
        category: response[i].category.toLowerCase(),
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
