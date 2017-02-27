'use strict';

(function() {
    angular
        .module('app')
        .factory('cartService', cartService);

    cartService.$inject = ['httpService'];
    function cartService(httpService) {
        var cart = {itemList: []};

        init();

        function init () {
            if (localStorage.cartItemList) {
                cart.itemList = JSON.parse(localStorage.cartItemList);
            };
        }

        function saveCart () { localStorage.cartItemList = angular.toJson(cart.itemList); }

        function getItemList () {
            return cart.itemList;
        }

        function getTotalQuantity () {
            var totalQuantity = 0;
            angular.forEach(cart.itemList, function (item) {
                totalQuantity += item.quantity;
            });
            return totalQuantity;
        }

        function getCartTotal () {
            var totalPrice = 0;
            angular.forEach(cart.itemList, function (item) {
                totalPrice += parseFloat(item.product.price) * item.quantity;
            });
            return totalPrice;
        }

        function addToCart(product, quantity) {
            var itemIndex = _.findIndex(cart.itemList, {product: {id: product.id}});
            if (itemIndex === -1) {
                itemIndex = cart.itemList.length;
                cart.itemList.push({product: product, quantity: 0});
            }
            cart.itemList[itemIndex].quantity += quantity;
            saveCart();
        }

        function removeItem (item) {
            _.remove(cart.itemList, {product: {id: item.product.id}});
            saveCart();
        }

        function updateItemQuantity (item, quantity) {
            var item = _.find(cart.itemList, {product: {id: item.product.id}});
            item.quantity = quantity;
            saveCart();
        }

        return {
            getItemList: getItemList,
            getTotalQuantity: getTotalQuantity,
            getCartTotal: getCartTotal,
            addToCart: addToCart,
            removeItem: removeItem,
            updateItemQuantity: updateItemQuantity
        };
    }
})();
