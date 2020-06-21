$(document).ready(() => {
    $('.add-to-cart').on('click', addToCart);
});

function addToCart() {
    var id = $(this).data('id');
    var quantity = $('#sst') ?  $('#sst').val() : 1;

    $.ajax({
        url: '/cart',
        type: 'POST',
        data: {id, quantity},
        success: function(result) {
            $('#cart-badge').html(result.totalQuantity)
        }
    })
}

function updateCart(id, quantity) {
    if (quantity == 0) {
        removeCartItem(id);
    } else {
        updateCartItem(id, quantity);
    }
}

function removeCartItem(id) {
    $.ajax({
        url: '/cart',
        type: 'DELETE',
        data: {id},
        success: function(result) {
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html('$' + result.totalPrice);
            $(`#item${id}`).remove();
        }
    })
}

function updateCartItem(id, quantity) {
    console.log("hello from update");
    console.log(id);
    console.log(quantity);
    $.ajax({
        url: '/cart',
        type: 'PUT',
        data: {id, quantity},
        success: function(result) {
            console.log(result);
            $('#cart-badge').html(result.totalQuantity);
            $('#totalPrice').html('$' + result.totalPrice);
            $(`#price${id}`).html('$' + result.item.price);
        }
    })
}