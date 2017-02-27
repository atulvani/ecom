'use strict';

(function () {
    angular
        .module('app')
        .controller('cartController', cartController);

    cartController.$inject = ['cartService', 'httpService'];
    function cartController (cartService, httpService) {
        var vmCartController = this;

        vmCartController.cart = cartService;
        vmCartController.relatedProductList = [];

        vmCartController.getItemTotal = getItemTotal;

        init();

        function init () {
            httpService.get('/productList').then(function(response) {
                vmCartController.relatedProductList = response.data;
            });
        }

        function getItemTotal (item) {
            return parseFloat(item.quantity) * parseFloat(item.product.price);
        }
    }
})();
