'use strict';

(function () {
    describe('cartService', function () {
        var cartService, $window;
        beforeEach(function () {
            module('app');
            module(function ($provide) {
                $provide.value('toastService', {
                    success: function () {}
                });
                $provide.value('$window', {
                    localStorage: {
                        getItem: function () {
                            return angular.toJson({
                                percentDiscount: 0,
                                itemList: [
                                    {quantity: 2, product: {price: 10, id: 1}},
                                    {quantity: 3, product: {price: 20, id: 2}},
                                    {quantity: 1, product: {price: 30, id: 3}}
                                ]
                            });
                        },
                        setItem: function () {}
                    },
                    angular: angular
                });
            });
        });
        beforeEach(inject(function (_cartService_, _$window_) {
            cartService = _cartService_;
            $window = _$window_;
        }));
        describe('cartService', function () {
            it('should be defined', function () {
                expect(cartService).toBeDefined();
                expect(cartService.getItemList().length).toBe(3);
            });
        });
        describe('cartService.getItemList', function () {
            it('should be defined', function () {
                expect(cartService.getItemList().length).toBe(3);
            });
        });
        describe('cartService.getTotalQuantity', function () {
            it('should be defined', function () {
                expect(cartService.getTotalQuantity()).toBe(6);
            });
        });
        describe('cartService.getCartTotal', function () {
            it('should be defined', function () {
                expect(cartService.getCartTotal()).toBe(110);
            });
        });
        describe('cartService.addToCart', function () {
            it('should be defined', function () {
                expect(cartService.getItemList().length).toBe(3);
                expect(cartService.getTotalQuantity()).toBe(6);
                expect(cartService.getCartTotal()).toBe(110);
                cartService.addToCart({price: 10, id: 4}, 1);
                expect(cartService.getItemList().length).toBe(4);
                expect(cartService.getTotalQuantity()).toBe(7);
                expect(cartService.getCartTotal()).toBe(120);
            });
        });
        describe('cartService.removeItem', function () {
            it('should remove the item from the cart', function () {
                expect(cartService.getItemList().length).toBe(3);
                expect(cartService.getTotalQuantity()).toBe(6);
                expect(cartService.getCartTotal()).toBe(110);
                cartService.removeItem(cartService.getItemList()[0]);
                expect(cartService.getItemList().length).toBe(2);
                expect(cartService.getTotalQuantity()).toBe(4);
                expect(cartService.getCartTotal()).toBe(90);
            });
        });
        describe('cartService.updateItemQuantity', function () {
            it('should be defined', function () {
                expect(cartService.getItemList().length).toBe(3);
                expect(cartService.getTotalQuantity()).toBe(6);
                expect(cartService.getCartTotal()).toBe(110);
                cartService.updateItemQuantity(cartService.getItemList()[0], 1);
                expect(cartService.getItemList().length).toBe(3);
                expect(cartService.getTotalQuantity()).toBe(5);
                expect(cartService.getCartTotal()).toBe(100);
            });
        });
    });
})();
