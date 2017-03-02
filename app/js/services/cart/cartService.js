'use strict';

(function() {
    angular
        .module('app')
        .factory('cartService', cartService);

    cartService.$inject = ['$window', 'toastService'];
    function cartService($window, toastService) {
        var cart = {itemList: [], percentDiscount: 0};

        init();

        function init () {
            var savedShoppingCart = $window.localStorage.getItem('shoppingCart');
            if (!_.isEmpty(savedShoppingCart)) { cart = JSON.parse(savedShoppingCart); };
        }

        function saveCart () { $window.localStorage.setItem('shoppingCart', angular.toJson(cart)); }

        function getItemList () { return cart.itemList; }

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
            return totalPrice - (totalPrice * cart.percentDiscount / 100);
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
            if (cart.itemList.length === 0) { cart.percentDiscount = 0; }
            saveCart();
        }

        function updateItemQuantity (item, quantity) {
            var item = _.find(cart.itemList, {product: {id: item.product.id}});
            item.quantity = quantity;
            saveCart();
        }

        function applyCoupon () {
            cart.percentDiscount = _.random(5, 25);
            toastService.success('You got a ' + cart.percentDiscount + '% discount!!');
            saveCart();
        }

        function getDiscount () {
            var totalPrice = 0;
            angular.forEach(cart.itemList, function (item) {
                totalPrice += parseFloat(item.product.price) * item.quantity;
            });
            return totalPrice * cart.percentDiscount / 100;
        }

        return {
            getItemList: getItemList,
            getTotalQuantity: getTotalQuantity,
            getCartTotal: getCartTotal,
            addToCart: addToCart,
            removeItem: removeItem,
            updateItemQuantity: updateItemQuantity,
            applyCoupon: applyCoupon,
            getDiscount: getDiscount
        };
    }
})();
