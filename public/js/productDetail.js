(function() {
  var productName = window.location.href.split("#")[1];
  $.ajax({
    url: "/products/" + productName,
    success: function(result) {
      console.log('success  : ', result)
      let product = result.data;
      $('#brand-title').text(product.brand);
      $('#product-title').text(product.name);
      $('#product-price').text(product.price);
      $('#product-desc-text').text(product.description);
      $('#prod-size').text(product.size);
      $('#prod-color').text(product.color);
      $('.product-img').css('background-image',`url(${product.imageUrl})`);
    },
    error: function() {
      window.alert('Some error occurred');
      alert(JSON.parse(err.responseText).error.MESSAGE);

    }
  });
})();
