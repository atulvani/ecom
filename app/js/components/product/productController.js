'use strict';

(function () {
    angular
        .module('app')
        .controller('productController', productController);

    productController.$inject = ['httpService', 'cartService'];
    function productController (httpService, cartService) {
        var vmProductController = this;

        vmProductController.quantity = 1;
        vmProductController.product = {};

        vmProductController.addToCart = addToCart;

        init();

        function init () {
            httpService.get('/product').then(function (response) {
                vmProductController.product = response.data;
            });
        }

        function addToCart () {
            cartService.addToCart(vmProductController.product, vmProductController.quantity);
        }
    }
})();
