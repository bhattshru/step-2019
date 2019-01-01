function addProduct() {
    $.ajax({
            url: "/products/add",
            type: 'post',
            dataType: 'json',
            data: $("#add_product_form").serialize(),
            success: function(response) {
              if(response.isSuccess){
                 window.location.href="index.html";
              }

            },
            error :function(response) {
               console.log("Error : "+ response);
            }
    });
}
